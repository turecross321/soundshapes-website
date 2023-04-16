import { LogIn } from "@/api/api-authentication";
import {
  AuthenticationErrorResponse,
  AuthenticationResponse,
} from "@/api/types/authentication-responses";
import SaveLoginDetails from "@/components/save-login-details";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

let emailRegex: RegExp = /^[a-z0-9-.]+@[a-z0-9-.]+[.][a-z0-9-.]+$/;

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if email is valid
    if (!emailRegex.test(email)) {
      setValidEmail(false);
      return;
    }

    setIsLoading(true);

    let data = await LogIn(email, password);

    if (data != undefined) {
      setIsLoggedIn(true);
      router.push("/" + user?.sessionId);
    } else {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  only make it valid so it doesnt complain when the user hasn't typed the whole email
    if (emailRegex.test(event.target.value)) setValidEmail(true);

    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-80">
      {loggedIn ? <SaveLoginDetails /> : null}
      <h1 className="text-5xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={email}
            onChange={
              handleEmailChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className="w-full py-2 bg-gray-100 text-black px-1 rounded"
            placeholder="Email Address"
          />
          {validEmail ? null : (
            <div className="font-bold text-red-600 mt-4">Not a valid email</div>
          )}
        </div>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={
            handlePasswordChange as React.ChangeEventHandler<HTMLInputElement>
          }
          className="w-full py-2 bg-gray-100 text-black px-1 mb-4 rounded"
          placeholder="Password"
        />

        <input
          id="showPassword"
          className="mb-4 mr-2"
          type="checkbox"
          onChange={handleShowPasswordChange}
        />
        <label htmlFor="showPassword" className="select-none">
          Show Password
        </label>

        <div className={isLoading ? "animate-pulse" : ""}>
          <button
            type="submit"
            className={
              "mb-2 text-white py-2 rounded transistion-colors w-full bg-green-600 hover:bg-green-500"
            }
          >
            Log in
          </button>
        </div>
      </form>

      <div className="border-t border-gray-300 my-1 border-opacity-20" />

      <div className="flex justify-between">
        <Link
          href="/register"
          className="mr-2 mt-2 bg-yellow-600 py-2 rounded hover:bg-yellow-500 transistion-colors w-1/2 flex justify-center"
        >
          <button type="submit">Register</button>
        </Link>

        <Link
          href="/resetPassword"
          className="mt-2 bg-red-600 py-2 rounded hover:bg-red-500 transistion-colors w-1/2 flex justify-center"
        >
          <button type="submit">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
