"use client"

import Link from "next/link";

const Error = () => {
    return (
        <div className="flex flex-col"> 
            <h1 className="text-4xl font-bold">Erreur !</h1>
            <p>Veuillez revenir sur la page d'accueil en: <Link href="/" className="font-bold">Cliquant ici</Link></p>
        </div>
    );
}

export default Error;