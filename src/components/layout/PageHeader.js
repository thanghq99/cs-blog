import Image from "next/image";
import Link from "next/link";
import fakeLanguageList from "@/src/utils/fakeLanguageList";
import React, { useState } from "react";

function LanguageSelectItem({ language }) {
  return (
    <div className="px-2 normal-case text-white opacity-60 hover:bg-white/60 hover:text-black hover:opacity-100 hover:cursor-pointer transition">
      {language}
    </div>
  );
}

function LanguageSelector({}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative flex hover:cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Image
        src="/language.svg"
        width={12}
        height={12}
        alt="language icon"
      ></Image>
      <span className="relative m-2 opacity-60 uppercase tracking-widest text-sm">
        Select language
      </span>
      <Image
        src="/carat_white.svg"
        width={12}
        height={12}
        alt="language icon"
      ></Image>
      {open && (
        <div className="absolute top-full border border-gray-400 bg-[#222]">
          {fakeLanguageList.map((language, index) => (
            <LanguageSelectItem key={index} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div className="absolute z-10 w-full flex flex-col px-8 justify-center items-center pt-3 text-sm md:text-base md:flex-row md:justify-between">
      <div className="flex items-center">
        <p className="uppercase flex items-center opacity-60">Monthy players</p>
        <p className="font-bold ml-1">24,105,628</p>
      </div>
      <Link href="/">
        <div className="h-[70px] w-[300px] mx-12 my-[5px] opacity-80 hover:opacity-100 flex items-center">
          <Image
            src="/logo_cs_full.svg"
            width={300}
            height={70}
            alt="Counter-Strike logo"
          ></Image>
        </div>

        {/* <div className="w-[300px] h-[70px] bg-[url('/logo_cs_full.svg')]"></div> */}
      </Link>
      <div className="relative flex items-center">
        <LanguageSelector />
      </div>
    </div>
  );
}

export default PageHeader;
