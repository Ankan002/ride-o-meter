import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RecoilRoot} from "recoil";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
        <Component {...pageProps} />
          <Toaster />
      </RecoilRoot>
  );
}

export default MyApp;
