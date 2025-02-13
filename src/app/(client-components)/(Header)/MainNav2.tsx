import React, { FC } from 'react';
import Logo from '@/shared/Logo';
import AvatarDropdown from './AvatarDropdown';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/navigation';
import MenuBar from '@/shared/MenuBar';
import { PathName } from '@/routers/types';
import TemplatesDropdown from './TemplatesDropdown';
import { IconBuildingCommunity, IconArrowRight } from '@tabler/icons-react';

export interface MainNav2Props {
	className?: string;
}

interface NavItem {
	name: string;
	link?: PathName;
	icon: any;
}

const NAV: NavItem[] = [
	{
		name: "",
		icon: MenuBar,
	},
];

const MainNav2: FC<MainNav2Props> = ({ className = '' }) => {
	const pathname = usePathname();

	const renderItem = (item: NavItem, index: number) => {
		const isActive = pathname === item.link;

		return item.link ? (
			<Link
				key={index}
				href={item.link}
				className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
					}`}
			>
				{/* <item.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} /> */}
				<item.icon className={`w-6 h-6 ${isActive ? 'text-green-600' : ''}`} />

				<span
					className={`text-[11px] leading-none mt-1 ${isActive ? 'text-red-600' : ''
						}`}
				>
					{item.name}
				</span>
			</Link>
		) : (
			<div
				key={index}
				className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
					}`}
			>
				<item.icon iconClassName="w-6 h-6" className={``} />
				<span className="text-[11px] leading-none mt-1">{item.name}</span>
			</div>
		);
	};

	const renderNavItem = (
		item: typeof navigation[number],
		index: number
	) => {
		const isActive = pathname === item.href;

		return (
			<Link
				key={index}
				href={item.href}
				className={`font-medium px-4 py-2 ${isActive
? 'text-green-600 underline dark:text-green-400'
: 'text-slate-700 dark:text-slate-200'
					}`}
			>
				{item.name}
			</Link>
		);
	};

	return (
		<div className={`MainNav2 relative z-10 ${className}`}>
			<div className="flex h-20 justify-between px-4 lg:container">
				{/* Left Section: Logo for desktop */}
				<div className="hidden flex-1 lg:flex items-center space-x-6">
					<Logo className="w-24 flex items-center" />
				</div>

				{/* Center Section: Navigation Links for desktop */}
				<div className="hidden lg:flex items-center space-x-1 desktop-links">
					{navigation.map(renderNavItem)}
					{/* <TemplatesDropdown/> */}
					<Link
						href="https://admin.afrikticket.com/auth/login"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative flex items-center gap-2 rounded-full border-2 border-secondary-brand bg-white px-6 py-2.5 text-sm font-medium text-secondary-brand transition-all hover:bg-secondary-brand hover:text-white"
					>
						<IconBuildingCommunity className="h-4 w-4" />
						<span>Espace Organisation</span>
						<IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						
						{/* Notification dot */}
						<span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary-600 ring-2 ring-white" />
					</Link>
				</div>
				{/* Mobile view */}
				<div className="flex w-full items-center justify-between lg:hidden">
					<Logo className="w-24 flex items-center" />
					<div className="flex items-center space-x-4">
						{/* Render the mobile menu items */}
						{NAV.map(renderItem)}
					</div>
				</div>

				{/* Right Section: AvatarDropdown for desktop */}
				<div className="hidden lg:flex flex-1 justify-end items-center space-x-4">
					<AvatarDropdown />
				</div>
			</div>
		</div>
	);
};

export default MainNav2;
