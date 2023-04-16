import { SendPasswordSessionRequest } from "@/api/api-registration";
import { FC, useState } from "react";

const emailRegex: RegExp = /^[a-z0-9-.]+@[a-z0-9-.]+[.][a-z0-9-.]+$/;

interface EmailInputForPasswordResetProps {
  enteredEmailCallback: (email: string) => void;
}

const EmailInputForPasswordReset: FC<EmailInputForPasswordResetProps> = ({
  enteredEmailCallback,
}) => {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if email is valid
    if (!emailRegex.test(email)) {
      setValidEmail(false);
      return;
    }

    setIsLoading(true);

    let result = await SendPasswordSessionRequest(email);
    if (result) {
      enteredEmailCallback(email);
    }
    setIsLoading(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  only make it valid so it doesnt complain when the user hasn't typed the whole email
    if (emailRegex.test(event.target.value)) setValidEmail(true);

    setEmail(event.target.value);
  };

  return (
    <div>
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

export default EmailInputForPasswordReset;
