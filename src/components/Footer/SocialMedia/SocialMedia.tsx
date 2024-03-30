import ImageModified from "@/components/ReusableComponents/ImageModified";

const SocialMedia = () => {
    return (
        <div className="flex space-x-3">
            <img src="/fb.png" alt="Logo" className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px] cursor-pointer"/>
            <img src="/x.png" alt="Logo" className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px] cursor-pointer"/>
        </div>
    );
}

export default SocialMedia;