import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/component/Navbar";
import { HoverBorderGradient } from "@/components/component/hover-gradient-border";
import { Spotlight } from "@/components/component/Spotlight";
import { Input } from "@/components/ui/input";
import { GITHUB_BASE_URL, TYPEFORM_URL, X_PROFILE_URL } from "@/lib/env";

export default function Home() {
  return (
    <>
      <div className="h-full w-full  relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-70 md:-top-[33rem]"
          fill="white"
        />

        <div className=" h-[100vh]   md:max-w-7xl  md:mx-auto relative z-10  w-full md:px-6  md:pt-0">
          <Navbar />

          <div className=" pt-32 mx-5 sm:mx-10 sm:text-5xl md:text-7xl flex flex-col  justify-items-center items-center md:mx-auto font-bold text-center bg-clip-text text-transparent  bg-gradient-to-b from-white to-slate-500 bg-opacity-50">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="text-[7px]   sm:text-xs  dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>
                why should competitive programmers have all the fun? building
                <Link href={`${GITHUB_BASE_URL}sahil-idk/opensource.build`}>
                  opensource.build 🚀
                </Link>
              </span>
            </HoverBorderGradient>

            <div className="  sm:mx-0 sm:max-w-[500px] leading-tight md:leading-none md:max-w-[700px] pt-[16px] text-[32px] sm:text-[48px] md:text-[60px]  ">
              <>Codeforces for Open Source developers</> <br />{" "}
              <p className="text-[10px] w-[300px] sm:text-sm mx-auto pt-[16px] pb-[24px]  sm:w-[400px]">
                the ultimate showdown for open-source devs! time to rank up,
                track your issues, and show&apos;em who&apos;s boss
              </p>
            </div>
          </div>
          <div className="font-extralight  text-base text-slate-400 max-w-lg text-center mx-auto">
            <div className=" space-x-6">
              <Link
                href={`/orgs`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
              <Link
                href={TYPEFORM_URL}
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32  bg-slate-950 bg-opacity-30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Elevate Your Open-Source Contributions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CodeRank.build offers a suite of tools and features to help
                  you track your progress, compete with peers, and showcase your
                  skills to the open-source community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Issue Tracking</h3>
                      <p className="text-muted-foreground">
                        Easily monitor and manage your open-source
                        contributions, with detailed insights into the issues
                        you&apos;ve solved.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Leaderboards</h3>
                      <p className="text-muted-foreground">
                        Compete with other developers and climb the ranks,
                        showcasing your expertise and driving your open-source
                        impact.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">User Profiles</h3>
                      <p className="text-muted-foreground">
                        Build your online presence and showcase your open-source
                        contributions, projects, and achievements.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[400px] h-[400px] sm:h-[500px] lg:h-[600px]">
                  <div>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Showcase Your Open-Source Prowess
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                CodeRank.build provides the tools and platform to help you stand
                out in the open-source community and take your contributions to
                the next level.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Join the Open-Source Revolution
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up to CodeRank.build and start showcasing your open-source
                contributions today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Join Now</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
        <div className="flex items-center text-center mx-auto w-full max-w-2xl my-10">
          <h1 className="mx-auto">
            Build with ❤️ by&nbsp;
            <Link className="hover:text-orange-500" href={X_PROFILE_URL}>
              Sahil
            </Link>
          </h1>
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 CodeRank.build. All rights reserved.
          </p>

          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
