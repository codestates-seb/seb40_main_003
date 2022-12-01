package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealSuccess {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deal_success_id")
    private Long dealSuccessId;

    @OneToOne
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @OneToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @OneToOne
    @JoinColumn(name = "seller_id")
    private Member seller;

}
