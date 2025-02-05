"use client"

import Links from "./Links/Links";
import styles from "./NavBar.module.css";
import AuthLinks from "./AuthLinks/AuthLinks";
import ImageModified from "../ReusableComponents/ImageModified";

import Link from 'next/link'

const NavBar = ({restClass}: any) => {
    return (
        <div className="flex flex-col pt-3 mb-10">
            <nav className={`flex justify-center items-center w-full`}>
                <div 
                className="
                md:flex-1 justify-start">
                    <Link href="/">
                        <ImageModified src="/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className={`flex-1 justify-center ${styles.elementRemove}`}>
                    <Links />
                </div>
                <div className={`flex-1 flex justify-end`}>
                    <AuthLinks />
                </div>
            </nav>
            <div className={`flex justify-center mt-2 ${styles.linksLittleScreen}`}>
                <Links />
            </div>
        </div>
    );
}

export default NavBar;