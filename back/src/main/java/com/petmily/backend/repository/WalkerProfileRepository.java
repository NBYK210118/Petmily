package com.petmily.backend.repository;

import com.petmily.backend.entity.WalkerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalkerProfileRepository extends JpaRepository<WalkerProfile, Long> {
    
    List<WalkerProfile> findByIsAvailableTrue();
    
    @Query("SELECT w FROM WalkerProfile w WHERE w.location LIKE %:location% AND w.isAvailable = true")
    List<WalkerProfile> findByLocationAndAvailable(@Param("location") String location);
    
    @Query("SELECT w FROM WalkerProfile w WHERE w.hourlyRate <= :maxRate AND w.isAvailable = true")
    List<WalkerProfile> findByHourlyRateLessThanEqualAndAvailable(@Param("maxRate") Double maxRate);
    
}


