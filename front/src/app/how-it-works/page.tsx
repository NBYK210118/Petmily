'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle, Star, Users, Clock, Shield } from 'lucide-react'
import CommonLayout from '../components/common/CommonLayout'
import Footer from '../components/sections/Footer'
import Header from '../components/header'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "회원가입",
      description: "간단한 정보 입력으로 PetMily에 가입하세요",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "from-[#C59172] to-[#B07A5C]"
    },
    {
      number: 2,
      title: "반려동물 정보 등록",
      description: "반려동물의 특성과 선호도를 입력해주세요",
      icon: <Star className="h-8 w-8 text-white" />,
      color: "from-[#D5CDC9] to-[#D8CAB8]"
    },
    {
      number: 3,
      title: "AI 맞춤 추천",
      description: "AI가 분석하여 최적의 상품과 서비스를 추천합니다",
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      color: "from-[#CBB7A2] to-[#D5CDC9]"
    },
    {
      number: 4,
      title: "서비스 이용",
      description: "추천받은 상품 구매 또는 산책 도우미 예약을 하세요",
      icon: <Shield className="h-8 w-8 text-white" />,
      color: "from-[#D8CAB8] to-[#CBB7A2]"
    }
  ]

  const features = [
    {
      title: "AI 기반 상품 추천",
      description: "반려동물의 특성에 맞는 최적의 상품을 AI가 추천합니다",
      icon: <Star className="h-6 w-6 text-[#C59172]" />
    },
    {
      title: "검증된 산책 도우미",
      description: "신뢰할 수 있는 산책 도우미와 안전한 산책을 경험하세요",
      icon: <Shield className="h-6 w-6 text-[#C59172]" />
    },
    {
      title: "24/7 고객 지원",
      description: "언제든지 필요한 도움을 받을 수 있습니다",
      icon: <Clock className="h-6 w-6 text-[#C59172]" />
    }
  ]

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
        <section className="py-12 md:py-20 bg-gradient-to-br from-[#C59172]/80 to-[#B07A5C]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              How It Works
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 drop-shadow-md">
              PetMily가 어떻게 작동하는지 단계별로 알아보세요
            </p>
          </div>
        </div>
      </section>

        {/* Steps Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-[#D5CDC9]/80 to-[#D8CAB8]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
              간단한 4단계
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto px-4 drop-shadow-md">
              PetMily와 함께하는 여정을 시작해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className={`bg-gradient-to-br ${step.color} p-6 rounded-xl shadow-lg backdrop-blur-sm`}>
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">0{step.number}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/90 text-sm">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-[#CBB7A2]/80 to-[#D5CDC9]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
              주요 기능
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto px-4 drop-shadow-md">
              PetMily가 제공하는 특별한 기능들을 만나보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#C59172]/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#C59172] to-[#B07A5C] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            지금 시작해보세요
          </h2>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            반려동물과의 특별한 순간을 PetMily와 함께 만들어가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#C59172] px-8 py-3 rounded-lg hover:bg-gray-100 font-medium text-lg transition">
              무료로 시작하기
            </button>
            <button className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#C59172] font-medium text-lg transition">
              더 알아보기
            </button>
          </div>
        </div>
      </section>
      
        <Footer />
      </div>
    </div>
  )
}
