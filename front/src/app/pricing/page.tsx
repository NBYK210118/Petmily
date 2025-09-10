'use client'

import { useState, useEffect } from 'react'
import { Check, Star, Zap, Crown, X } from 'lucide-react'
import CommonLayout from '../components/common/CommonLayout'
import Footer from '../components/sections/Footer'
import PricingCard from '../components/common/PricingCard'
import FAQSection from '../components/common/FAQSection'
import CTASection from '../components/common/CTASection'
import Header from '../components/header'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Standard')
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [hasScrolledToPricing, setHasScrolledToPricing] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing-cards')
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0
        
        if (isVisible && !hasScrolledToPricing) {
          setHasScrolledToPricing(true)
          // 1초 후에 모달 표시
          setTimeout(() => {
            setShowTrialModal(true)
          }, 1000)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolledToPricing])

  const plans = [
    {
      name: "Basic",
      price: { monthly: 49900, annual: 499000 },
      description: "개인 사용자를 위한 기본 플랜",
      icon: <Star className="h-6 w-6 text-[#C59172]" />,
      color: "from-[#D5CDC9] to-[#D8CAB8]",
      features: [
        "AI 상품 추천 (월 50회)",
        "기본 산책 도우미 검색",
        "이메일 고객 지원",
        "모바일 앱 이용",
        "기본 상품 필터링"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: { monthly: 99000, annual: 990000 },
      description: "가장 인기 있는 플랜",
      icon: <Zap className="h-6 w-6 text-[#C59172]" />,
      color: "from-[#C59172] to-[#B07A5C]",
      features: [
        "AI 상품 추천 (무제한)",
        "우선 산책 도우미 매칭",
        "실시간 채팅 지원",
        "고급 상품 필터링",
        "위시리스트 기능",
        "정기 산책 패키지 할인"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: { monthly: 149000, annual: 1490000 },
      description: "전문가를 위한 프리미엄 플랜",
      icon: <Crown className="h-6 w-6 text-[#C59172]" />,
      color: "from-[#CBB7A2] to-[#D5CDC9]",
      features: [
        "모든 Standard 기능",
        "전용 고객 지원",
        "우선 예약 시스템",
        "맞춤형 상품 큐레이션",
        "전문가 상담 서비스",
        "API 접근 권한",
        "화이트라벨 솔루션"
      ],
      popular: false
    }
  ]

  const faqs = [
    {
      question: "무료 체험 기간이 있나요?",
      answer: "네, 모든 플랜에 대해 14일 무료 체험을 제공합니다. 언제든지 취소할 수 있습니다."
    },
    {
      question: "플랜을 언제든지 변경할 수 있나요?",
      answer: "네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경사항은 다음 결제일부터 적용됩니다."
    },
    {
      question: "연간 결제 시 할인이 있나요?",
      answer: "네, 연간 결제 시 2개월 무료 혜택을 받을 수 있습니다. 즉, 12개월 요금으로 14개월을 이용할 수 있습니다."
    },
    {
      question: "환불 정책은 어떻게 되나요?",
      answer: "14일 무료 체험 기간 내에는 언제든지 환불이 가능합니다. 체험 기간 이후에는 남은 기간에 대한 비례 환불을 제공합니다."
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#C59172]/80 to-[#B07A5C]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
              Pricing
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4 drop-shadow-md">
              반려동물과 함께하는 특별한 경험을 위한 맞춤형 플랜을 선택하세요
            </p>
          </div>
        </div>
      </section>

        {/* Pricing Toggle */}
        <section className="py-6 sm:py-8 md:py-10 bg-gradient-to-br from-[#D5CDC9]/80 to-[#D8CAB8]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Pricing Toggle */}
            <div className="bg-white/80 backdrop-blur-sm p-1 rounded-lg">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 xs:px-4 sm:px-6 py-2 text-xs xs:text-sm sm:text-base rounded-md transition ${
                  !isAnnual 
                    ? 'bg-[#C59172] text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                월간 결제
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 xs:px-4 sm:px-6 py-2 text-xs xs:text-sm sm:text-base rounded-md transition ${
                  isAnnual 
                    ? 'bg-[#C59172] text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                연간 결제
                <span className="ml-1 xs:ml-2 text-xs bg-green-500 text-white px-1 xs:px-2 py-0.5 xs:py-1 rounded-full">
                  2개월 무료
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

        {/* Pricing Cards */}
        <section id="pricing-cards" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#CBB7A2]/80 to-[#D5CDC9]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                icon={plan.icon}
                color={plan.color}
                features={plan.features}
                popular={plan.popular}
                isAnnual={isAnnual}
                isSelected={selectedPlan === plan.name}
                onSelect={() => setSelectedPlan(plan.name)}
              />
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title="자주 묻는 질문"
        subtitle="가격에 대한 궁금한 점들을 해결해드립니다"
        faqs={faqs}
        searchable={false}
      />

      {/* <CTASection
        title="지금 시작해보세요"
        subtitle="14일 무료 체험으로 PetMily의 모든 기능을 경험해보세요"
        buttons={[
          {
            text: "무료 체험 시작하기",
            onClick: () => window.location.href = '/register',
            variant: 'primary'
          },
          {
            text: "문의하기",
            onClick: () => window.location.href = '/support',
            variant: 'secondary'
          }
        ]}
      /> */}

      {/* Free Trial Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs xs:max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 transform transition-all ease-out scale-100 opacity-100 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-r from-[#C59172] to-[#B07A5C] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">무료 체험 시작하기</h3>
              </div>
              <button
                onClick={() => setShowTrialModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">🎉 14일 무료 체험</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  신용카드 등록 없이 모든 기능을 무료로 체험해보세요
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">모든 플랜 기능 이용 가능</p>
                    <p className="text-xs text-gray-500">Basic, Standard, Pro 모든 기능을 자유롭게 사용</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">AI 상품 추천 서비스</p>
                    <p className="text-xs text-gray-500">개인화된 상품 추천과 맞춤형 쇼핑 경험</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">전문 산책 도우미</p>
                    <p className="text-xs text-gray-500">검증된 산책 도우미와 안전한 서비스</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">언제든지 취소 가능</p>
                    <p className="text-xs text-gray-500">체험 기간 중 언제든지 서비스 해지 가능</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => window.location.href = '/register'}
                  className="flex-1 bg-gradient-to-r from-[#C59172] to-[#B07A5C] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#B07A5C] hover:to-[#C59172]"
                >
                  무료 체험 시작하기
                </button>
                <button
                  onClick={() => setShowTrialModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-sm transition-colors hover:bg-gray-200"
                >
                  나중에 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
        <Footer />
      </div>
    </div>
  )
}
