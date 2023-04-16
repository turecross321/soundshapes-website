import { LogIn } from "@/api/api-authentication";
import SaveLoginDetails from "@/components/save-login-details";
import SetEmailPage from "@/components/set-email-page";
import SetPasswordPage from "@/components/set-password-page";
import Stepper from "@/components/stepper";
import { useRouter } from "next/router";
import { emit } from "process";
import { useState } from "react";

let userEmail: string;
let userPassword: string;

function Page() {
  const router = useRouter();

  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [loggedIn, setLoggedIn] = useState(false);

  function SetEmailCallback(email: string) {
    userEmail = email;
    setCompletedSteps(1);
  }

  function SetPasswordCallback(password: string) {
    userPassword = password;
    FinishRegistration();
  }

  async function FinishRegistration() {
    await LogIn(userEmail, userPassword);
    setLoggedIn(true);
    router.push("/");
  }

  function GetCurrentPage() {
    if (completedSteps == 0)
      return <SetEmailPage setEmailCallback={SetEmailCallback} />;
    if (completedSteps == 1)
      return (
        <SetPasswordPage
          setPasswordCallback={SetPasswordCallback}
          email={userEmail}
        />
      );
  }

  return (
    <div className="w-80">
      <h1 className="text-5xl font-bold text-center mb-4">Registration</h1>
      <div className="flex justify-center">
        <Stepper
          steps={["Email", "Password"]}
          completedSteps={completedSteps}
        />
      </div>
      <div className="mb-4"></div>
      {GetCurrentPage()}
      {loggedIn ? <SaveLoginDetails /> : null}
    </div>
  );
}

export default Page;
