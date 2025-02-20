'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { IconHeart, IconShare2, IconUsers, IconChartBar, IconCash, IconArrowRight } from '@tabler/icons-react'

interface TrendingFundraisingData {
  id: number
  title: string
  description: string
  goal: string
  current: string
  organization: {
    id: number
    name: string
    description: string
  }
  main_image: string
  stats: {
    total_donors: number
    total_raised: string
    progress_percentage: number
    remaining_amount: number
  }
}

const TrendingFundraising = () => {
  const [trendingData, setTrendingData] = useState<TrendingFundraisingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising/trending`
        )
        setTrendingData(response.data.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTrending()
  }, [])

  if (isLoading || !trendingData) {
    return (
      <div className="relative h-[700px] animate-pulse rounded-2xl bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Hero Section */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 p-8 gap-8">
        {/* Left Column */}
        <div className="relative">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${trendingData.main_image}`}
              alt={trendingData.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute left-4 top-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Campagne Urgente
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{trendingData.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{trendingData.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-gray-100 p-6 text-center">
              <IconCash className="mb-2 h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-bold text-gray-900">{trendingData.stats.total_raised}</div>
              <div className="text-sm text-gray-500">FG Collectés</div>
            </div>
            <div className="rounded-xl bg-gray-100 p-6 text-center">
              <IconUsers className="mb-2 h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-bold text-gray-900">{trendingData.stats.total_donors}</div>
              <div className="text-sm text-gray-500">Donateurs</div>
            </div>
            <div className="rounded-xl bg-gray-100 p-6 text-center">
              <IconChartBar className="mb-2 h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-bold text-gray-900">{trendingData.stats.progress_percentage}%</div>
              <div className="text-sm text-gray-500">Objectif</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Progression vers l&apos;objectif</span>
              <span className="font-semibold">{trendingData.stats.progress_percentage}%</span>
            </div>
            <div className="relative h-3 rounded-full bg-gray-200 mt-2">
              <div 
                className="absolute h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
                style={{ width: `${trendingData.stats.progress_percentage}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Collecté: {trendingData.stats.total_raised} FG</span>
              <span>Objectif: {trendingData.goal} FG</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/fundraising-detail/${trendingData.id}`}
            className="mt-4 block rounded-xl bg-emerald-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Faire un don maintenant
            <IconArrowRight className="inline-block ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TrendingFundraising;
