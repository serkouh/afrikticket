'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconSearch,
  IconChevronRight,
  IconArrowRight,
  IconHeartHandshake,
  IconUsers,
  IconChartBar,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

interface FundraisingData {
  fundraising: {
    id: number
    title: string
    description: string
    goal: number
    category?: string
    organization: {
      name: string
    }
    images?: {
      image_path: string
      is_main: number
    }[]
  }
  stats: {
    total_raised: number
    total_donors: number
    progress_percentage: number
  }
}

export default function FundraisingsPage() {
  const [fundraisings, setFundraisings] = useState<FundraisingData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('Tous')
  const [filteredFundraisings, setFilteredFundraisings] = useState<FundraisingData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 8

  const categoryMapping = {
    Tous: 'all',
    Education: 'education',
    Santé: 'health',
    Environnement: 'environment',
    Humanitaire: 'humanitarian',
    Technologie: 'technology',
    Communauté: 'community',
    Urgence: 'emergency',
    Autre: 'other',
  }

  useEffect(() => {
    const fetchFundraisings = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.status === 200 || response.status === 201) {
          setFundraisings(response.data.data.fundraisings)
          setFilteredFundraisings(response.data.data.fundraisings)
        }
      } catch (error) {
        console.error('Error fetching fundraisings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFundraisings()
  }, [])

  useEffect(() => {
    let filtered = fundraisings

    // Apply category filter
    if (activeCategory !== 'Tous') {
      filtered = filtered.filter(
        (item) =>
          item.fundraising.category?.toLowerCase() ===
          categoryMapping[activeCategory as keyof typeof categoryMapping]?.toLowerCase()
      )
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.fundraising.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredFundraisings(filtered)
    setCurrentPage(0)
  }, [activeCategory, fundraisings, searchQuery])

  const getPageItems = (items: FundraisingData[], page: number) => {
    const start = page * itemsPerPage
    const end = start + itemsPerPage
    return items.slice(start, end)
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Campagnes de collecte de fonds</h1>
          <p className="mx-auto max-w-2xl text-neutral-600">
            Découvrez et soutenez des causes qui font la différence. Chaque don compte pour créer un impact positif dans notre communauté.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col gap-6">
          {/* Search Bar */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex overflow-hidden rounded-full border-2 border-secondary-brand/20 bg-white transition-all focus-within:border-secondary-brand/50 hover:border-secondary-brand/30">
              <div className="flex flex-1 items-center gap-3 px-6">
                <IconSearch className="h-5 w-5 text-secondary-brand/70" />
                <input
                  type="text"
                  placeholder="Rechercher une campagne..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-none bg-transparent py-4 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {Object.keys(categoryMapping).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-secondary-brand text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Fundraising Grid */}
        <div className="relative px-4 sm:px-6 md:px-8">
          {filteredFundraisings.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getPageItems(filteredFundraisings, currentPage).map((item, index) => (
                  <motion.div
                    key={item.fundraising.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeOut',
                      delay: index * 0.1,
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={
                          item.fundraising.images?.find((img) => img.is_main === 1)
                            ?.image_path
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${
                                item.fundraising.images.find((img) => img.is_main === 1)
                                  ?.image_path
                              }`
                            : '/placeholder-fundraising.jpg'
                        }
                        alt={item.fundraising.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="p-5">
                      <div className="mb-4">
                        <h3 className="line-clamp-1 text-lg font-semibold text-neutral-900">
                          {item.fundraising.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {item.fundraising.organization.name}
                        </p>
                      </div>

                      {/* Progress Section */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-secondary-brand">
                            {item.stats.total_raised} GP collectés
                          </span>
                          <span className="text-xs text-neutral-500">
                            Objectif: {item.fundraising.goal} GP
                          </span>
                        </div>
                        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-secondary-brand transition-all duration-300"
                            style={{
                              width: `${item.stats.progress_percentage}%`,
                            }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                          <span>{item.stats.total_donors} donateurs</span>
                          <span>{item.stats.progress_percentage}% atteint</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/fundraising-detail/${item.fundraising.id}`}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-brand px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-secondary-dark"
                      >
                        Faire un don
                        <IconArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons - Bottom center */}
              <div className="mt-12 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 shadow-md transition-all ${
                    currentPage === 0
                      ? 'bg-neutral-100 text-neutral-400'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <IconChevronRight className="h-4 w-4 rotate-180" />
                  <span className="hidden sm:inline">Précédent</span>
                </button>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={getPageItems(filteredFundraisings, currentPage + 1).length === 0}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 shadow-md transition-all ${
                    getPageItems(filteredFundraisings, currentPage + 1).length === 0
                      ? 'bg-neutral-100 text-neutral-400'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <IconChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16"
            >
              <div className="mb-4 rounded-full bg-neutral-100 p-4">
                <IconSearch className="h-8 w-8 text-neutral-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                Aucune campagne trouvée
              </h3>
              <p className="text-center text-neutral-500">
                Nous n&apos;avons trouvé aucune campagne dans la catégorie
                &quot;{activeCategory}&quot;.
                <br />
                Essayez une autre catégorie ou revenez plus tard.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
} 