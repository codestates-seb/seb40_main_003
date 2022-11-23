package com.kittyhiker.sikjipsa.caring.repository;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpertRepository extends JpaRepository<ExpertProfile, Long> {

	//@Query("select b from ExpertProfile b where b.title like concat('%',:q,'%')")
//	@Query("select distinct a from expert_profile a join a.tech_tags b where b.tech_tag_name like concat('%',:q,'%')")

//	@Query("select t from ExpertProfile t join fetch t.techTags a where a.techTagName like concat('%',:q,'%')")
//
//	Page<ExpertProfile> findByTechTagNameContainingOrderByIdDesc(String keyword, Pageable pageable);

//	@Query(value = "select e.id, t.techTagName from TechTag t join fetch t.expertProfile e where t.techTagName like concat('%',:q,'%')",
//	countQuery = "select count(t) from TechTag t join t.expertProfile e where t.techTagName like concat('%',:q,'%')")
//	Page<ExpertProfile> findByTechTagNameContainingOrderByIdDesc(String keyword, Pageable pageable);
}
