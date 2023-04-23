import { LogIn } from "@/api/api-authentication";
import EmailInputForPasswordReset from "@/components/email-input-for-password-reset";
import SetPasswordPage from "@/components/set-password-page";
import Stepper from "@/components/stepper";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import EnforceAuthentication from "@/components/enforce-authentication";

let userEmail: string;
let userPassword: string;

function Page() {
  const router = useRouter();
  const { session, setSession } = useContext(SessionContext);

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
    if (setSession) await LogIn(userEmail, userPassword, setSession);
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
    <EnforceAuthentication shouldBeAuthenticated={false}>
      <div className="content content-padding">
        <h1 className="text-5xl font-bold text-center mb-6">Reset Password</h1>
        <div className="mb-4">
          <Stepper
            steps={["Email", "Password"]}
            completedSteps={completedSteps}
          />
        </div>
        {GetCurrentPage()}
      </div>
    </EnforceAuthentication>
  );
}

export default Page;
