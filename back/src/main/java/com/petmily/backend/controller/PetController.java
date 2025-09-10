package com.petmily.backend.controller;

import com.petmily.backend.entity.Pet;
import com.petmily.backend.service.PetService;
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
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3000")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    @PostMapping
    public ResponseEntity<?> createPet(@Valid @RequestBody Pet pet) {
        try {
            Pet savedPet = petService.createPet(pet);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "반려동물 등록 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPetsByUserId(@PathVariable Long userId) {
        try {
            List<Pet> pets = petService.findByUserId(userId);
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "반려동물 목록 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPet(@PathVariable Long id) {
        try {
            Optional<Pet> petOpt = petService.findById(id);
            if (petOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "반려동물을 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            return ResponseEntity.ok(petOpt.get());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "반려동물 정보 조회 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @Valid @RequestBody Pet pet) {
        try {
            Optional<Pet> existingPetOpt = petService.findById(id);
            if (existingPetOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "반려동물을 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
            pet.setId(id);
            Pet updatedPet = petService.updatePet(pet);
            return ResponseEntity.ok(updatedPet);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "반려동물 정보 수정 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        try {
            Optional<Pet> petOpt = petService.findById(id);
            if (petOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "반려동물을 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
            petService.deletePet(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "반려동물이 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "반려동물 삭제 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}


