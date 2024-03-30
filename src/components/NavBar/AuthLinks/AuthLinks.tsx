import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {

    const auth = false;

    const handleLogout = () => {

    }

    if (auth) {
        return (
            <div onClick={handleLogout} className="flex space-x-3 text-lg md:text-4xl lg:text-2xl cursor-pointer">
                <FontAwesomeIcon icon={faDoorOpen} />
            </div>
        );
    }
    
    return (
        <div className="flex space-x-3">
            <Link href="/login" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-lg md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>Se connecter</Link>

            <Link href="/register" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-lg md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>S'inscrire</Link>
        </div>
    );
}

export default Auth;