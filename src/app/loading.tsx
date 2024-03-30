import Image from "next/image";

const Loading = () => {
  return (
    <div className="absolute inset-0 z-50">
        <Image 
            src={`./loading.svg`} 
            alt="Loading..." 
            className="inset-0" 
            fill 
            priority 
            placeholder="blur"
            blurDataURL={'./loading.svg'}
        />
    </div>
  );
};

export default Loading;