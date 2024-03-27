import Button from "@/components/ReusableComponents/Button";
import Link from "next/link";

const Auth = () => {
    return (
        <div className="flex space-x-3">
            <Link href="/connexion" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-sm md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>Se connecter</Link>

            <Link href="/connexion" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-sm md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>S'inscrire</Link>
        </div>
    );
}

export default Auth;