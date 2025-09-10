package com.petmily.backend.repository;

import com.petmily.backend.entity.WalkerBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WalkerBookingRepository extends JpaRepository<WalkerBooking, Long> {
    
    List<WalkerBooking> findByUserId(Long userId);
    
    List<WalkerBooking> findByWalkerId(Long walkerId);
    
    @Query("SELECT wb FROM WalkerBooking wb WHERE wb.walkerId = :walkerId AND wb.date BETWEEN :startDate AND :endDate")
    List<WalkerBooking> findByWalkerIdAndDateBetween(@Param("walkerId") Long walkerId, 
                                                   @Param("startDate") LocalDateTime startDate, 
                                                   @Param("endDate") LocalDateTime endDate);
    
    List<WalkerBooking> findByStatus(WalkerBooking.BookingStatus status);
    
}


