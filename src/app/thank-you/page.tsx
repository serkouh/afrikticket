import React from "react";
import merci from "@/images/merci.jpg";
import Image from "next/image";
import Heading from "@/shared/Heading";
import ButtonPrimary from "@/shared/ButtonPrimary";

const ThankYouPage = () => {
    return (
        <div className="thankyou-page">
            <div className="container relative mb-20 space-y-24 lg:mb-20 lg:space-y-28">
            </div>
            <div className="flex items-center justify-center">
                <Image alt="" src={merci} />
            </div>
            <div className="container relative mb-20 space-y-24 lg:mb-20 lg:space-y-28">
            </div>

            <Heading
                className="flex items-center justify-center"
                desc= ''
                >
                Merci pour votre commande
            </Heading>
            <div className="container relative mb-20 space-y-24 lg:mb-20 lg:space-y-28">
            </div>
            <div className="flex items-center justify-center mt-30">
                <ButtonPrimary href={'/ticket-purchase-history'}>
                Voir les billets réservés
                </ButtonPrimary>
            </div>

            <div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
            </div>
        </div>
    );
};

export default ThankYouPage;
