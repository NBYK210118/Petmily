package com.petmily.backend.repository;

import com.petmily.backend.entity.WalkerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalkerReviewRepository extends JpaRepository<WalkerReview, Long> {
    
    List<WalkerReview> findByWalkerId(Long walkerId);
    
    @Query("SELECT AVG(wr.rating) FROM WalkerReview wr WHERE wr.walkerId = :walkerId")
    Double findAverageRatingByWalkerId(@Param("walkerId") Long walkerId);
    
    List<WalkerReview> findByUserId(Long userId);
    
}


