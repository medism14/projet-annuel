"use client"
import { useEffect, useRef } from "react";
import Links from "../NavBar/Links/Links";
import ImageModified from "../ReusableComponents/ImageModified";
import styles from "./Footer.module.css";
import SocialMedia from "./SocialMedia/SocialMedia";

const Footer = () => {

    const footerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            
        })
    }, [])

    return (
        <footer className="
            px-[20px]
            md:px-[60px]
            lg:px-[120px]
            border-t-2 border-[--accent-color] py-5 mt-[10rem]
            ">
            <div className="w-full flex items-center">
                <div className="flex-1 flex justify-start">
                    {/* Parce qu'il s'affichait lors du rendu du loading */}
                    <img src="/logo.png" alt="" className="w-[40px] h-[40px]
                        md:w-[80px] md:h-[80px]
                        lg:w-[60px] lg:h-[60px]"
                    />
                </div>
                <div className={`flex-1 flex flex-col items-center space-y-3 ${styles.socialMediaLarge}`}>
                    <div className="flex flex-col space-y-3 items-center">
                        <SocialMedia />
                        <div className={`font-bold text-xs md:text-lg lg:text-lg`}>
                            Copyright 2024 ©
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <div>
                        <Links />
                    </div>
                </div>
            </div>
            
            {/* Reseaux sociaux pour les petits ecrans */}
            <div className={`h-16 w-full flex justify-center mt-5 ${styles.socialMediaSmall}`}>
                <div className="flex flex-col space-y-3 items-center">
                    <div className="flex space-x-3">
                        <SocialMedia />
                    </div>
                    <div className={`font-bold text-xs md:text-lg lg:text-lg`}>
                        Copyright 2024 ©
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;