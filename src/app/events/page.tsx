'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconSearch,
  IconChevronRight,
  IconFilter,
  IconClock,
  IconCalendar,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  price: string
  image?: string
  time_remaining: string
  remaining_tickets: number
  category?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('Tous')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 8 // Showing more items per page than homepage

  const categoryMapping = {
    Tous: 'all',
    Festival: 'festival',
    Concert: 'concert',
    Sport: 'sport',
    Art: 'art',
    Education: 'education',
    Technologie: 'technology',
    Business: 'business',
    Autre: 'other',
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.status === 200 || response.status === 201) {
          setEvents(response.data.data)
          setFilteredEvents(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    // Apply category filter
    if (activeCategory !== 'Tous') {
      filtered = filtered.filter(
        (event) =>
          event.category?.toLowerCase() ===
          categoryMapping[activeCategory as keyof typeof categoryMapping]?.toLowerCase()
      )
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
    setCurrentPage(0)
  }, [activeCategory, events, searchQuery])

  const getPageItems = (items: Event[], page: number) => {
    const start = page * itemsPerPage
    const end = start + itemsPerPage
    return items.slice(start, end)
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Événements à venir</h1>
          <p className="mx-auto max-w-2xl text-neutral-600">
            Découvrez et réservez vos places pour les meilleurs événements. Des festivals aux conférences,
            trouvez l&apos;événement qui vous correspond.
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
                  placeholder="Rechercher un événement..."
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

        {/* Events Grid */}
        <div className="relative px-4 sm:px-6 md:px-8">
          {filteredEvents.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getPageItems(filteredEvents, currentPage).map((event, index) => (
                  <motion.div
                    key={event.id}
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
                          event.image
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${event.image}`
                            : '/placeholder-event.jpg'
                        }
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-secondary-brand backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <IconClock className="h-4 w-4" />
                          {event.time_remaining}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-4 line-clamp-1 text-lg font-semibold text-neutral-900">
                        {event.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-secondary-brand">
                          {event.price} FG
                        </span>
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                          {event.remaining_tickets} places
                        </span>
                      </div>

                      <Link
                        href={`/listing-event-detail/${event.id}`}
                        className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-brand px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-secondary-dark"
                      >
                        Acheter un billet
                        <IconChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
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
                  disabled={getPageItems(filteredEvents, currentPage + 1).length === 0}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 shadow-md transition-all ${
                    getPageItems(filteredEvents, currentPage + 1).length === 0
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
                Aucun événement trouvé
              </h3>
              <p className="text-center text-neutral-500">
                Nous n&apos;avons trouvé aucun événement dans la catégorie
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
