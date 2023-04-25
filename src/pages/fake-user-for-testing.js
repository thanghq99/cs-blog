import Button from "@/src/components/sharedComponents/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PageHeader from "../components/sharedComponents/PageHeader";

function FakeUserCreation(props) {
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    alias: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const validateForm = () => {
    setErrors([]);
    const newErrors = [];
    if (input.email === "") newErrors.push("Email must not be empty.");
    if (input.alias === "") newErrors.push("Alias must not be empty.");
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (newErrors.length === 0) {
      const submitData = input;
      console.log(submitData);
      try {
        let fetchData = await fetch("/api/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
        let fetchResponse = await fetchData.json();
        console.log(fetchResponse);
        if (fetchResponse.success === false) toast.error("An error occurs");
        else {
          toast.success("Users is successfully created");
          router.push("/sign-in");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurs");
      }
    } else toast.error("Please fill the form");
  };

  return (
    <div className="min-h-screen bg-slate-800 p-8 text-white">
      <PageHeader
        title="Create a new user"
        button={<Button title="Create" action={handleSubmit} />}
      />
      <div className="">
        <div className="text-center bolder text-lg">
          {errors.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
        <div className="text-black mb-3 flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <div className="w-full">
            <h2 className="text-lg text-white">Email</h2>
            <input
              name="email"
              className="w-full h-10 px-4 py-2 rounded-none md:block focus:outline-custom"
              placeholder="Email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-white">Alias</h2>
            <input
              name="alias"
              className="w-full h-10 px-4 py-2 rounded-none md:block focus:outline-custom"
              placeholder="Alias"
              value={input.alias}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-white">Is admin?</h2>
            <select
              name="isAdmin"
              className="w-full h-10 px-4 py-2 rounded-none leading-6 md:block focus:outline-custom"
              value={input.isAdmin}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>Yesn't</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FakeUserCreation;