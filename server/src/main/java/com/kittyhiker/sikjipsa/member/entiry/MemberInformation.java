package com.kittyhiker.sikjipsa.member.entiry;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "member_info")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberInformation extends AuditingEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_info_id")
    private Long infoId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String name;
    private String phone;
    private String birth;
    private Integer gender;
    private String address;

    public void setMember(Member member) {
        this.member = member;
    }

}
