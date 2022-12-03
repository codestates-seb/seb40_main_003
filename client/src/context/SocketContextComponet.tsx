import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSocket } from '../Hooks/useSocket';
import { userState } from '../Recoil/atoms/user';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './SocketContext';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const socket = useSocket('ws://3.39.124.200:8080/ws/chat', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false,
        transports:["webSocket"]
    });

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);
    const memberId = useRecoilValue(userState)?.memberId

    useEffect(() => {
        socket.connect();
        SocketDispatch({ type: 'update_socket', payload: socket });
        StartListeners();
        SendHandshake();
        // eslint-disable-next-line
    }, []);

    const StartListeners = () => {
        /** Messages */
        socket.on('user_connected', (users: string[]) => {
            console.info('User connected message received');
            SocketDispatch({ type: 'update_users', payload: users });
        });

        /** Messages */
        socket.on('user_disconnected', (memberId: string) => {
            console.info('User disconnected message received');
            SocketDispatch({ type: 'remove_user', payload: memberId });
        });

        /** Connection / reconnection listeners */
        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
            SendHandshake();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnection Attempt: ' + attempt);
        });

        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnection error: ' + error);
        });

        socket.io.on('reconnect_failed', () => {
            console.info('Reconnection failure.');
            console.log('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
        });
    };

    const SendHandshake = async () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', async (memberId: string, users: string[]) => {
            console.info('User handshake callback message received');
            SocketDispatch({ type: 'update_users', payload: users });
            SocketDispatch({ type: 'update_memberId', payload: memberId });
        });

        setLoading(false);
    };

    if (loading) return <p>... loading Socket IO ....</p>;

    return <SocketContextProvider value={{ SocketState, SocketDispatch }}>{children}</SocketContextProvider>;
};

export default SocketContextComponent;