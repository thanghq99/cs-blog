import React, { useState } from "react";
import Button from "../components/sharedComponents/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import LoadingSection from "../components/sharedComponents/LoadingSection";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/sharedComponents/ErrorMessage";

const formObject = z.object({
  email: z.string().email("Email is not valid"),
  token: z.string(),
});

const signinState = {
  GET_TOKEN: 0,
  LOADING: 1,
  SIGNIN: 2,
};

function SignIn() {
  const router = useRouter();
  const [status, setStatus] = useState(signinState.GET_TOKEN);
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      token: "",
    },
    resolver: zodResolver(formObject),
  });

  const getSignInToken = async () => {
    trigger("email");
    if (errors.email) {
      return;
    }
    try {
      setStatus(signinState.LOADING);
      const res = await fetch(`/api/auth/get-sign-in-token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: getValues("email") }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setStatus(signinState.SIGNIN);
        toast.success(
          data?.message || `An email was sent to ${getValues("email")}`
        );
      } else {
        console.log(data);
        setStatus(signinState.GET_TOKEN);
        toast.error(data?.message || `An error occurred`);
      }
    } catch (error) {
      setStatus("null");
      toast.error(`An error occurred`);
      console.log(error);
    }
  };
  const handleSignIn = async () => {
    trigger("token");
    if (errors.token) {
      return;
    }
    console.log(getValues("token"));
    try {
      console.log("token", getValues("token"));
      setStatus(signinState.LOADING);
      const result = await signIn("credentials", {
        email: getValues("email"),
        token: getValues("token"),
        redirect: false,
      });
      if (result.ok) {
        toast.success(`Sign in successfully`);
        router.push("/dashboard");
      } else {
        toast.error(`Token is not valid`);
        setStatus(signinState.GET_TOKEN);
        reset();
      }
    } catch (error) {
      setStatus(signinState.GET_TOKEN);
      toast.error(`An error occurred`);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            {status === signinState.LOADING && <LoadingSection />}
            {status === signinState.GET_TOKEN && (
              <>
                <p className="text-xl uppercase text-red-500">
                  Sign in with email
                </p>
                <input
                  {...register("email")}
                  className="w-full my-1 px-4 py-2 rounded-none text-black text-xl md:block focus:outline-custom"
                ></input>
                <ErrorMessage message={errors?.email?.message} />
                <Button
                  title="Get sign in token"
                  widthFull
                  action={getSignInToken}
                />
              </>
            )}
            {status === signinState.SIGNIN && (
              <>
                <p className="text-xl uppercase">Sign in token</p>
                <input
                  {...register("token")}
                  className="w-full my-1 px-4 py-2 rounded-none text-black md:block focus:outline-custom"
                ></input>
                <Button title="Sign in" widthFull action={handleSignIn} />
                <ErrorMessage message={errors?.token?.message} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
