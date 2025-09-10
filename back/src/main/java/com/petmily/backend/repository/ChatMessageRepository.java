package com.petmily.backend.repository;

import com.petmily.backend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtAsc(Long chatRoomId);
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatRoomId = :chatRoomId ORDER BY cm.createdAt DESC")
    List<ChatMessage> findLatestMessagesByChatRoomId(@Param("chatRoomId") Long chatRoomId);
    
}


