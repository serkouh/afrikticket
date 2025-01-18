'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { FC, Fragment, useState, useEffect } from 'react'
import visaPng from '@/images/vis.png'
import mastercardPng from '@/images/mastercard.svg'
import Input from '@/shared/Input'
import Label from '@/components/Label'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import StartRating from '@/components/StartRating'
import NcModal from '@/shared/NcModal'
import ModalSelectDate from '@/components/ModalSelectDate'
import converSelectedDateToString from '@/utils/converSelectedDateToString'
import ModalSelectGuests from '@/components/ModalSelectGuests'
import Image from 'next/image'
import { GuestsObject } from '../(client-components)/type'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'


export interface CheckOutPagePageMainProps {
	className?: string
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
	className = '',
}) => {
	const router = useRouter();
	const [checkoutData, setCheckoutData] = useState<any>(null);
	const [formData, setFormData] = useState({
		quantity: '',
		amount: '',
		name: '',
		email: '',
		phone: ''
	});

	useEffect(() => {
		const data = localStorage.getItem('checkoutData');
		if (data) {
			setCheckoutData(JSON.parse(data));
		}

		// Get user info from localStorage
		const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
		const checkoutInfo = JSON.parse(localStorage.getItem('checkoutData') || '{}');
		
		setFormData(prev => ({
			...prev,
			name: userInfo.name || '',
			email: userInfo.email || '',
			phone: userInfo.phone || '',
			amount: checkoutInfo.amount || '',
			quantity: checkoutInfo.quantity || ''
		}));
	}, []);

	// Update localStorage when amount/quantity changes
	const handleQuantityAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const field = checkoutData?.type === 'donation' ? 'amount' : 'quantity';
		
		setFormData(prev => ({ ...prev, [field]: value }));
		
		// Update checkoutData in localStorage
		const updatedCheckoutData = {
			...checkoutData,
			[field]: value,
			total: checkoutData?.type === 'donation' 
				? Number(value) 
				: (checkoutData?.price || 0) * Number(value)
		};
		localStorage.setItem('checkoutData', JSON.stringify(updatedCheckoutData));
	};

	const handlePayment = async () => {
		try {
		  const token = localStorage.getItem('token');
		  if (!token) {
			toast.error('Veuillez vous connecter pour continuer');
			return;
		  }
	  
		  let response;
		  if (checkoutData.type === 'donation') {
			response = await axios.post(
			  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising/${checkoutData.fundraisingId}/donate`,
			  {
				amount: checkoutData.amount,
				payment_method: "credit_card"
			  },
			  {
				headers: {
				  Authorization: `Bearer ${token}`,
				  'Content-Type': 'application/json',
				},
			  }
			);
		  } else {
			response = await axios.post(
			  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${checkoutData.eventId}/tickets`,
			  {
				quantity: checkoutData.quantity,
			  },
			  {
				headers: {
				  Authorization: `Bearer ${token}`,
				  'Content-Type': 'application/json',
				},
			  }
			);
		  }
	  
		  if (response.status >= 200 && response.status < 300) {
			localStorage.removeItem('checkoutData');
			toast.success('Paiement effectué avec succès');
			router.push(`/thank-you?type=${checkoutData.type}`);
		  }
		} catch (error) {
		  console.error('Payment error:', error);
		  toast.error('Le paiement a échoué. Veuillez réessayer.');
		}
	  };

	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/02/06'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/02/23'))

	const [guests, setGuests] = useState<GuestsObject>({
		guestAdults: 2,
		guestChildren: 1,
		guestInfants: 1,
	})

	const renderSidebar = () => {
		return (
			<div className="flex w-full flex-col space-y-6 border-neutral-200 px-0 dark:border-neutral-700 sm:space-y-8 sm:rounded-2xl sm:p-6 lg:border xl:p-8">
				<div className="flex flex-col sm:flex-row sm:items-center">
					<div className="w-full flex-shrink-0 sm:w-40">
						<div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-2xl sm:aspect-h-4">
							<Image
								alt=""
								fill
								sizes="200px"
								src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
							/>
						</div>
					</div>
					<div className="space-y-3 py-5 sm:px-5">
						<div>
							<span className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
								Hotel room in Tokyo, Jappan
							</span>
							<span className="mt-1 block text-base font-medium">
								The Lounge & Bar
							</span>
						</div>
						<span className="block text-sm text-neutral-500 dark:text-neutral-400">
							2 beds · 2 baths
						</span>
						<div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
						<StartRating />
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h3 className="text-2xl font-semibold">Price detail</h3>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>$19 x 3 day</span>
						<span>$57</span>
					</div>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>Service charge</span>
						<span>$0</span>
					</div>

					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>$57</span>
					</div>
				</div>
			</div>
		)
	}

	const renderMain = () => {
		return (
			<div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<h2 className="text-3xl font-semibold lg:text-4xl">
					Confirmation et paiement
				</h2>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<div>
						<div className="space-y-1 mb-5">
							<Label>
								{checkoutData?.type === 'donation' ? 'Montant du don' : 'Nombre de billets'}
							</Label>
							<Input 
								type="number" 
								value={checkoutData?.type === 'donation' ? formData.amount : formData.quantity}
								onChange={handleQuantityAmountChange}
								min="1"
								className="focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>
						<div className="space-y-1 mb-5">
							<Label>Nom</Label>
							<Input 
								value={formData.name}
								onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
							/>
						</div>
						<div className="space-y-1 mb-5">
							<Label>E-mail</Label>
							<Input 
								type='email' 
								value={formData.email}
								onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
							/>
						</div>
						<div className="space-y-1 mb-5">
							<Label>Numéro de téléphone</Label>
							<Input 
								type='tel'
								value={formData.phone}
								onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
							/>
						</div>
					</div>
				</div>

				<div>
					<h3 className="text-2xl font-semibold">Pay with</h3>
					<div className="my-5 w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

					<div className="mt-6">
						<TabGroup>
							<TabList className="my-5 flex gap-1">
							<Tab as={Fragment}>
									{({ selected }) => (
										<button
											className={`flex items-center justify-center rounded-full px-4 py-1.5 focus:outline-none sm:px-6 sm:py-2.5 ${selected
													? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900'
													: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
												}`}
										>
											<span className="mr-2.5">Carte de crédit</span>
											<Image className="w-8" src={visaPng} alt="visa" />
											<Image
												className="w-8"
												src={mastercardPng}
												alt="mastercard"
											/>
										</button>
									)}
								</Tab>
								<Tab as={Fragment}>
									{({ selected }) => (
										<button
											className={`rounded-full px-4 py-1.5 focus:outline-none sm:px-6 sm:py-2.5 ${selected
													? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900'
													: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
												}`}
										>
											argent orange
										</button>
									)}
								</Tab>
								
							</TabList>

							<TabPanels>
								<TabPanel className="space-y-5">
									<div className="space-y-1">
										<Label>Numéro de carte </Label>
										<Input defaultValue="111 112 222 999" />
									</div>
									<div className="space-y-1">
										<Label>Titulaire de la carte</Label>
										<Input defaultValue="JOHN DOE" />
									</div>
									<div className="flex space-x-5">
										<div className="flex-1 space-y-1">
											<Label>Date d&apos;expiration </Label>
											<Input type="date" defaultValue="MM/YY" />
										</div>
										<div className="flex-1 space-y-1">
											<Label>CVC </Label>
											<Input />
										</div>
									</div>
									{/* <div className="space-y-1">
										<Label>Messager for author </Label>
										<Textarea placeholder="..." />
										<span className="block text-sm text-neutral-500">
											Write a few sentences about yourself.
										</span>
									</div> */}
								</TabPanel>
								<TabPanel className="space-y-5">
									<div className="space-y-1">
										<Label>E-mail </Label>
										<Input type="email" defaultValue="example@gmail.com" />
									</div>
									<div className="space-y-1">
										<Label>Mot de passe</Label>
										<Input type="password" defaultValue="***" />
									</div>
									{/* <div className="space-y-1">
										<Label>Messager for author </Label>
										<Textarea placeholder="..." />
										<span className="block text-sm text-neutral-500">
											Write a few sentences about yourself.
										</span>
									</div> */}
								</TabPanel>
							</TabPanels>
						</TabGroup>
						<div className="pt-8">
							<ButtonPrimary onClick={handlePayment}>
								Confirmer le paiement
							</ButtonPrimary>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`nc-CheckOutPagePageMain ${className}`}>
			<main className="container mb-24 mt-11 flex flex-col-reverse lg:mb-32 lg:flex-row">
				<div className="w-full lg:w-3/5 lg:pr-10 xl:w-2/3">{renderMain()}</div>
				{/* <div className="hidden flex-grow lg:block">{renderSidebar()}</div> */}
			</main>
		</div>
	)
}

export default CheckOutPagePageMain
