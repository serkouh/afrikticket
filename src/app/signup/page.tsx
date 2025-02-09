'use client'

import React, { FC, useState } from 'react'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = ({}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [profileImage, setProfileImage] = useState<File | null>(null)
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [message, setMessage] = useState('')
	const router = useRouter()

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProfileImage(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		// Add client-side validation first
		if (password !== password_confirmation) {
			setMessage('Les mots de passe ne correspondent pas')
			return
		}

		if (password.length < 8) {
			setMessage('Le mot de passe doit contenir au moins 8 caractères')
			return
		}

		const formData = new FormData()
		formData.append('name', name)
		formData.append('email', email)
		formData.append('phone', phone)
		formData.append('password', password)
		formData.append('password_confirmation', password_confirmation)
		formData.append('role', 'user')
		if (profileImage) {
			formData.append('profile_image', profileImage)
		}

		try {
			const response: AxiosResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			if (response.status === 201) {
				const { user, token, message } = response.data
				localStorage.setItem('user', JSON.stringify(user))
				localStorage.setItem('token', token)
				await router.push('/')
				toast.success('Inscription réussie')
				setTimeout(() => {
					window.location.reload()
				}, 1000)
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = error.response?.data?.message
				let frenchMessage = "Une erreur s'est produite lors de l'inscription"

				if (errorMessage?.includes('password confirmation')) {
					frenchMessage = 'Les mots de passe ne correspondent pas'
				} else if (errorMessage?.includes('password')) {
					frenchMessage = 'Le mot de passe doit contenir au moins 8 caractères'
				} else if (errorMessage?.includes('email has already been taken')) {
					frenchMessage = 'Cette adresse email est déjà utilisée'
				} else if (errorMessage?.includes('email')) {
					frenchMessage = "L'adresse email n'est pas valide"
				} else if (errorMessage?.includes('name')) {
					frenchMessage = 'Le nom est requis'
				} else if (errorMessage?.includes('phone')) {
					frenchMessage = 'Le numéro de téléphone est requis'
				}

				setMessage(frenchMessage)
			} else {
				setMessage('Une erreur inattendue est survenue')
			}
		}
	}

	return (
		<div className={`nc-PageSignUp`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold">
					S&apos;inscrire
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Nom</span>
							<Input
								type="text"
								placeholder="John Doe"
								className="mt-1"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Email</span>
							<Input
								type="email"
								placeholder="example@example.com"
								className="mt-1"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Téléphone</span>
							<Input
								type="tel"
								placeholder="32164987"
								className="mt-1"
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Photo de profil</span>
							<Input
								type="file"
								accept="image/*"
								className="mt-1"
								onChange={handleImageChange}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Mot de passe</span>
							<Input
								type="password"
								className="mt-1"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Confirmer le mot de passe
							</span>
							<Input
								type="password"
								className="mt-1"
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								value={password_confirmation}
							/>
						</label>
						{message && <p className="text-red-500">{message}</p>}
						<ButtonPrimary type="submit">S&apos;inscrire</ButtonPrimary>
					</form>
				</div>
			</div>
		</div>
	)
}

export default PageSignUp
