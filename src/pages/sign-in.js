import React, { useState } from "react";
import Button from "../components/sharedComponents/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import LoadingSection from "../components/sharedComponents/LoadingSection";
import { toast } from "react-toastify";
import Link from "next/link";

function SignIn() {
  const [status, setStatus] = useState("null"); // null, loading, loaded
  const [input, setInput] = useState({
    email: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const getSignInToken = async () => {
    if (input.email === "") return toast.error("Email is required");
    try {
      setStatus("loading");
      const res = await fetch(`/api/auth/get-sign-in-token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input.email }),
      });
      console.log(input.email);
      if (res.ok) {
        const data = await res.json();
        setStatus("loaded");
        toast.success(`An email was sent to ${input.email}`);
      } else {
        setStatus("null");
        toast.error(`Email not registed`);
      }
    } catch (error) {
      setStatus("null");
      toast.error(`An error occurred`);
    }
  };
  const handleSignIn = async () => {
    if (input.email === "") toast.error("Email is required");
    if (input.token === "") toast.error("Token is required");
    try {
      setStatus("loading");
      signIn("credentials", {
        email: input.email,
        token: input.token,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
      setStatus("null");
      toast.error(`An error occurred`);
    }
  };

  return (
    <div className="h-screen text-white">
      <Image
        alt="bg-image"
        src="/login-background.png"
        fill
        className="absolute left-0 top-0 -z-10 object-cover fill-neutral-600"
      />
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="relative w-full bg-[#181a21] px-4 py-3 md:w-[700px]">
          <div className="absolute -top-10 -ml-3 w-full flex items-center justify-between">
            <h1
              className="ml-3 text-3xl uppercase"
              style={{
                textShadow:
                  "0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              Sign in
            </h1>
            <Link href="fake-user-for-testing">
              Add new user (for testing purpose)
            </Link>
          </div>

          <p className="text-xl uppercase text-red-500">Sign in with email</p>
          <input
            name="email"
            value={input.email}
            onChange={handleChange}
            className="w-full my-1 px-4 py-2 rounded-none text-black text-xl md:block focus:outline-custom"
          ></input>
          <Button title="Get sign in token" widthFull action={getSignInToken} />
          {status === "loading" && <LoadingSection />}
          {status === "loaded" && (
            <>
              <p className="text-xl uppercase">Sign in token</p>
              <input
                name="token"
                value={input.token}
                onChange={handleChange}
                className="w-full my-1 px-4 py-2 rounded-none text-black md:block focus:outline-custom"
              ></input>
              <Button title="Sign in" widthFull action={handleSignIn} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
