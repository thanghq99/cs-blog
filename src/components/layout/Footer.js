import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="px-[100px] py-[30px] bg-black">
      <div className="mx-auto w-full max-w-[800px] md:px-5 text-center text-sm leading-4 text-[#777]">
        Counter-Strike, Counter-Strike 2, CS:GO, and their respective logos are
        trademarks and/or registered trademarks of Valve Corporation. © 2023
        Valve Corporation, all rights reserved.
        <br></br>
        <Link href="/dashboard" legacyBehavior>
          <a className="text-white uppercase text-lg">
            Click here to sign in as staff
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
