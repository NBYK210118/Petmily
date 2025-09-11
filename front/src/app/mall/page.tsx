"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Search, Filter, Star, ShoppingCart } from "lucide-react";
import { productAPI } from "@/lib/api";
import toast from "react-hot-toast";
import Header from "../components/header";
import Footer from "../components/sections/Footer";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId: number;
  originalPrice?: number;
  discountPrice?: number;
  discountRate?: number;
}

export default function MallPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLoadingStep, setAiLoadingStep] = useState('');
  const [aiRecommendedProducts, setAiRecommendedProducts] = useState<Product[]>([]);
  const [showAiResults, setShowAiResults] = useState(false);

  // 상품 이미지 배열 (재사용 가능)
  const productImages = useMemo(() => [
    '/images/pet1.png',
    '/images/pet2.png', 
    '/images/pet3.png',
    '/images/tug1.png',
    '/images/user_ex.png'
  ], []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAvailableProducts();
      console.log('asdfasdfa: ', response.data)
      const productsWithImages = response.data.map((product: any, index: number) => ({
        ...product,
        imageUrl: product.imageUrl || productImages[index % productImages.length] // 이미지가 없으면 순환 사용
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error('상품을 불러오는데 실패했습니다:', error);
      toast.error("상품을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [productImages]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      // 검색어가 없으면 모든 상품 표시
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await productAPI.searchProducts(searchTerm);
      const productsWithImages = response.data.map((product: any, index: number) => ({
        ...product,
        imageUrl: product.imageUrl || productImages[index % productImages.length] // 이미지가 없으면 순환 사용
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error('검색에 실패했습니다:', error);
      toast.error("검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, fetchProducts, productImages]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => [...prev, product]);
    toast.success(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  }, []);

  const handleAiRecommendation = async () => {
    console.log('AI 추천 시작');
    setIsAiLoading(true);
    setShowAiResults(false);
    setAiRecommendedProducts([]);
    
    try {
      // 1단계: 사용자 정보 불러오는 중
      setAiLoadingStep('사용자 정보를 불러오는 중...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 2단계: 선택된 카테고리의 적절한 상품 찾는 중
      setAiLoadingStep('선택된 카테고리의 적절한 상품을 찾는 중...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 3단계: AI 추천 상품 가져오기
      const recommendedCount = Math.floor(Math.random() * 3) + 4; // 4-6개 상품
      setAiLoadingStep(`${recommendedCount}개의 맞춤 상품을 발견했습니다!`);
      
      console.log('API 호출 시작, 추천 개수:', recommendedCount);
      // API에서 AI 추천 상품 가져오기
      const response = await productAPI.getAiRecommendations(recommendedCount);
      
      // API 응답이 없거나 빈 배열인 경우 처리
      if (!response || !response.data || response.data.length === 0) {
        console.log('API에서 상품을 가져올 수 없습니다');
        setAiRecommendedProducts([]);
        setShowAiResults(true); // 빈 결과를 표시하기 위해 true로 설정
        return;
      }
      
      const aiProducts = response.data.map((product: any, index: number) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPrice: product.originalPrice ? product.price : undefined,
        discountRate: product.discountRate,
        imageUrl: product.imageUrl || productImages[index % productImages.length], // 이미지가 없으면 순환 사용
        stock: product.stock,
        categoryId: product.categoryId
      }));
      
      console.log('AI 추천 상품들:', aiProducts);
      console.log('상품 개수:', aiProducts.length);
      setAiRecommendedProducts(aiProducts);
      setShowAiResults(true);
      console.log('showAiResults 설정됨:', true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('AI 추천에 실패했습니다:', error);
      toast.error("AI 추천에 실패했습니다.");
      setShowAiResults(false);
      setAiRecommendedProducts([]);
    } finally {
      setIsAiLoading(false);
      setAiLoadingStep('');
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.categoryId !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background with Blur */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/tug1.png")',
          filter: 'blur(8px)',
          transform: 'scale(1.1)', // Prevent blur edges
        }}
      />
      
      {/* Content with backdrop */}
      <div className="relative z-10 min-h-screen">
        <Header />

        {/* Spacing */}
        <div className="pt-24 md:pt-28"></div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#C59172]/80 to-[#B07A5C]/80 py-12 md:py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              Pet Mall
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 drop-shadow-md">
              AI가 추천하는 반려동물을 위한 최고의 상품들을 만나보세요
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
                  <input
                    type="text"
                    placeholder="상품을 검색해보세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-2 focus:outline-none text-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-700 ease-in-out ${
                      isSearchFocused 
                        ? 'border-pink-300 focus:bg-white focus:shadow-xl focus:scale-105 focus:ring-4 focus:ring-pink-200/50' 
                        : 'border-gray-200 hover:bg-white/95 hover:shadow-md hover:border-gray-300'
                    }`}
                    style={{
                      width: isSearchFocused ? '100%' : '280px',
                      minWidth: '200px',
                      maxWidth: '400px',
                      transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-white text-pink-500 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-gray-100 font-medium flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-gray-200 hover:border-pink-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">검색</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">카테고리:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === null
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory(1)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === 1
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                사료
              </button>
              <button
                onClick={() => setSelectedCategory(2)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === 2
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                간식
              </button>
              <button
                onClick={() => setSelectedCategory(3)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === 3
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                장난감
              </button>
              <button
                onClick={() => setSelectedCategory(4)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === 4
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                의류
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">상품을 불러오는 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative aspect-w-16 aspect-h-9 bg-gray-200">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {product.discountRate && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discountRate}% 할인
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        {product.discountPrice ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-pink-500">
                              ₩{product.discountPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₩{product.originalPrice?.toLocaleString()}
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                              {product.discountRate}% 할인
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-pink-500">
                            ₩{product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                          product.stock > 0
                            ? 'bg-pink-500 text-white hover:bg-pink-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        장바구니
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">상품이 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 카테고리를 시도해보세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Recommendation Section */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI 맞춤 추천
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            반려동물의 특성에 맞는 상품을 AI가 추천해드립니다
          </p>
          
          {/* AI Loading State */}
          {isAiLoading && (
            <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <p className="text-gray-700 font-medium">{aiLoadingStep}</p>
              </div>
            </div>
          )}
          
          {/* AI Results */}
          {showAiResults && aiRecommendedProducts.length > 0 ? (
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                  🎉 AI가 추천한 맞춤 상품들
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleAiRecommendation}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                  >
                    🔄 다른 상품 추천받기
                  </button>
                  <button
                    onClick={() => {
                      setShowAiResults(false);
                      setAiRecommendedProducts([]);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    ✖️ 추천 닫기
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-center">
                  💡 <strong>AI 분석 결과:</strong> 당신의 반려동물에게 최적화된 {aiRecommendedProducts.length}개의 상품을 선별했습니다.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aiRecommendedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <img
                        src={product.imageUrl || "/images/placeholder-product.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.discountRate && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discountRate}% 할인
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                        AI 추천
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                          {product.discountPrice ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-pink-500">
                                ₩{product.discountPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₩{product.originalPrice?.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-pink-500">
                              ₩{product.price.toLocaleString()}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            재고 {product.stock}개
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">4.8</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center font-medium"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        장바구니 담기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  마음에 드는 상품이 있으신가요? 더 많은 상품을 보고 싶으시다면 전체 상품 목록을 확인해보세요!
                </p>
                <button
                  onClick={() => {
                    setShowAiResults(false);
                    setAiRecommendedProducts([]);
                    // 스크롤을 상품 목록으로 이동
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium"
                >
                  전체 상품 보러가기
                </button>
              </div>
            </div>
          ) : showAiResults && aiRecommendedProducts.length === 0 ? (
            <div className="mt-8 text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  추천 상품을 찾을 수 없습니다
                </h3>
                <p className="text-yellow-700 mb-4">
                  현재 재고가 있는 상품이 없어 추천할 수 없습니다. 잠시 후 다시 시도해주세요.
                </p>
                <button
                  onClick={() => {
                    setShowAiResults(false);
                    setAiRecommendedProducts([]);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : null}
          
          {/* AI Recommendation Button */}
          {!isAiLoading && !showAiResults && (
            <button 
              onClick={handleAiRecommendation}
              className="bg-[#C59172] text-white px-8 py-3 rounded-lg hover:bg-[#B07A5C] font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              AI 추천 받기
            </button>
          )}
          
          {/* Reset Button */}
          {showAiResults && (
            <button 
              onClick={() => {
                setShowAiResults(false);
                setAiRecommendedProducts([]);
              }}
              className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-medium transition-colors"
            >
              다시 추천받기
            </button>
          )}
        </div>
      </section>
      
        <Footer />
      </div>
    </div>
  );
}


