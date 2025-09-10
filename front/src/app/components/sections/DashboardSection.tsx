'use client'

import Image from 'next/image'

interface DashboardSectionProps {
  title?: string
  showUserAvatar?: boolean
}

export default function DashboardSection({ 
  title = "Dashboard",
  showUserAvatar = true 
}: DashboardSectionProps) {
  return (
    <section className="bg-[#D2BBA1] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#C4A583] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{title}</h3>
            {showUserAvatar && (
              <div className="flex items-center gap-4">
                <Image src="/images/user_ex.png" alt="user" width={32} height={32} className="rounded-full" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="h-24 bg-white rounded" />
            <div className="h-24 bg-white rounded" />
            <div className="h-24 bg-white rounded" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-40 bg-white rounded" />
            <div className="space-y-4">
              <div className="h-20 bg-white rounded" />
              <div className="h-20 bg-white rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
