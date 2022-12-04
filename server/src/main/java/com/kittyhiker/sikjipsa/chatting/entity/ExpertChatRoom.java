package com.kittyhiker.sikjipsa.chatting.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder
public class ExpertChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chat_room_id")
	private Long roomId;

	private String roomName;

	@OneToOne
	@JoinColumn(name = "buyer_id")
	private Member buyer;

	@OneToOne
	@JoinColumn(name = "seller_id")
	private Member seller;

	private int state;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	public void updateState() {
		if (state == 0) {
			this.state = 1;
		} else {
			this.state = 0;
		}
	}
}
