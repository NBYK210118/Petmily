'use client'

import { 
  ShoppingBag, 
  MapPin, 
  Star, 
  Shield, 
  Users, 
  Clock, 
  Award, 
  Smartphone,
  Zap,
  Globe,
  Lock
} from 'lucide-react'
import CommonLayout from '../components/common/CommonLayout'
import Footer from '../components/sections/Footer'
import FeatureCard from '../components/common/FeatureCard'
import StatsSection from '../components/common/StatsSection'
import CTASection from '../components/common/CTASection'
import Header from '../components/header'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      title: "AI 기반 상품 추천",
      description: "반려동물의 특성과 선호도를 분석하여 최적의 상품을 추천합니다",
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      color: "from-[#C59172] to-[#B07A5C]",
      details: [
        "개인화된 상품 추천",
        "AI 의상 착용 예시",
        "카테고리별 상품 분류",
        "실시간 가격 비교"
      ]
    },
    {
      title: "신뢰할 수 있는 산책 도우미",
      description: "검증된 산책 도우미와 함께 안전하고 즐거운 산책을 경험하세요",
      icon: <MapPin className="h-8 w-8 text-white" />,
      color: "from-[#D5CDC9] to-[#D8CAB8]",
      details: [
        "검증된 산책 도우미",
        "실시간 위치 공유",
        "채팅을 통한 소통",
        "정기 산책 패키지"
      ]
    },
    {
      title: "24/7 고객 지원",
      description: "언제든지 필요한 도움을 받을 수 있는 전문 고객 지원 서비스",
      icon: <Shield className="h-8 w-8 text-white" />,
      color: "from-[#CBB7A2] to-[#D5CDC9]",
      details: [
        "실시간 채팅 지원",
        "전문 상담사 연결",
        "긴급 상황 대응",
        "FAQ 및 가이드"
      ]
    }
  ]

  const additionalFeatures = [
    {
      title: "모바일 앱",
      description: "언제 어디서나 편리하게 이용할 수 있는 모바일 앱",
      icon: <Smartphone className="h-6 w-6 text-[#C59172]" />
    },
    {
      title: "빠른 결제",
      description: "간편하고 안전한 결제 시스템",
      icon: <Zap className="h-6 w-6 text-[#C59172]" />
    },
    {
      title: "전국 서비스",
      description: "전국 어디서나 이용 가능한 서비스",
      icon: <Globe className="h-6 w-6 text-[#C59172]" />
    },
    {
      title: "개인정보 보호",
      description: "안전한 개인정보 보호 시스템",
      icon: <Lock className="h-6 w-6 text-[#C59172]" />
    }
  ]

  const stats = [
    { number: "10,000+", label: "만족한 고객" },
    { number: "50,000+", label: "추천 상품" },
    { number: "1,000+", label: "검증된 산책 도우미" },
    { number: "99.9%", label: "서비스 가동률" }
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
              Features
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 drop-shadow-md">
              PetMily가 제공하는 다양한 기능들을 만나보세요
            </p>
          </div>
        </div>
      </section>

      <StatsSection 
        stats={stats}
        title="PetMily의 성과"
        subtitle="지금까지의 놀라운 성과를 확인해보세요"
      />

        {/* Main Features Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-[#CBB7A2]/80 to-[#D5CDC9]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
              주요 기능
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto px-4 drop-shadow-md">
              PetMily의 핵심 기능들을 자세히 알아보세요
            </p>
          </div>
          
          <div className="space-y-12">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                details={feature.details}
                variant="detailed"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#D8CAB8] to-[#CBB7A2] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
              추가 기능
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto px-4 drop-shadow-md">
              더욱 편리한 서비스를 위한 다양한 기능들
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                variant="simple"
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="모든 기능을 체험해보세요"
        subtitle="PetMily의 다양한 기능들을 무료로 체험해보세요"
        buttons={[
          {
            text: "무료 체험 시작하기",
            onClick: () => window.location.href = '/register',
            variant: 'primary'
          },
          {
            text: "상세 정보 보기",
            onClick: () => window.location.href = '/about',
            variant: 'secondary'
          }
        ]}
      />
      
        <Footer />
      </div>
    </div>
  )
}
