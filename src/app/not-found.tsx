import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col"> 
            <h1 className="text-4xl font-bold">Page non trouvé !</h1>
            <p>Veuillez revenir sur la page d'accueil en: <Link href="/" className="font-bold">Cliquant ici</Link></p>
        </div>
    );
}

export default NotFound;