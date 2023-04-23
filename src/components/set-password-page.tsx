import { SetPassword } from "@/api/api-registration";
import { FC, useState } from "react";

interface PasswordPageProps {
  setPasswordCallback: (password: string) => void;
  email: string;
}

const authCodeRegex: RegExp = /^[A-Z]{8}$/;

const SetPasswordPage: FC<PasswordPageProps> = ({
  setPasswordCallback,
  email,
}) => {
  const [authCode, setAuthCode] = useState("");
  const [validAuthCode, setValidAuthCode] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuthCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredStr = event.target.value.replace(/[^a-zA-Z]/, "");
    setAuthCode(filteredStr);

    //  only make it valid so it doesnt complain when the user hasn't typed the whole code
    if (authCodeRegex.test(event.target.value.toUpperCase()))
      setValidAuthCode(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let upperCaseAuthCode = authCode.toUpperCase();

    // check if authCode is valid
    if (!authCodeRegex.test(upperCaseAuthCode)) {
      setValidAuthCode(false);
      return;
    }

    setIsLoading(true);
    let success = await SetPassword(upperCaseAuthCode, password);
    if (success) {
      setPasswordCallback(password);
    } else setIsLoading(false);
  };

  return (
    <div>
      <p className="text-xs mb-2">Password Code has been sent to {email}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={authCode}
            onChange={
              handleAuthCodeChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className="w-full py-2 bg-gray-100 text-black px-1 rounded"
            placeholder="Password Code"
          ></input>
          {validAuthCode ? null : (
            <div className="font-bold text-red-600 mt-4">
              Not a valid password code
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={
              handlePasswordChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className="w-full py-2 bg-gray-100 text-black px-1 rounded"
            placeholder="New Password"
          ></input>
        </div>

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
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetPasswordPage;
