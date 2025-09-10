package com.petmily.backend.service;

import com.petmily.backend.entity.Pet;
import com.petmily.backend.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
    
    public List<Pet> findByUserId(Long userId) {
        return petRepository.findByUserId(userId);
    }
    
    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }
    
    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }
    
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}