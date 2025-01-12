'use client'

import React, { useState, useEffect } from 'react'
import Label from '@/components/Label'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import axios from 'axios'

const AccountPass = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')
	const [user, setUser] = useState<any>({
		id: '',
	})

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user') || '{}'))
	}, [])

	const handleUpdatePassword = async () => {
		if (
			currentPassword === '' ||
			newPassword === '' ||
			confirmPassword === ''
		) {
			setMessage('Veuillez remplir tous les champs')
			setTimeout(() => setMessage(''), 3000)
			return
		}
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user.id}/password`,
			{
				currentPassword,
				newPassword,
				confirmPassword,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		)
		if (response.status === 200) {
			setMessage(response.data.message)
			setTimeout(() => setMessage(''), 3000)
		} else {
			setMessage(response.data.message)
			setTimeout(() => setMessage(''), 3000)
		}
	}
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">
				Mettez à jour votre mot de passe
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="max-w-xl space-y-6">
				<div>
					<Label>Mot de passe actuel</Label>
					<Input
						type="password"
						className="mt-1.5"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</div>
				<div>
					<Label>Nouveau mot de passe</Label>
					<Input
						type="password"
						className="mt-1.5"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</div>
				<div>
					<Label>Confirmez le mot de passe</Label>
					<Input
						type="password"
						className="mt-1.5"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value)
							if (e.target.value !== '' && e.target.value !== newPassword) {
								setMessage('Les mots de passe ne correspondent pas')
								setTimeout(() => setMessage(''), 3000)
							}
						}}
					/>
				</div>
				<div className="pt-2">
					<ButtonPrimary onClick={handleUpdatePassword}>
						Mettre à jour le mot de passe
					</ButtonPrimary>
				</div>
				{message && <p className="text-green-500">{message}</p>}
			</div>
		</div>
	)
}

export default AccountPass
