package com.petmily.backend.repository;

import com.petmily.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmailAndIsActiveTrue(String email);
    
    Optional<User> findByUsernameAndIsActiveTrue(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
    
    // OAuth2 methods
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
    
    Optional<User> findByEmailAndProvider(String email, String provider);
}