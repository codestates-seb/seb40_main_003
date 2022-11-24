package com.kittyhiker.sikjipsa.member.memberprofile.service;

import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.repository.MemberInfoRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberInfoService {
	private final MemberRepository memberRepository;
	private final MemberInfoRepository memberInfoRepository;
	public MemberInformation postMemberInfo(MemberInformation memberInformation, Long memberId) {
		memberInformation.setMember(memberRepository.getReferenceById(memberId));
		return memberInfoRepository.save(memberInformation);
	}
}
