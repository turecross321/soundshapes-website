import { LogIn } from "@/api/api-authentication";
import { SetPassword } from "@/api/api-registration";
import EmailInputForPasswordReset from "@/components/email-input-for-password-reset";
import SaveLoginDetails from "@/components/save-login-details";
import SetPasswordPage from "@/components/set-password-page";
import Stepper from "@/components/stepper";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserProvider, { UserContext } from "@/contexts/UserContext";

let userEmail: string;
let userPassword: string;

function Page() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.sessionId) router.push("/");
  });

  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [loggedIn, setLoggedIn] = useState(false);

  function EnteredEmailCallback(email: string) {
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
    if (completedSteps == 0) {
      return (
        <EmailInputForPasswordReset
          enteredEmailCallback={EnteredEmailCallback}
        />
      );
    }
    if (completedSteps == 1) {
      return (
        <SetPasswordPage
          email={userEmail}
          setPasswordCallback={SetPasswordCallback}
        />
      );
    }
  }

  return (
    <div className="w-auto">
      <h1 className="text-5xl font-bold text-center mb-6">Reset Password</h1>
      <div className="mb-4">
        <Stepper
          steps={["Email", "Password"]}
          completedSteps={completedSteps}
        />
      </div>
      {GetCurrentPage()}
      {loggedIn ? <SaveLoginDetails /> : null}
    </div>
  );
}

export default Page;
