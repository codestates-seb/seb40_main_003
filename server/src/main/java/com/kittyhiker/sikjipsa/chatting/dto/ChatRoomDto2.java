package com.kittyhiker.sikjipsa.chatting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto2 {
	private Long roomId;
	private String roomName;
	private Long sellerId;
	private Long buyerId;
	private Long notReadNum;
	private int state;
	private ChatExpertInfo expertInfo;
}
