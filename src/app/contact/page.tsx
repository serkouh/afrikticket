'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { IconMapPin, IconMail, IconPhone } from '@tabler/icons-react'
import SocialsList from '@/shared/SocialsList'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'

const info = [
	{
		title: 'Adresse',
		desc: '123 Rue de la Paix, 75000 Paris',
		icon: <IconMapPin className="h-6 w-6" />,
	},
	{
		title: 'Email',
		desc: 'contact@devarch.com',
		icon: <IconMail className="h-6 w-6" />,
	},
	{
		title: 'Téléphone',
		desc: '+33 1 23 45 67 89',
		icon: <IconPhone className="h-6 w-6" />,
	},
]

const PageContact = () => {
	return (
		<div className="min-h-[calc(100vh-80px)] bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="mx-auto max-w-4xl text-center">
				<h1 className="text-3xl font-bold text-neutral-900">
					Contactez-nous
				</h1>
				<p className="mt-3 text-base text-neutral-600">
					Notre équipe est là pour vous aider et répondre à toutes vos questions.
				</p>
			</div>

			{/* Main Content */}
			<div className="mx-auto mt-12 max-w-6xl">
				<div className="grid gap-16 lg:grid-cols-2">
					{/* Left Column - Contact Info */}
					<div className="space-y-8">
						{info.map((item, index) => (
							<div
								key={index}
								className="flex items-start gap-6 rounded-xl border border-neutral-200/70 bg-white p-6 shadow-sm transition-all hover:border-secondary-brand/30 hover:shadow-md"
							>
								<div className="rounded-lg bg-secondary-brand/10 p-3 text-secondary-brand ring-1 ring-secondary-brand/20">
									{item.icon}
								</div>
								<div>
									<h3 className="text-lg font-medium text-neutral-900">
										{item.title}
									</h3>
									<p className="mt-1 text-neutral-600">{item.desc}</p>
								</div>
							</div>
						))}

						{/* Social Links */}
						<div className="rounded-xl border border-neutral-200/70 bg-white p-6 shadow-sm">
							<h3 className="mb-4 text-lg font-medium text-neutral-900">
								Suivez-nous
							</h3>
							<SocialsList 
								className="flex gap-4" 
								itemClass="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-secondary-brand hover:text-white transition-colors ring-1 ring-neutral-200" 
							/>
						</div>
					</div>

					{/* Right Column - Contact Form */}
					<div className="rounded-xl border border-neutral-200/70 bg-white p-8 shadow-sm">
						<form className="space-y-6">
							<div>
								<label className="mb-2 block text-sm font-medium text-neutral-700">
									Nom et prénom
								</label>
								<Input
									type="text"
									placeholder="John Doe"
									className="w-full rounded-lg border-neutral-200 bg-white ring-1 ring-neutral-200 transition-all focus:border-secondary-brand focus:ring-secondary-brand/20"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-neutral-700">
									Adresse email
								</label>
								<Input
									type="email"
									placeholder="vous@example.com"
									className="w-full rounded-lg border-neutral-200 bg-white ring-1 ring-neutral-200 transition-all focus:border-secondary-brand focus:ring-secondary-brand/20"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-neutral-700">
									Message
								</label>
								<Textarea
									rows={5}
									placeholder="Votre message ici..."
									className="w-full rounded-lg border-neutral-200 bg-white ring-1 ring-neutral-200 transition-all focus:border-secondary-brand focus:ring-secondary-brand/20"
								/>
							</div>

							<ButtonPrimary className="w-full bg-secondary-brand py-3 text-base font-medium hover:bg-secondary-dark">
								Envoyer le message
							</ButtonPrimary>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PageContact
