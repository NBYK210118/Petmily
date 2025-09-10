"use client";

import { useState } from "react";
import { Heart, ArrowRight, ArrowLeft, PawPrint, Star, MapPin, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const petSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  species: z.string().min(1, "종을 선택해주세요"),
  breed: z.string().min(1, "품종을 입력해주세요"),
  age: z.number().min(0, "나이를 입력해주세요"),
  gender: z.string().min(1, "성별을 선택해주세요"),
  personality: z.string().optional(),
});

type PetForm = z.infer<typeof petSchema>;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PetForm>({
    resolver: zodResolver(petSchema),
  });

  const steps = [
    {
      title: "환영합니다! 🎉",
      description: "PetMily에 오신 것을 환영합니다. 반려동물과 함께하는 행복한 일상을 시작해보세요.",
      content: <WelcomeStep />,
    },
    {
      title: "반려동물 정보 입력",
      description: "반려동물의 기본 정보를 입력해주세요.",
      content: <PetInfoStep register={register} errors={errors} />,
    },
    {
      title: "완료! 🎊",
      description: "모든 설정이 완료되었습니다. 이제 PetMily의 모든 기능을 이용하실 수 있습니다.",
      content: <CompletionStep />,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: PetForm) => {
    console.log("Pet data:", data);
    toast.success("반려동물 정보가 저장되었습니다!");
    nextStep();
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">설정 완료!</h1>
          <p className="text-xl text-gray-600 mb-8">PetMily의 모든 기능을 이용하실 수 있습니다.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 font-medium text-lg"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="ml-2 text-2xl font-bold text-gray-900">PetMily</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {steps[currentStep].title}
            </h1>
            <p className="text-xl text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="mb-8">
            {currentStep === 1 ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                {steps[currentStep].content}
              </form>
            ) : (
              steps[currentStep].content
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              이전
            </button>

            {currentStep === 1 ? (
              <button
                type="submit"
                form="pet-form"
                className="flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium"
              >
                다음
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium"
              >
                다음
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-16 w-16 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          PetMily와 함께하세요!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          반려동물을 위한 최고의 쇼핑과 산책 서비스를 제공합니다.
          AI 기반 상품 추천과 신뢰할 수 있는 산책 도우미를 만나보세요.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-pink-50 rounded-lg">
          <ShoppingBag className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 상품 추천</h3>
          <p className="text-gray-600 text-sm">
            반려동물의 특성에 맞는 맞춤형 상품을 추천해드립니다
          </p>
        </div>
        
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">산책 도우미</h3>
          <p className="text-gray-600 text-sm">
            신뢰할 수 있는 산책 도우미와 함께 안전한 산책을 즐기세요
          </p>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <Star className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">의상 착용 예시</h3>
          <p className="text-gray-600 text-sm">
            AI로 반려동물의 의상 착용 모습을 미리 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}

function PetInfoStep({ register, errors }: { register: any; errors: any }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          반려동물 이름 *
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="예: 멍멍이"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          종 *
        </label>
        <select
          {...register("species")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">종을 선택해주세요</option>
          <option value="dog">강아지</option>
          <option value="cat">고양이</option>
          <option value="bird">새</option>
          <option value="fish">물고기</option>
          <option value="other">기타</option>
        </select>
        {errors.species && (
          <p className="mt-1 text-sm text-red-600">{errors.species.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          품종 *
        </label>
        <input
          {...register("breed")}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="예: 골든리트리버"
        />
        {errors.breed && (
          <p className="mt-1 text-sm text-red-600">{errors.breed.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            나이 *
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="예: 3"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별 *
          </label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">성별을 선택해주세요</option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          성격 (선택사항)
        </label>
        <textarea
          {...register("personality")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="예: 활발하고 친근함"
        />
      </div>
    </div>
  );
}

function CompletionStep() {
  return (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <PawPrint className="h-16 w-16 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          설정이 완료되었습니다! 🎉
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          이제 PetMily의 모든 기능을 이용하실 수 있습니다.
          반려동물을 위한 최고의 서비스를 경험해보세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="bg-pink-50 p-6 rounded-lg">
          <ShoppingBag className="h-8 w-8 text-pink-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">쇼핑몰 둘러보기</h3>
          <p className="text-sm text-gray-600">
            AI가 추천하는 상품들을 확인해보세요
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">산책 도우미 찾기</h3>
          <p className="text-sm text-gray-600">
            신뢰할 수 있는 산책 도우미를 찾아보세요
          </p>
        </div>
      </div>
    </div>
  );
}


