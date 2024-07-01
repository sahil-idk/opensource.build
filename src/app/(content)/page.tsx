/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/component/Navbar";
import { HoverBorderGradient } from "@/components/component/hover-gradient-border";
import { Spotlight } from "@/components/component/Spotlight";

export default async function Home() {
  const user = await currentUser();
  
  return (
    <>
    <div className="h-full w-full  relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="   md:max-w-7xl  md:mx-auto relative z-10  w-full md:px-6  md:pt-0">
        <Navbar />

        <div className=" pt-32 mx-5  sm:mx-10 sm:text-5xl md:text-7xl flex flex-col  justify-items-center items-center md:mx-auto font-bold text-center bg-clip-text text-transparent  bg-gradient-to-b from-white to-slate-500 bg-opacity-50">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="text-[7px]   sm:text-xs  dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>
              why should competitive programmers have all the fun? building
              opensource.build 🚀
            </span>
          </HoverBorderGradient>

          <div className="  sm:mx-0 sm:max-w-[500px] leading-tight md:leading-none md:max-w-[700px] pt-[16px] text-[32px] sm:text-[48px] md:text-[60px]  ">
            <>Codeforces for Open Source developers</> <br />{" "}
            <p className="text-[10px] w-[300px] sm:text-sm mx-auto pt-[16px] pb-[24px]  sm:w-[400px]">
              the ultimate showdown for open-source devs! time to rank up,
              track your issues, and show'em who's boss
            </p>
          </div>
        </div>
        <div className="font-extralight  text-base text-slate-400 max-w-lg text-center mx-auto">
          <div className=" space-x-6">
            <Link
              href={`/${user?.fullName}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Now
            </Link>
            <Link
              href="https://github.com/sahil-idk/opensource.build"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
