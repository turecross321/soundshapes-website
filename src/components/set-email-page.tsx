import { SetEmail } from "@/api/api-registration";
import { useState } from "react";

import { FC } from "react";

const authCodeRegex: RegExp = /^[0-9]{8}$/;
const emailRegex: RegExp = /^[a-z0-9-.]+@[a-z0-9-.]+[.][a-z0-9-.]+$/;

interface EmailPageProps {
  setEmailCallback: (email: string) => void;
}

const SetEmailPage: FC<EmailPageProps> = ({ setEmailCallback }) => {
  const [authCode, setAuthCode] = useState("");
  const [validAuthCode, setValidAuthCode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuthCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredStr = event.target.value.replace(/[^0-9]/, "");
    setAuthCode(filteredStr);

    //  only make it valid so it doesnt complain when the user hasn't typed the whole code
    if (authCodeRegex.test(event.target.value)) setValidAuthCode(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  only make it valid so it doesnt complain when the user hasn't typed the whole email
    if (emailRegex.test(event.target.value)) setValidEmail(true);

    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let upperCaseAuthCode = authCode.toUpperCase();

    // check if authCode is valid
    if (!authCodeRegex.test(upperCaseAuthCode)) {
      setValidAuthCode(false);
      return;
    }

    // check if email is valid
    if (!emailRegex.test(email)) {
      setValidEmail(false);
      return;
    }

    setIsLoading(true);

    let success = await SetEmail(upperCaseAuthCode, email);
    if (success) setEmailCallback(email);
    else setIsLoading(false);
  };

  return (
    <div className="w-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={authCode}
            onChange={
              handleAuthCodeChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className="w-full py-2 bg-gray-100 text-black px-1 rounded"
            placeholder="Email Code"
          ></input>
          {validAuthCode ? null : (
            <div className="font-bold text-red-600 mt-4">
              Not a valid email code
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={email}
            onChange={
              handleEmailChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className="w-full py-2 bg-gray-100 text-black px-1 rounded"
            placeholder="Email Address"
          ></input>
          {validEmail ? null : (
            <div className="font-bold text-red-600 mt-4">Not a valid email</div>
          )}
        </div>
        <div className={isLoading ? "animate-pulse" : ""}>
          <button
            type="submit"
            className={
              "mb-2 text-white py-2 rounded transistion-colors w-full bg-green-600 hover:bg-green-500"
            }
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetEmailPage;
