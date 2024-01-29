import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/global.css";
import { SessionProvider  } from  "next-auth/react";
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    );
}; 

export default MyApp;