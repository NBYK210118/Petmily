package com.petmily.backend.controller;

import com.petmily.backend.entity.WalkerProfile;
import com.petmily.backend.entity.WalkerBooking;
import com.petmily.backend.entity.WalkerReview;
import com.petmily.backend.service.WalkerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/walkers")
@CrossOrigin(origins = "http://localhost:3000")
public class WalkerController {
    
    @Autowired
    private WalkerService walkerService;
    
    // Walker Profile endpoints
    @GetMapping
    public ResponseEntity<?> getAvailableWalkers() {
        try {
            List<WalkerProfile> walkers = walkerService.findAvailableWalkers();
            return ResponseEntity.ok(walkers);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "산책 도우미 목록 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getWalker(@PathVariable Long id) {
        try {
            Optional<WalkerProfile> walkerOpt = walkerService.findWalkerById(id);
            if (walkerOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "산책 도우미를 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            return ResponseEntity.ok(walkerOpt.get());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "산책 도우미 정보 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/location/{location}")
    public ResponseEntity<?> getWalkersByLocation(@PathVariable String location) {
        try {
            List<WalkerProfile> walkers = walkerService.findWalkersByLocation(location);
            return ResponseEntity.ok(walkers);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "지역별 산책 도우미 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/rate/{maxRate}")
    public ResponseEntity<?> getWalkersByMaxRate(@PathVariable Double maxRate) {
        try {
            List<WalkerProfile> walkers = walkerService.findWalkersByMaxRate(maxRate);
            return ResponseEntity.ok(walkers);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "요금별 산책 도우미 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createWalkerProfile(@Valid @RequestBody WalkerProfile walkerProfile) {
        try {
            WalkerProfile savedWalker = walkerService.createWalkerProfile(walkerProfile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedWalker);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "산책 도우미 프로필 등록 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Walker Booking endpoints
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@Valid @RequestBody WalkerBooking booking) {
        try {
            WalkerBooking savedBooking = walkerService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "산책 예약 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/bookings/user/{userId}")
    public ResponseEntity<?> getUserBookings(@PathVariable Long userId) {
        try {
            List<WalkerBooking> bookings = walkerService.findBookingsByUserId(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "사용자 예약 목록 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/bookings/walker/{walkerId}")
    public ResponseEntity<?> getWalkerBookings(@PathVariable Long walkerId) {
        try {
            List<WalkerBooking> bookings = walkerService.findBookingsByWalkerId(walkerId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "워커 예약 목록 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PutMapping("/bookings/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long bookingId, @RequestBody Map<String, String> statusRequest) {
        try {
            String statusStr = statusRequest.get("status");
            WalkerBooking.BookingStatus status = WalkerBooking.BookingStatus.valueOf(statusStr);
            WalkerBooking updatedBooking = walkerService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "예약 상태 변경 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Walker Review endpoints
    @PostMapping("/reviews")
    public ResponseEntity<?> createReview(@Valid @RequestBody WalkerReview review) {
        try {
            WalkerReview savedReview = walkerService.createReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "리뷰 작성 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/reviews/{walkerId}")
    public ResponseEntity<?> getWalkerReviews(@PathVariable Long walkerId) {
        try {
            List<WalkerReview> reviews = walkerService.findReviewsByWalkerId(walkerId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "워커 리뷰 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}


