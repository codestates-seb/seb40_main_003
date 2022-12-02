package com.kittyhiker.sikjipsa.address.repository;

import com.kittyhiker.sikjipsa.address.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DongRepository extends JpaRepository<Dong, Long> {
	List<Dong> findAllByGugunOrderByDong(String gugun);
}
