package com.petmily.backend.handler;

import com.petmily.backend.entity.User;
import com.petmily.backend.repository.UserRepository;
import com.petmily.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
        
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user != null) {
            // JWT 토큰 생성
            String token = jwtUtil.generateToken(user.getEmail());
            
            // 프론트엔드로 리다이렉트하면서 토큰을 전달
            String redirectUrl = "http://localhost:3000/mall?token=" + token;
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            // 사용자를 찾을 수 없는 경우
            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/login?error=user_not_found");
        }
    }
}
