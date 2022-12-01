package com.kittyhiker.sikjipsa.plant.repository;

import com.kittyhiker.sikjipsa.plant.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {
	//List<Plant> findAllByMember_MemberIdOrderByPlantIdDesc();

	List<Plant> findAllByMember_MemberIdOrderByPlantIdDesc(Long memberId);
}
