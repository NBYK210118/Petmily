'use client'

import Image from 'next/image'

interface Review {
  id: number
  title: string
  body: string
  reviewerName: string
  date: string
  rating: number
}

interface ReviewsSectionProps {
  title?: string
  reviews?: Review[]
}

const defaultReviews: Review[] = [
  {
    id: 1,
    title: "Review title",
    body: "Review body",
    reviewerName: "Reviewer name",
    date: "Date",
    rating: 2
  },
  {
    id: 2,
    title: "Review title",
    body: "Review body",
    reviewerName: "Reviewer name",
    date: "Date",
    rating: 2
  },
  {
    id: 3,
    title: "Review title",
    body: "Review body",
    reviewerName: "Reviewer name",
    date: "Date",
    rating: 2
  }
]

export default function ReviewsSection({ 
  title = "Latest reviews",
  reviews = defaultReviews 
}: ReviewsSectionProps) {
  const renderStars = (rating: number) => {
    return '★☆☆☆☆'.split('').map((star, idx) => (
      <span key={idx} className={idx === rating ? 'text-yellow-400' : 'text-gray-400'}>
        {star}
      </span>
    ))
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-8 md:mb-10 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-2">
                {renderStars(review.rating)}
              </div>
              <h3 className="font-semibold text-lg">{review.title}</h3>
              <p className="text-gray-500 text-sm">{review.body}</p>
              <div className="flex items-center mt-4 gap-2">
                <Image src="/images/user_ex.png" alt="avatar" width={30} height={30} className="rounded-full" />
                <div>
                  <p className="text-sm font-medium">{review.reviewerName}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
