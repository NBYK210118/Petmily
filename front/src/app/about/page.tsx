import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, MapPin, Star, Shield, Users, Clock, Award } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/sections/Footer";

export default function AboutPage() {
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#C59172]/80 to-[#B07A5C]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
              PetMily 소개
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-4 sm:mb-6 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4 drop-shadow-md">
              반려동물과 함께하는 행복한 일상을 위해 탄생한 PetMily는 
              AI 기반 상품 추천과 신뢰할 수 있는 산책 도우미 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#CBB7A2]/80 to-[#D5CDC9]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 drop-shadow-lg">
              Petmily의 목표
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4 drop-shadow-md">
              반려동물과 보호자 모두가 행복한 세상을 만들어갑니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-pink-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-500" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                사랑과 돌봄
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                반려동물에 대한 진정한 사랑과 돌봄을 바탕으로 서비스를 제공합니다
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                안전과 신뢰
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                검증된 산책 도우미와 안전한 서비스로 신뢰를 구축합니다
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                혁신과 편의
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                AI 기술을 활용한 맞춤형 서비스로 편리함을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#D8CAB8]/80 to-[#CBB7A2]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 서비스
            </h2>
            <p className="text-xl text-gray-600">
              PetMily가 제공하는 특별한 서비스들을 만나보세요
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <ShoppingBag className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pet Mall</h3>
              </div>
              <p className="text-gray-600 mb-6">
                AI 기반 상품 추천 시스템으로 반려동물의 특성에 맞는 최적의 상품을 찾아드립니다.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">개인화된 상품 추천</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">AI 의상 착용 예시</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">카테고리별 상품 분류</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">안전한 결제 시스템</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Find Walker</h3>
              </div>
              <p className="text-gray-600 mb-6">
                신뢰할 수 있는 산책 도우미와 함께 안전하고 즐거운 산책을 경험하세요.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">검증된 산책 도우미</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">실시간 위치 공유</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">채팅을 통한 소통</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">정기 산책 패키지</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#D5CDC9]/80 to-[#D8CAB8]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              PetMily의 특징
            </h2>
            <p className="text-xl text-gray-600">
              왜 PetMily를 선택해야 할까요?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                전문가 네트워크
              </h3>
              <p className="text-gray-600 text-sm">
                검증된 산책 도우미와 전문가들이 함께합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                24/7 지원
              </h3>
              <p className="text-gray-600 text-sm">
                언제든지 필요한 도움을 받을 수 있습니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-500"/>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                품질 보장
              </h3>
              <p className="text-gray-600 text-sm">
                모든 서비스에 대한 품질을 보장합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                개인화 서비스
              </h3>
              <p className="text-gray-600 text-sm">
                AI를 활용한 맞춤형 서비스를 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#C59172]/80 to-[#B07A5C]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 시작해보세요
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            반려동물과의 특별한 순간을 PetMily와 함께 만들어가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-pink-500 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium text-lg"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/support"
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-pink-500 font-medium text-lg"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
