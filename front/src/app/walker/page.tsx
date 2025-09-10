"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, Clock, Star, Filter, Search, Calendar, MessageCircle } from "lucide-react";
import { walkerAPI } from "@/lib/api";
import toast from "react-hot-toast";
import CommonLayout from "../components/common/CommonLayout";
import Footer from "../components/sections/Footer";

interface WalkerProfile {
  id: number;
  userId: number;
  bio?: string;
  experience?: string;
  rating: number;
  hourlyRate: number;
  isAvailable: boolean;
  location?: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function WalkerPage() {
  const [walkers, setWalkers] = useState<WalkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [maxRate, setMaxRate] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState<WalkerProfile | null>(null);

  useEffect(() => {
    fetchWalkers();
  }, []);

  const fetchWalkers = async () => {
    try {
      const response = await walkerAPI.getAvailableWalkers();
      setWalkers(response.data);
    } catch (error) {
      toast.error("산책 도우미를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!searchLocation.trim()) {
      fetchWalkers();
      return;
    }

    try {
      setLoading(true);
      const response = await walkerAPI.getWalkersByLocation(searchLocation);
      setWalkers(response.data);
    } catch (error) {
      toast.error("지역 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleRateFilter = async () => {
    if (!maxRate) {
      fetchWalkers();
      return;
    }

    try {
      setLoading(true);
      const response = await walkerAPI.getWalkersByMaxRate(maxRate);
      setWalkers(response.data);
    } catch (error) {
      toast.error("요금 필터에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const openBookingModal = (walker: WalkerProfile) => {
    setSelectedWalker(walker);
    setShowBookingModal(true);
  };

  const filteredWalkers = walkers.filter(walker => {
    if (searchLocation && walker.location && !walker.location.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    if (maxRate && walker.hourlyRate > maxRate) {
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
        <section className="bg-gradient-to-br from-[#D5CDC9]/80 to-[#CBB7A2]/80 py-12 md:py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-900">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              Find Walker
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 drop-shadow-md">
              신뢰할 수 있는 산책 도우미와 함께 안전하고 즐거운 산책을 경험하세요
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="지역을 입력해주세요 (예: 강남구, 홍대)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                  className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-0 focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
                />
                <button
                  onClick={handleLocationSearch}
                  className="px-6 py-3 bg-white text-blue-500 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-gray-100 font-medium flex items-center justify-center"
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
            <span className="text-gray-700 font-medium">최대 시간당 요금:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setMaxRate(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  maxRate === null
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setMaxRate(10000)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  maxRate === 10000
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ₩10,000 이하
              </button>
              <button
                onClick={() => setMaxRate(15000)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  maxRate === 15000
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ₩15,000 이하
              </button>
              <button
                onClick={() => setMaxRate(20000)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  maxRate === 20000
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ₩20,000 이하
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Walkers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">산책 도우미를 불러오는 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWalkers.map((walker) => (
                <div key={walker.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg">
                            {walker.user?.name?.charAt(0) || 'W'}
                          </span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {walker.user?.name || '산책 도우미'}
                          </h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {walker.rating.toFixed(1)} (리뷰 12개)
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        walker.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {walker.isAvailable ? '예약 가능' : '예약 불가'}
                      </span>
                    </div>
                    
                    {walker.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{walker.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">시간당 ₩{walker.hourlyRate.toLocaleString()}</span>
                    </div>
                    
                    {walker.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {walker.bio}
                      </p>
                    )}
                    
                    {walker.experience && (
                      <p className="text-gray-500 text-xs mb-4">
                        경력: {walker.experience}
                      </p>
                    )}
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openBookingModal(walker)}
                        disabled={!walker.isAvailable}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                          walker.isAvailable
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Calendar className="h-4 w-4 inline mr-1" />
                        예약하기
                      </button>
                      <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-sm font-medium">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredWalkers.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">산책 도우미가 없습니다</h3>
              <p className="text-gray-600">다른 지역이나 조건을 시도해보세요.</p>
            </div>
          )}
        </div>
      </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-[#D5CDC9]/80 to-[#D8CAB8]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              안전하고 신뢰할 수 있는 서비스
            </h2>
            <p className="text-xl text-gray-600">
              PetMily의 산책 도우미는 철저한 검증을 거쳤습니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                검증된 도우미
              </h3>
              <p className="text-gray-600">
                신원 확인, 경력 검증, 교육 과정을 거친 도우미만 선발합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                실시간 위치 공유
              </h3>
              <p className="text-gray-600">
                산책 중 실시간으로 위치를 확인할 수 있습니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                실시간 소통
              </h3>
              <p className="text-gray-600">
                채팅을 통해 도우미와 실시간으로 소통할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>
      
        <Footer />
      </div>
    </div>
  );
}


