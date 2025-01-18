'use client';
import React from "react";
import { useSearchParams } from 'next/navigation';
import ButtonPrimary from "@/shared/ButtonPrimary";
import { IconCheck, IconTicket, IconHeartHandshake } from "@tabler/icons-react";
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import Link from 'next/link';
import { Route } from 'next';


const ThankYouPage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
        // Trigger confetti animation on mount
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    const getContent = () => {
        switch(type) {
            case 'donation':
                return {
                    icon: <IconHeartHandshake size={48} className="text-green-500" />,
                    title: "Merci pour votre généreuse donation !",
                    description: "Votre soutien fait une réelle différence. Un reçu détaillé a été envoyé à votre adresse e-mail.",
                    buttonText: "Voir l'historique des donations",
                    buttonLink: "/donation-history" as Route,
                    bgColor: "bg-green-50 dark:bg-green-900/20"
                };
            case 'ticket':
                return {
                    icon: <IconTicket size={48} className="text-blue-500" />,
                    title: "Merci pour votre achat !",
                    description: "Vos billets ont été réservés avec succès. Vous les recevrez par e-mail dans quelques instants.",
                    buttonText: "Voir mes billets",
                    buttonLink: "/ticket-purchase-history" as Route,
                    bgColor: "bg-blue-50 dark:bg-blue-900/20"
                };
            default:
                return {
                    icon: <IconCheck size={48} className="text-primary-500" />,
                    title: "Merci !",
                    description: "Votre transaction a été traitée avec succès. Vous recevrez une confirmation par e-mail.",
                    buttonText: "Retour à l'accueil",
                    buttonLink: "/" as Route,
                    bgColor: "bg-neutral-50 dark:bg-neutral-900/20"
                };
        }
    };

    const content = getContent();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
            <div className={`max-w-md w-full ${content.bgColor} rounded-3xl p-8 md:p-12 shadow-xl`}>
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md">
                        {content.icon}
                    </div>
                    
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {content.title}
                    </h1>
                    
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {content.description}
                    </p>

                    <div className="w-full pt-4">
                        <Link href={content.buttonLink}>
                            <ButtonPrimary className="w-full">
                                {content.buttonText}
                            </ButtonPrimary>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
