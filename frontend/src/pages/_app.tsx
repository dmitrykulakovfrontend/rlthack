import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
