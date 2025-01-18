'use client'

import React, { FC } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export interface PageLoginProps {}

const loginSocials = [
	// {
	// 	name: 'Continue with Facebook',
	// 	href: '#',
	// 	icon: facebookSvg,
	// },
	// {
	// 	name: 'Continue with Twitter',
	// 	href: '#',
	// 	icon: twitterSvg,
	// },
	{
		name: 'Continuer avec Google',
		href: '#',
		icon: googleSvg,
	},
]

const PageLogin: FC<PageLoginProps> = ({}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [user, setUser] = useState(null)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
		  const response: AxiosResponse = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
			{
			  email,
			  password,
			},
		  );
	  
		  if (response.status === 200) {
			const { user, token } = response.data;
			setUser(user);
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token', token);
			toast.success('Connexion réussie');
			router.push('/account');
		  }
		} catch (error) {
		  if (axios.isAxiosError(error)) {
			toast.error(error.response?.data?.message || 'Erreur de connexion');
		  } else {
			toast.error('Une erreur inattendue est survenue');
		  }
		}
	  };

	return (
		<div className={`nc-PageLogin`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					Se connecter
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					<div className="grid gap-3">
						{/* FORM */}
						<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									Adresse email
								</span>
								<Input
									type="email"
									placeholder="example@example.com"
									className="mt-1"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label className="block">
								<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
									Mot de passe
									<Link href="/login" className="text-sm font-medium underline">
										Mot de passe oublié ?
									</Link>
								</span>
								<Input
									type="password"
									className="mt-1"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
							</label>
							<ButtonPrimary type="submit">
								Se connecter
							</ButtonPrimary>
						</form>

						{/* OR */}
						<div className="relative text-center">
							<span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
								OU
							</span>
							<div className="absolute left-0 top-1/2 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
						</div>

						{loginSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={item.icon}
									alt={item.name}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{item.name}
								</h3>
							</a>
						))}
					</div>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Nouvel utilisateur ? {` `}
						<Link href="/signup" className="font-semibold underline">
							Créer un compte
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageLogin
