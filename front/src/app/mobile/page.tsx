"use client";

import { useState } from "react";
import { Heart, Home, PawPrint, Activity, ShoppingBag, MapPin, User, Settings } from "lucide-react";

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'mypet', label: '마이펫', icon: PawPrint },
    { id: 'activity', label: '내 활동', icon: Activity },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'mypet':
        return <MyPetTab />;
      case 'activity':
        return <ActivityTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="ml-2 text-lg font-bold text-gray-900">PetMily</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-pink-500">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-500">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderTabContent()}
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 ${
                  activeTab === tab.id
                    ? 'text-pink-500'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HomeTab() {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">안녕하세요! 👋</h2>
        <p className="text-pink-100">오늘도 반려동물과 함께 행복한 하루 보내세요</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 메뉴</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <ShoppingBag className="h-8 w-8 text-pink-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">쇼핑몰</span>
          </button>
          <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">산책 도우미</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">산책 예약 완료</p>
                <p className="text-sm text-gray-600">오늘 오후 3시 - 홍대 공원</p>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                완료
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">상품 주문</p>
                <p className="text-sm text-gray-600">강아지 사료 2kg</p>
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                배송중
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyPetTab() {
  const pets = [
    { id: 1, name: '멍멍이', species: '강아지', breed: '골든리트리버', age: 3 },
    { id: 2, name: '야옹이', species: '고양이', breed: '페르시안', age: 2 },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Pet List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">내 반려동물</h3>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + 추가
          </button>
        </div>
        
        <div className="space-y-4">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <PawPrint className="h-8 w-8 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                  <p className="text-sm text-gray-600">{pet.species} • {pet.breed}</p>
                  <p className="text-sm text-gray-500">{pet.age}살</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pet Health */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">건강 관리</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">15일</div>
              <div className="text-sm text-gray-600">다음 예방접종</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3일</div>
              <div className="text-sm text-gray-600">다음 목욕</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityTab() {
  const activities = [
    { id: 1, type: 'walk', title: '산책 완료', time: '2시간 전', status: 'completed' },
    { id: 2, type: 'order', title: '상품 주문', time: '1일 전', status: 'shipping' },
    { id: 3, type: 'review', title: '리뷰 작성', time: '2일 전', status: 'completed' },
    { id: 4, type: 'booking', title: '산책 예약', time: '3일 전', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'shipping':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'shipping':
        return '배송중';
      case 'pending':
        return '대기중';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Activity Summary */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 달 활동</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-500">12</div>
            <div className="text-sm text-gray-600">산책</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">3</div>
            <div className="text-sm text-gray-600">주문</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">5</div>
            <div className="text-sm text-gray-600">리뷰</div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">통계</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>이번 달 산책 횟수</span>
                <span>12회</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>총 주문 금액</span>
                <span>₩150,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


