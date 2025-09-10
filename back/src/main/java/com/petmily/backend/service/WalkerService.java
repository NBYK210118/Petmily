package com.petmily.backend.service;

import com.petmily.backend.entity.WalkerProfile;
import com.petmily.backend.entity.WalkerBooking;
import com.petmily.backend.entity.WalkerReview;
import com.petmily.backend.repository.WalkerProfileRepository;
import com.petmily.backend.repository.WalkerBookingRepository;
import com.petmily.backend.repository.WalkerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WalkerService {
    
    @Autowired
    private WalkerProfileRepository walkerProfileRepository;
    
    @Autowired
    private WalkerBookingRepository walkerBookingRepository;
    
    @Autowired
    private WalkerReviewRepository walkerReviewRepository;
    
    // Walker Profile methods
    public WalkerProfile createWalkerProfile(WalkerProfile walkerProfile) {
        return walkerProfileRepository.save(walkerProfile);
    }
    
    public List<WalkerProfile> findAvailableWalkers() {
        return walkerProfileRepository.findByIsAvailableTrue();
    }
    
    public List<WalkerProfile> findWalkersByLocation(String location) {
        return walkerProfileRepository.findByLocationAndAvailable(location);
    }
    
    public List<WalkerProfile> findWalkersByMaxRate(Double maxRate) {
        return walkerProfileRepository.findByHourlyRateLessThanEqualAndAvailable(maxRate);
    }
    
    public Optional<WalkerProfile> findWalkerById(Long id) {
        return walkerProfileRepository.findById(id);
    }
    
    public WalkerProfile updateWalkerProfile(WalkerProfile walkerProfile) {
        return walkerProfileRepository.save(walkerProfile);
    }
    
    // Walker Booking methods
    public WalkerBooking createBooking(WalkerBooking booking) {
        return walkerBookingRepository.save(booking);
    }
    
    public List<WalkerBooking> findBookingsByUserId(Long userId) {
        return walkerBookingRepository.findByUserId(userId);
    }
    
    public List<WalkerBooking> findBookingsByWalkerId(Long walkerId) {
        return walkerBookingRepository.findByWalkerId(walkerId);
    }
    
    public List<WalkerBooking> findBookingsByWalkerAndDateRange(Long walkerId, LocalDateTime startDate, LocalDateTime endDate) {
        return walkerBookingRepository.findByWalkerIdAndDateBetween(walkerId, startDate, endDate);
    }
    
    public WalkerBooking updateBookingStatus(Long bookingId, WalkerBooking.BookingStatus status) {
        WalkerBooking booking = walkerBookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("예약을 찾을 수 없습니다: " + bookingId));
        
        booking.setStatus(status);
        return walkerBookingRepository.save(booking);
    }
    
    // Walker Review methods
    public WalkerReview createReview(WalkerReview review) {
        WalkerReview savedReview = walkerReviewRepository.save(review);
        
        // 평점 업데이트
        updateWalkerRating(review.getWalkerId());
        
        return savedReview;
    }
    
    public List<WalkerReview> findReviewsByWalkerId(Long walkerId) {
        return walkerReviewRepository.findByWalkerId(walkerId);
    }
    
    private void updateWalkerRating(Long walkerId) {
        Double averageRating = walkerReviewRepository.findAverageRatingByWalkerId(walkerId);
        if (averageRating != null) {
            WalkerProfile walker = walkerProfileRepository.findById(walkerId)
                .orElseThrow(() -> new RuntimeException("워커를 찾을 수 없습니다: " + walkerId));
            walker.setRating(averageRating);
            walkerProfileRepository.save(walker);
        }
    }
}


