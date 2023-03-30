import Head from "next/head";
import Link from "next/link";
import React from "react";

function CS2Layout({ children }) {
  return (
    <>
      <Head>
        <title>Counter-Strike 2 | Limited Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <Link href="/" className="border-2 p-1">
          Counter-Stike Blog
        </Link>
        {children}
      </main>
    </>
  );
}

export default CS2Layout;
