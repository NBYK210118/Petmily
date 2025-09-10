package com.petmily.backend.service;

import com.petmily.backend.entity.Product;
import com.petmily.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public List<Product> findAll() {
        return productRepository.findAll();
    }
    
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }
    
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    
    public List<Product> findByKeyword(String keyword) {
        return productRepository.findByKeyword(keyword);
    }
    
    public List<Product> findAvailableProducts() {
        return productRepository.findByStockGreaterThan(0);
    }
    
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public void updateStock(Long productId, Integer quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            product.setStock(product.getStock() - quantity);
            productRepository.save(product);
        }
    }
    
    public List<Product> getAiRecommendations(int limit) {
        // 재고가 있는 상품 중에서 랜덤하게 선택
        List<Product> availableProducts = productRepository.findByStockGreaterThan(0);
        
        // 랜덤하게 섞기
        java.util.Collections.shuffle(availableProducts);
        
        // 요청된 개수만큼 반환 (최대 10개)
        int maxLimit = Math.min(limit, 10);
        return availableProducts.stream()
                .limit(maxLimit)
                .collect(java.util.stream.Collectors.toList());
    }
}


