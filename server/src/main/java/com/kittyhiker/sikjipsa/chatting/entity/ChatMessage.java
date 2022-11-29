package com.kittyhiker.sikjipsa.chatting.entity;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder @Getter
public class ChatMessage extends AuditingEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @Column(name = "room_name")
    private String roomName;

    private String message;
}
