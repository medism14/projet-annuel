import Links from "../NavBar/Links/Links";
import ImageModified from "../ReusableComponents/ImageModified";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className="
            px-[20px]
            md:px-[60px]
            lg:px-[120px]
            border-t-2 border-[--accent-color] py-5
            ">
            <div className="w-full flex items-center">
                <div className="flex-1 flex justify-start">
                    <ImageModified src="/logo.png" alt="Logo" />
                </div>
                <div className={`flex-1 flex flex-col items-center space-y-3 ${styles.socialMediaLarge}`}>
                    <div className="flex flex-col space-y-3 items-center">
                        <div className="flex space-x-3">
                            <ImageModified src="/fb.png" alt="Logo" specialSize={`w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px]`} />
                            <ImageModified src="/x.png" alt="Logo" specialSize={`w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px]`}/>
                        </div>
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
                        <ImageModified src="/fb.png" alt="Logo" specialSize={`w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px]`} />
                        <ImageModified src="/x.png" alt="Logo" specialSize={`w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px]`}/>
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