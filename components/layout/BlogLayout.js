import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import getLastPathPartition from "@/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Link from "next/link";

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
      <main>
        <Link href="/updates" className="border-2 p-1">
          Updates
        </Link>
        <Link href="/news" className="border-2 p-1">
          News
        </Link>
        <Link href="/cs2" className="border-2 p-1">
          CS2 Limited Test
        </Link>
        {children}
      </main>
    </>
  );
}

export default BlogLayout;
