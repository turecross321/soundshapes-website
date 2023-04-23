import { LogIn } from "@/api/api-authentication";
import EnforceAuthentication from "@/components/enforce-authentication";
import SetEmailPage from "@/components/set-email-page";
import SetPasswordPage from "@/components/set-password-page";
import Stepper from "@/components/stepper";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

let userEmail: string;
let userPassword: string;

function Page() {
  const router = useRouter();

  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const { session, setSession } = useContext(SessionContext);

  function SetEmailCallback(email: string) {
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
    <EnforceAuthentication shouldBeAuthenticated={false}>
      <div className="content content-padding">
        <h1 className="text-5xl font-bold text-center mb-4">Registration</h1>
        <div className="flex justify-center">
          <Stepper
            steps={["Email", "Password"]}
            completedSteps={completedSteps}
          />
        </div>
        <div className="mb-4"></div>
        {GetCurrentPage()}
      </div>
    </EnforceAuthentication>
  );
}

export default Page;
