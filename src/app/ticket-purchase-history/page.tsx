'use client'

import React, { FC, useEffect, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Ticket {
  id: number
  event: {
    id: number
    title: string
    date: string
    price: string
    images: Array<{
      id: number
      image_path: string
    }>
  }
  status: string
  token: string
  price: string
  purchase_date: string
}

interface TicketSummary {
  total_tickets: number
  total_spent: number
  upcoming_events: number
  past_events: number
  today_events: number
}

const TicketPurchaseHistory: FC = () => {
  const router = useRouter()
  const [tickets, setTickets] = useState<{
    past: Ticket[]
    today: Ticket[]
    upcoming: Ticket[]
  }>({ past: [], today: [], upcoming: [] })
  const [summary, setSummary] = useState<TicketSummary>({
    total_tickets: 0,
    total_spent: 0,
    upcoming_events: 0,
    past_events: 0,
    today_events: 0
  })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/tickets`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        if (response.data.status === 'success') {
          setTickets(response.data.data.tickets)
          setSummary(response.data.data.summary)
          // console.log(tickets)
        }
      } catch (error) {
        console.error('Error fetching tickets:', error)
      }
    }

    fetchTickets()
  }, [])

  const renderTicketCard = (ticket: Ticket) => {
    return (
      <div key={ticket.id} className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-100 grey:border-neutral-500">
        <div className="flex justify-between items-start gap-6">
          {/* Event Image */}
        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={
              ticket.event.images?.[0]?.image_path
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${ticket.event.images[0].image_path}`
                : 'eventTicket'
            }
            alt={ticket.event.title}
            fill
            className="object-cover"
          />
        </div>
          <div className="flex-grow grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h3 className="text-xl font-semibold mb-4">{ticket.event.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-neutral-500">
                  <span className="block text-sm">Date de l&apos;événement</span>
                  {new Date(ticket.event.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-neutral-500">
                  <span className="block text-sm">Acheté le</span>
                  {new Date(ticket.purchase_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-6000">{ticket.price} GF</span>
              <span className={`mt-2 block px-4 py-1 rounded-full text-sm ${
                ticket.status === 'valid' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>

          {/* <div className="flex-shrink-0">
            <ButtonPrimary className="min-w-[140px] h-[88px]" disabled>
              Voir le billet
            </ButtonPrimary>
          </div> */}
        </div>
      </div>
    )
  }

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
            <p className="text-2xl font-bold">{summary.upcoming_events}</p>
            <p className="text-neutral-600 dark:text-neutral-400">Événements à venir</p>
          </div>
        </div>
      </div>

      {tickets.upcoming.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Événements à venir</h3>
          <div className="space-y-4">
            {tickets.upcoming.map(renderTicketCard)}
          </div>
        </div>
      )}

      {tickets.today.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Aujourd&apos;hui</h3>
          <div className="space-y-4">
            {tickets.today.map(renderTicketCard)}
          </div>
        </div>
      )}

      {tickets.past.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Événements passés</h3>
          <div className="space-y-4">
            {tickets.past.map(renderTicketCard)}
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketPurchaseHistory
