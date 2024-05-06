"use client"
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

export default function Home() {

  let userState = useAppSelector(state => state.AppState.userState);

  return (
    <>
    <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10">
      <div className="lg:flex-1 flex flex-col justify-center">
        <div className="w-full mb-[-5px]">
          <img src="/poisson.png" alt="" className="float-end w-[60px] h-[50px]" />
        </div>
        <h1 className="text-2xl md:text-5xl lg:text-4xl font-bold">La reconnaissance d'images avec les poissons</h1>
        <p className="text-sm md:text-xl lg:text-lg">Grâce à une IA parfaitement entrainé !</p>
      </div>
      <div className="
        flex flex-1 justify-center w-full
      ">
        <div className="
          w-[30rem] h-[15rem]
          md:w-[40rem] md:h-[20rem]
          lg:w-full lg:h-[15rem]
          relative
        ">
          <Image
          src="/poisson.jpg"
          alt="Hero image of the website"
          fill
          priority
          sizes="(min-width: 0px) 400px, (min-width: 768px) 800px, 100vw"
          className="rounded-lg"
        />
        </div>
      </div>
    </div>
    </>
  );
}