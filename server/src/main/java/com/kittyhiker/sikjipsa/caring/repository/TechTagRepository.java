package com.kittyhiker.sikjipsa.caring.repository;

import com.kittyhiker.sikjipsa.caring.entity.TechTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechTagRepository extends JpaRepository<TechTag, Long> {

//	@Query("select t from TechTag t join fetch t.expertProfile where t.techTagName like concat('%',:q,'%')")
//	Page<TechTag> findByTechTagNameContainingOrderByIdDesc(String keyword, Pageable pageable);
}