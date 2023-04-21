import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import getLastPathPartition from "@/src/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import PageHeader from "./PageHeader";

function CS2Bumper() {
  const router = useRouter();

  const gotoCS2Page = () => {
    router.push("/cs2");
  };
  return (
    <div
      className="flex justify-center h-[250px] w-[90%] max-w-[1200px] px-[50px] py-[20px] bg-[url('/bumper.png')] bg-cover bg-no-repeat bg-center transition duration-300 hover:scale-105 hover:brightness-[1.20] hover:cursor-pointer"
      onClick={gotoCS2Page}
    >
      <div className="flex flex-col justify-center pl-[40%]">
        <p className="ml-10 mb-2 font-bold text-xl tracking-wide uppercase text-[#1e202f] self-start opacity-0 animate-delayAppearance">
          Learn more about
        </p>
        <Image
          src="/logo_cs2_header.svg"
          width={450}
          height={70}
          alt="Counter-Strike 2 logo header"
          className="animate-fadeInLeft"
        ></Image>
        <div className="mt-5 mr-11 self-end bg-[#1e202f] px-5 py-1 skew-x-[-20deg] opacity-0 animate-delayAppearance">
          <p className="font-bold text-xl tracking-widest uppercase text-[#e0881e] skew-x-[20deg]">
            Limited test
          </p>
        </div>
      </div>
    </div>
  );
}

const navigationItems = [
  {
    url: "/news",
    name: "News",
  },
  {
    url: "/updates",
    name: "Updates",
  },
];

function NavigationItem({ navigationItem }) {
  const router = useRouter();
  const lastPathPartition = getLastPathPartition(router.pathname);

  const activeStyle = () =>
    lastPathPartition === navigationItem.url.slice(1)
      ? "bg-[#313131] border-t-[#646566]"
      : "bg-[#222] text-[#828282] border-t-[#222]";
  return (
    <Link href={navigationItem.url} legacyBehavior>
      <a
        className={`h-full w-[48%] py-5  border-t-2  font-extrabold uppercase tracking-[0.25rem] text-center ${activeStyle()}`}
      >
        {navigationItem.name}
      </a>
    </Link>
  );
}

function Navigations() {
  return (
    <div className="h-[100px] w-full pt-10 px-[14vw] border-b-[3px] border-b-[#313131]">
      <div className="h-full w-[400px] flex justify-between">
        {navigationItems.map((navigationItem, index) => (
          <NavigationItem key={index} navigationItem={navigationItem} />
        ))}
      </div>
    </div>
  );
}

function BlogLayout({ children }) {
  const router = useRouter();
  const lastPathPartition = getLastPathPartition(router.pathname);
  const title = capitalizeFirstLetter(lastPathPartition);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="relative min-h-screen text-white bg-[#090d13]">
        {/* page header */}
        <PageHeader />
        {/* news header */}
        <div className="flex flex-col-reverse items-center w-full h-[800px] mb-[30px] bg-[url('/header_keyart.png')] bg-cover bg-no-repeat bg-center">
          {/* cs2 bumper */}
          <CS2Bumper />
        </div>
        {/* navigations */}
        <Navigations />
        {/* body */}
        {children}
        <Footer />
      </main>
    </>
  );
}

export default BlogLayout;
