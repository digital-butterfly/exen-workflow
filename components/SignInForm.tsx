"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
        callbackUrl: "/",
      });

      if (signInResponse.ok) {
        router.refresh();
        // setMessage("Invalid credentials");
      } else if (signInResponse.status === 401) {
        setMessage("Invalid credentials");
      } else {
        const data = await signInResponse.json();
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status, router]);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* form container */}
        <div className="w-full bg-white rounded-lg shadow :mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* form title */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            {/* Loading message */}
            {isLoading && (
              <div className="w-full p-4 bg-blue-200 rounded-xl">
                <h2 className="text-center ">Signing In...</h2>
              </div>
            )}
            {/* Error message */}
            {message != "" && (
              <div className="w-full p-4 bg-red-300 rounded-xl">
                <h2 className="text-center text-red-600">{message}</h2>
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* form fields */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="associe">Associe</option>
                  <option value="approbataire">Approbataire</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
