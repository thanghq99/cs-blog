import React from "react";
import { useRouter } from "next/router";
import getLastPathPartition from "@/src/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";

import Footer from "./Footer";
import PageHeader from "./PageHeader";
import LastestNews from "../news/LastestNews";

function NewsContentLayout({ children }) {
  const router = useRouter();
  const lastPathPartition = getLastPathPartition(router.pathname);
  const title = capitalizeFirstLetter(lastPathPartition);
  console.log(title);

  return (
    <>
      <main className="relative min-h-screen text-white bg-[#090d13]">
        {/* page header */}
        <PageHeader />
        {/* body */}
        <div className=""></div>
        {children}
        <LastestNews />
        <Footer />
      </main>
    </>
  );
}

export default NewsContentLayout;
