package com.petmily.backend.service;

import com.petmily.backend.entity.User;
import com.petmily.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oauth2User.getAttribute("id");
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        String avatarUrl = getAvatarUrl(oauth2User, provider);
        
        // 기존 사용자 찾기 또는 새 사용자 생성
        User user = userRepository.findByProviderAndProviderId(provider, providerId)
            .orElseGet(() -> {
                User newUser = new User(email, name, provider, providerId, avatarUrl);
                return userRepository.save(newUser);
            });
        
        // 사용자 정보 업데이트 (이름이나 아바타가 변경될 수 있음)
        if (!Objects.equals(name, user.getName()) || !Objects.equals(avatarUrl, user.getAvatarUrl())) {
            user.setName(name);
            user.setAvatarUrl(avatarUrl);
            userRepository.save(user);
        }
        
        return oauth2User;
    }
    
    @SuppressWarnings("unchecked")
    private String getAvatarUrl(OAuth2User oauth2User, String provider) {
        if ("google".equals(provider)) {
            return oauth2User.getAttribute("picture");
        } else if ("facebook".equals(provider)) {
            Map<String, Object> picture = oauth2User.getAttribute("picture");
            if (picture != null) {
                Map<String, Object> data = (Map<String, Object>) picture.get("data");
                if (data != null) {
                    return (String) data.get("url");
                }
            }
        }
        return null;
    }
}
