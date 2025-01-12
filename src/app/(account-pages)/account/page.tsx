'use client'

import React, { useEffect, useState } from 'react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AccountPage = () => {
	const router = useRouter()
	const [user, setUser] = useState<any>(null)
	const [newName, setNewName] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [newProfileImage, setNewProfileImage] = useState<File | null>(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const storedToken = localStorage.getItem('token')
		const storedUser = localStorage.getItem('user')

		if (!storedToken || !storedUser) {
			router.push('/login')
			return
		}

		const userData = JSON.parse(storedUser)
		console.log('User Data:', userData)
		console.log('Profile Image Path:', userData.profile_image)
		setUser(userData)
		setNewName(userData.name || '')
		setNewEmail(userData.email || '')
		setNewPhone(userData.phone?.toString() || '')
	}, [router])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setNewProfileImage(e.target.files[0])
		}
	}

	const handleUpdateUser = async () => {
		if (!user?.id) return

		const formData = new FormData()
		formData.append('name', newName)
		formData.append('email', newEmail)
		formData.append('phone', newPhone)
		if (newProfileImage) {
			formData.append('profile_image', newProfileImage)
		}

		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (response.status === 200) {
				setUser(response.data.user)
				localStorage.setItem('user', JSON.stringify(response.data.user))
				setMessage('Profil mis à jour avec succès')
				setTimeout(() => setMessage(''), 3000)
			}
		} catch (error) {
			setMessage('Erreur lors de la mise à jour du profil')
			setTimeout(() => setMessage(''), 3000)
		}
	}

	return (
		<div className="space-y-6 sm:space-y-8">
			<h2 className="text-3xl font-semibold">Information du profil</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			
			<div className="flex flex-col md:flex-row">
				<div className="flex-shrink-0 flex items-start">
					<div className="relative rounded-full overflow-hidden flex">
						<Avatar
							imgUrl={user?.profile_image || ''}
							sizeClass="w-32 h-32"
							userName={user?.name}
						/>
						<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
							<Input
								type="file"
								className="absolute inset-0 opacity-0 cursor-pointer"
								accept="image/*"
								onChange={handleImageChange}
							/>
							<span className="text-white text-sm">Changer</span>
						</div>
					</div>
				</div>
				
				<div className="flex-grow mt-10 md:mt-0 md:pl-16 space-y-6">
					<div>
						<Label>Nom</Label>
						<Input
							className="mt-1.5"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
					</div>
					<div>
						<Label>E-mail</Label>
						<Input
							className="mt-1.5"
							value={newEmail}
							onChange={(e) => setNewEmail(e.target.value)}
						/>
					</div>
					<div>
						<Label>Téléphone</Label>
						<Input
							className="mt-1.5"
							value={newPhone}
							onChange={(e) => setNewPhone(e.target.value)}
						/>
					</div>
					{message && <p className="text-green-500">{message}</p>}
					<div className="pt-2">
						<ButtonPrimary onClick={handleUpdateUser}>
							Mettre à jour le profil
						</ButtonPrimary>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountPage
