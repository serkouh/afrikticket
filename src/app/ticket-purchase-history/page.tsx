'use client'

import React, { FC, useEffect, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import eventTicket from '@/images/event_ticket.jpg'

interface Ticket {
  id: number
  title: string
  description: string
  date: string
  location: string
  price: string
  main_image: string
  tickets: {
    count: number
    total_cost: number
    status: string
  }
}

interface TicketSummary {
  total_tickets: number
  total_spent: number
  total_events: number
}

const TicketPurchaseHistory: FC = () => {
  const router = useRouter()
  const [events, setEvents] = useState<{
    upcoming: Ticket[]
    today: Ticket[]
    past: Ticket[]
  }>({
    upcoming: [],
    today: [],
    past: []
  })
  const [summary, setSummary] = useState<TicketSummary>({
    total_tickets: 0,
    total_spent: 0,
    total_events: 0
  })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        
        // Log the response to check its structure
        console.log('API Response:', response.data);

        if (response.data.status === 'success') {
          setEvents(response.data.data.events || { upcoming: [], today: [], past: [] });
          setSummary(response.data.data.summary || { total_tickets: 0, total_spent: 0, total_events: 0 });
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets();
  }, []);

  const renderEventCard = (event: Ticket) => {
    const imagePath = event.main_image
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${event.main_image}`
      : eventTicket;

    return (
      <div key={event.id} className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center p-4 sm:p-5 gap-4">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={imagePath}
              alt={event.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity" />
          </div>
          
          <div className="flex-grow space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold line-clamp-1 text-neutral-900 dark:text-neutral-100">
                  {event.title}
                </h3>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  event.tickets.status === 'upcoming' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {event.tickets.status}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-3">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              </div>
            </div>

            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            <div className="flex flex-wrap justify-between items-end">
              <div className="space-y-1">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Tickets achetés</p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {event.tickets.count}
                  </span>
                  <span className="text-sm text-neutral-500">×</span>
                  <span className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {event.price} GF
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {event.tickets.total_cost} GF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-16 space-y-16">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Historique des billets</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-2xl">
            <p className="text-2xl font-bold">{summary.total_tickets}</p>
            <p className="text-neutral-600 dark:text-neutral-400">Total des billets</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl">
            <p className="text-2xl font-bold">{summary.total_spent} GF</p>
            <p className="text-neutral-600 dark:text-neutral-400">Total dépensé</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-2xl">
            <p className="text-2xl font-bold">{summary.total_events}</p>
            <p className="text-neutral-600 dark:text-neutral-400">Total d&lsquo;événements</p>
          </div>
        </div>
      </div>

      {events.upcoming.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Événements à venir</h3>
          <div className="space-y-4">
            {events.upcoming.map(renderEventCard)}
          </div>
        </div>
      )}

      {events.today.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Aujourd&apos;hui</h3>
          <div className="space-y-4">
            {events.today.map(renderEventCard)}
          </div>
        </div>
      )}

      {events.past.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Événements passés</h3>
          <div className="space-y-4">
            {events.past.map(renderEventCard)}
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketPurchaseHistory