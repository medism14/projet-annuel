import Image from "next/image";

const ImageModified = ({src, alt, specialSize}: any) => {

    if (specialSize) {
        return (
            <div 
                className={`
                ${specialSize}
                relative`}
            >
                <Image
                    src={src}
                    alt={alt || "Image"}
                    className={`object-contain flex bg-inherit`}
                    fill
                />
            </div>
        );
    }


    return (
        <div 
            className="
            w-[40px] h-[40px]
            md:w-[80px] md:h-[80px]
            lg:w-[60px] lg:h-[60px]
            relative"
        >
            <Image
                src={src}
                alt={alt || "Image"}
                className={`object-contain flex bg-inherit`}
                fill
            />
        </div>
    );
}

export default ImageModified;