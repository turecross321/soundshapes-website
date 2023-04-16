import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import SaveLoginDetails from "@/components/save-login-details";

export function ToastSuccess(message: string) {
  toast.success(message);
}

export function ToastError(message: string) {
  toast.error(message);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-pink-950 to-black">
        <UserProvider>
          <SaveLoginDetails />
          <Navbar />
          <div className="content flex justify-center">
            <div className="content bg-black rounded-xl bg-opacity-50">
              <Component {...pageProps} />{" "}
            </div>
            <ToastContainer autoClose={1000} />
          </div>
        </UserProvider>
      </main>
    </>
  );
}
