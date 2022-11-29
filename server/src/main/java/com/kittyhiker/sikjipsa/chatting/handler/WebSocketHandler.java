package com.kittyhiker.sikjipsa.chatting.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
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
public class WebSocketHandler extends TextWebSocketHandler implements InitializingBean {

    private final ObjectMapper objectMapper;
    // 연결된 모든 세션 저장
    private static List<WebSocketSession> sessions =  new ArrayList<>();
    //userId의 세션 저장
    private static Map<String, WebSocketSession> userSessions = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //클라이언트 웹소켓 연결 시 자동 실행 메서드
        log.info("Web socket 연결 성공");
        log.info("after connection establishes : "+ session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //websocket 연결 종료 시
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("{}", payload);
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);

    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
