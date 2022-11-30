package com.kittyhiker.sikjipsa.chatting.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    // 연결된 모든 세션 저장
    private List<WebSocketSession> sessions =  new ArrayList<>();
    //userId의 세션 저장
    private Map<Long, WebSocketSession> userSessions = new HashMap<>();
    //채팅방에 연결중인 세션
    private Map<String, List<WebSocketSession>> chatRoomSessions = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //클라이언트 웹소켓 연결 시 자동 실행 메서드
        log.info("Web socket 연결 성공");
        log.info("web socket connection  : "+ session);
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //websocket 연결 종료 시
        log.info("Web socket 연결 해제");
        log.info("connection close : "+ session);
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("{}", payload);

        //입력값 chatMessageDto로 변경
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);
        if (!userSessions.containsKey(chatMessage.getSenderId())) {
            userSessions.put(chatMessage.getSenderId(), session);
        }
        ChatRoomDto chatRoom = chatService.findRoomByName(chatMessage.getRoomName());
        addSessionToChatRoom(chatRoom.getRoomName(), session);
        sendMessage(chatMessage);
    }

    public void sendMessage(ChatMessageDto message) {
        String roomName = message.getRoomName();
        List<WebSocketSession> webSocketSessions = chatRoomSessions.get(roomName);
        log.info("send session >> "+ webSocketSessions);
        webSocketSessions.parallelStream()
                .forEach(s -> {
                    if (sessions.contains(s)) {
                        chatService.sendMessage(s, message);
                    }
                });
    }

    public void addSessionToChatRoom(String chatRoomName, WebSocketSession session) {
        if (chatRoomSessions.get(chatRoomName)!=null) {
            List<WebSocketSession> socketSession = chatRoomSessions.get(chatRoomName);
            if (!socketSession.contains(session)){
                socketSession.add(session);
                chatRoomSessions.put(chatRoomName, socketSession);
            }
        } else {
            List<WebSocketSession> sessionList = new ArrayList<>();
            sessionList.add(session);
            chatRoomSessions.put(chatRoomName, sessionList);
        }
    }
}
