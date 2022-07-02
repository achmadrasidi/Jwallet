import styles from "styles/Auth.module.css";
import Image from "next/image";
import Head from "next/head";
import { IsLoggedInRoutes } from "./IsLoggedInRoutes";

export const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <IsLoggedInRoutes>
        <div className={`${styles.topHome} col-md-6`}>
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 text-center mt-5 mb-3">
                  <h1 className={`${styles.title}`}>FazzPay</h1>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-2"></div>
              </div>
              <div className="row">
                <div className="col-md-1 "></div>
                <div className="col-md-8">
                  {" "}
                  <Image src={require("../assets/img/double-phone-full.png")} />
                  <h2 className={`${styles.titleImage}`}>App that Covering Banking Needs.</h2>
                  <p className={`${styles.titleDesc} mt-5 mb-5`}>
                    Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {children}
      </IsLoggedInRoutes>
    </>
  );
};
