import React from "react";
import Heading from "@/shared/Heading";
import ButtonPrimary from "@/shared/ButtonPrimary";

const ThankYouPage = () => {
    return (
        <div className="thankyou-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="container relative mb-20 space-y-10 lg:mb-20 lg:space-y-12">
                <Heading
                    className="text-2xl font-bold text-center text-neutral-900"
                    desc=''
                >
                    Merci pour votre donnation !
                </Heading>
                <p className="text-center text-lg text-neutral-600">
                    Votre donnation a été traitée avec succès. Nous vous enverrons un e-mail de confirmation sous peu.
                </p>
                <div className="flex items-center justify-center mt-5">
                    <ButtonPrimary href={'/ticket-purchase-history'}>
                        Voir les billets réservés
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
