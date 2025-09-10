package com.petmily.backend.service;

import com.petmily.backend.dto.LoginRequest;
import com.petmily.backend.dto.RegisterRequest;
import com.petmily.backend.entity.User;
import com.petmily.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        // 이메일 중복 확인
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }

        // 사용자명 중복 확인 (이메일을 사용자명으로 사용)
        if (userRepository.existsByUsername(request.getEmail())) {
            throw new RuntimeException("이미 사용 중인 사용자명입니다.");
        }

        // 새 사용자 생성
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getEmail()); // 이메일을 사용자명으로 사용
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setIsActive(true);

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        // 이메일로 사용자 찾기
        Optional<User> userOptional = userRepository.findByEmailAndIsActiveTrue(request.getEmail());
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        User user = userOptional.get();

        // OAuth2 사용자인 경우 비밀번호가 없을 수 있음
        if (user.getPassword() == null) {
            throw new RuntimeException("소셜 로그인으로 가입된 계정입니다. 소셜 로그인을 이용해주세요.");
        }

        // 비밀번호 확인
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return user;
    }
}