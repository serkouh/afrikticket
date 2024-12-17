'use client'

import { MapPinIcon } from '@heroicons/react/24/solid'
import Label from '@/components/Label'
import { FC } from 'react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from './FormItem'
import { Map, Marker } from '@vis.gl/react-google-maps'
import Image from 'next/image'
import eventTicket from '@/images/event_ticket.jpg'
import ButtonPrimary from '@/shared/ButtonPrimary'

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
	return (
		<div className={`nc-PageAddListing1 mx-auto max-w-3xl px-4 pb-24 pt-14 sm:py-24 lg:pb-32`}>
		<div className="listingSection__wrap">
			<h2 className="text-2xl font-semibold">Événement de collecte de fonds</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
			<div>
					<Label>Détails de l'événement</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
					Rejoignez-nous pour un événement spécial de collecte de fonds en soutien à [cause/organisation] le samedi 20 janvier 2024 à 18h00, à la Salle des Fêtes, 12 Rue de la Paix, Paris. Cette soirée comprendra un dîner, des performances musicales, une tombola, et une vente aux enchères pour une bonne cause. Les billets sont disponibles à partir de 50 €, et tous les fonds récoltés seront reversés à [cause/organisation]. Venez nombreux pour passer un moment convivial et solidaire !
					</span>
					<Label>Montant du don</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
					50,000 FGN
					</span>
					<Label>Date</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
					12-12-2024
					</span>
					<div className="mt-4">
						<div className="aspect-h-5 aspect-w-5 sm:aspect-h-3">
							<div className="overflow-hidden rounded-xl">
								<Image
								alt='eventTicket'
								src={eventTicket}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* <ButtonSecondary>
					<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
					<span className="ml-3">Use current location</span>
				</ButtonSecondary> */}
				{/* ITEM */}
				{/* <FormItem label="Country/Region">
					<Select>
						<option value="Viet Nam">Viet Nam</option>
						<option value="Thailand">Thailand</option>
						<option value="France">France</option>
						<option value="Singapore">Singapore</option>
						<option value="Jappan">Jappan</option>
						<option value="Korea">Korea</option>
						<option value="...">...</option>
					</Select>
				</FormItem> */}
				<FormItem label="Montant du don">
					<Input placeholder="10,000 FGN" />
				</FormItem>
					<ButtonPrimary>Faites un don maintenant</ButtonPrimary>
				{/* <FormItem label="Room number (optional)">
					<Input />
				</FormItem> */}
				{/* <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
					<FormItem label="City">
						<Input />
					</FormItem>
					<FormItem label="State">
						<Input />
					</FormItem>
					<FormItem label="Postal code">
						<Input />
					</FormItem>
				</div> */}
				
			</div>
		</div>
		</div>
	)
}

export default PageAddListing2
