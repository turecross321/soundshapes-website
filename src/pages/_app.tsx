import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import AutoLogin from "@/components/auto-login";

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
        <SessionProvider>
          <AutoLogin />
          <Navbar />
          <div className="flex justify-center items content-padding">
            <div>
              <Component {...pageProps} />{" "}
            </div>
            <ToastContainer autoClose={1000} />
          </div>
        </SessionProvider>
      </main>
    </>
  );
}
