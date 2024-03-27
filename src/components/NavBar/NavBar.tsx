import Image from "next/image";
import Links from "./Links/Links";
import styles from "./NavBar.module.css";
import AuthLinks from "./AuthLinks/AuthLinks";

const NavBar = ({restClass}: any) => {
    return (
        <nav className={`flex justify-center items-center w-full mb-10`}>
            <div 
            className="
                w-[60px] h-[60px]
                md:w-[60px] md:h-[60px]
                lg:w-[60px] lg:h-[60px]
                relative">
                <Image 
                    src="/logo.png" 
                    alt="Logo"
                    className={`object-contain`}
                    fill
                />
            </div>
            <div className="flex-1 flex justify-center">
                <Links />
            </div>
            <div className="">
                <AuthLinks />
            </div>
        </nav>
    );
}

export default NavBar;