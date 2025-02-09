import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Avatar from '@/shared/Avatar'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IconTicket, IconHeartHandshake, IconLogout, IconUser, IconChartBar } from '@tabler/icons-react'

interface Props {
	className?: string
}

export default function AvatarDropdown({ className = '' }: Props) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		avatar: ''
	});

	useEffect(() => {
		const userStr = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		
		if (userStr && token) {
			try {
				const user = JSON.parse(userStr);
				setUserData({
					name: user.name || 'User',
					email: user.email || 'email@example.com',
					avatar: user.profile_image || ''
				});
				setIsAuthenticated(true);
			} catch (e) {
				console.error('Error parsing user data:', e);
				setIsAuthenticated(false);
			}
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const handleLogout = async () => {
		try {
			const token = localStorage.getItem('token');
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Clear localStorage
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			
			await router.push('/')
			toast.success('Déconnexion réussie');
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} catch (error) {
			console.error('Logout error:', error);
			toast.error('Erreur lors de la déconnexion');
		}
	};
	if (!isAuthenticated) {
		return null;
	}

	return (
		<>
			<Popover className={`AvatarDropdown relative flex ${className}`}>
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex h-10 w-10 items-center justify-center self-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 sm:h-12 sm:w-12`}
						>
							<Avatar 
								imgUrl={userData.avatar || null}
								userName={userData.name}
								sizeClass="h-8 w-8"
							/>
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -right-10 top-full z-10 w-screen max-w-[260px] px-4 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
										<div className="flex items-center space-x-3">
											<Avatar 
												sizeClass="w-12 h-12" 
												imgUrl={userData.avatar}
												userName={userData.name}
											/>
											<div className="flex-grow">
												<h4 className="font-semibold">{userData.name}</h4>
												<p className="mt-0.5 text-xs">{userData.email}</p>
											</div>
										</div>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 1 --------------------- */}
										<Link
											href={'/account'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<IconUser className="h-6 w-6" />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Mon profile'}</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/ticket-purchase-history'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<IconTicket className="h-6 w-6" />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Historique de billets'}</p>
											</div>
										</Link>

										{/* ------------------ 3 --------------------- */}
										<Link
											href={'/donation-history'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<IconHeartHandshake className="h-6 w-6" />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Historique des donations'}</p>
											</div>
										</Link>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ Logout Button --------------------- */}
										<button
											onClick={() => {
												handleLogout();
											}}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<IconLogout className="h-6 w-6" />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Déconnexion'}</p>
											</div>
										</button>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}
