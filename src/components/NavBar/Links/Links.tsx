"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

    const links = [
        {title: 'Accueil', href: '/'},
        {title: 'Analyse', href: '/analyse'},
        {title: 'Contact', href: '/contact'},
    ];

const Links = () => {

    const pathName = usePathname();

    return (
        <div className="flex space-x-6 text-xs md:text-base">
            {links.map((link, index) => (
                <Link key={index} href={link.href} className={`${pathName == link.href ? 'border-b-[0.2rem] border-[--tertiary-color]' : 'hover:underline'}`}>{link.title}</Link>
            ))}
        </div>
    );
}

export default Links;