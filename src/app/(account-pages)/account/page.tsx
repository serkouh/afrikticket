'use client'

import React, { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { IconCalendar, IconHeart, IconTicket, IconUser, IconBell, IconLock, IconSettings } from '@tabler/icons-react'
import toast from 'react-hot-toast'

const AccountPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Add new states for security tab
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (!storedToken || !storedUser) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(storedUser)
    setUser(userData)
    setNewName(userData.name || '')
    setNewEmail(userData.email || '')
    setNewPhone(userData.phone?.toString() || '')
  }, [router])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true)
      const file = e.target.files[0]
      setNewProfileImage(file)
      
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('profile_image', file)
      formData.append('name', newName)
      formData.append('email', newEmail)
      formData.append('phone', newPhone)

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user?.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.status === 200) {
          const updatedUser = response.data.user
          setUser(updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
          toast.success('Photo de profil mise à jour avec succès')
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour de la photo')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleUpdateUser = async () => {
    if (!user?.id) return
    setIsLoading(true)

    if (!newName.trim() || !newEmail.trim()) {
      toast.error('Le nom et l\'email sont obligatoires')
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', newName)
    formData.append('email', newEmail)
    formData.append('phone', newPhone)
    if (newProfileImage) {
      formData.append('profile_image', newProfileImage)
    }

    try {
      const response = await axios.post(
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
        const updatedUser = response.data.user
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        toast.success('Profil mis à jour avec succès')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du profil')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user?.id}/password`,
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
      );
      
      if (response.status === 200) {
        toast.success('Mot de passe mis à jour avec succès');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du mot de passe');
      } else {
        toast.error('Une erreur inattendue est survenue');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 px-4 pt-8 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Paramètres du compte</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
          <Avatar
            imgUrl={user?.profile_image || ''}
            sizeClass="w-20 h-20"
            userName={user?.name}
          />
        </div>

        <TabGroup>
          <TabList className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm">
            <Tab className={({ selected }) =>
              `flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 outline-none
              ${selected 
                ? 'bg-secondary-brand text-white shadow'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`
            }>
              <IconUser className="h-5 w-5" />
              <span>Profil</span>
            </Tab>
            <Tab className={({ selected }) =>
              `flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 outline-none
              ${selected 
                ? 'bg-secondary-brand text-white shadow'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`
            }>
              <IconLock className="h-5 w-5" />
              <span>Sécurité</span>
            </Tab>
            {/* <Tab className={({ selected }) =>
              `flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 outline-none
              ${selected 
                ? 'bg-primary-500 text-white shadow'
                : 'text-gray-600 hover:bg-gray-100'
              }`
            }>
              <IconBell className="h-5 w-5" />
              <span>Notifications</span>
            </Tab> */}
          </TabList>

          <TabPanels className="mt-8">
            {/* Profile Tab */}
            <TabPanel>
              <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar
                      imgUrl={user?.profile_image || ''}
                      sizeClass="w-32 h-32"
                      userName={user?.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
                      <Input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isLoading}
                      />
                      <span className="text-sm text-white">Changer</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label>Nom</Label>
                    <Input
                      className="mt-1.5"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input
                      className="mt-1.5"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input
                      className="mt-1.5"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <ButtonSecondary disabled={isLoading}
                    className="border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    Annuler
                  </ButtonSecondary>
                  <ButtonPrimary 
                    onClick={handleUpdateUser} 
                    disabled={isLoading}
                    className="bg-secondary-brand hover:bg-secondary-dark"
                  >
                    {isLoading ? 'Mise à jour...' : 'Mettre à jour le profil'}
                  </ButtonPrimary>
                </div>
              </div>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel>
              <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
                <div>
                  <h3 className="text-lg font-medium">Changer le mot de passe</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Assurez-vous d&apos;utiliser un mot de passe fort et unique
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Mot de passe actuel</Label>
                    <Input
                      type="password"
                      className="mt-1.5"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label>Nouveau mot de passe</Label>
                    <Input
                      type="password"
                      className="mt-1.5"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label>Confirmer le nouveau mot de passe</Label>
                    <Input
                      type="password"
                      className="mt-1.5"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <ButtonSecondary disabled={isLoading}
                    className="border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    Annuler
                  </ButtonSecondary>
                  <ButtonPrimary 
                    onClick={handleUpdatePassword} 
                    disabled={isLoading}
                    className="bg-secondary-brand hover:bg-secondary-dark"
                  >
                    {isLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                  </ButtonPrimary>
                </div>
              </div>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel>
              <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
                <div>
                  <h3 className="text-lg font-medium">Préférences de notification</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Gérez comment vous souhaitez être notifié
                  </p>
                </div>

                {/* Add notification preferences here */}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}

export default AccountPage