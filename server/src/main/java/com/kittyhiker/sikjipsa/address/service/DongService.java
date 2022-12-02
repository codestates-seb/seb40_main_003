package com.kittyhiker.sikjipsa.address.service;

import com.kittyhiker.sikjipsa.address.entity.Dong;
import com.kittyhiker.sikjipsa.address.repository.DongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DongService {
	private final DongRepository dongRepository;
	public List<Dong> getDongs(String gugun) {
		return dongRepository.findAllByGugunOrderByDong(gugun);
	}
}
