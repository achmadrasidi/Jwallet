import styles from "styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { IsLoggedInRoutes } from "component/IsLoggedInRoutes";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zwallet - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <IsLoggedInRoutes>
        <main>
          <section className={`${styles.topHome}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3 text-center my-5">
                  <h1
                    className={`${styles.title}`}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    FazzPay
                  </h1>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-3 text-center my-5">
                  <button
                    className={`${styles.loginButton} me-3`}
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className={`${styles.registButton}`}
                    onClick={() => {
                      router.push("/auth/register");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="row mt-5 pt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center">
                  <h2 className={`${styles.heroTitle}`}>
                    Awesome App <br /> For Saving Time.
                  </h2>
                  <p className={`${styles.heroDesc}`}>
                    We bring you a mobile app for banking problems that <br /> oftenly wasting much of your times.
                  </p>
                  <button
                    className={`${styles.tryItButton} mt-3`}
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  >
                    Try It Free
                  </button>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>
          <section className={`${styles.reason}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center my-5 pb-5">
                  <h2 className={`${styles.reasonTitle}`}>
                    {" "}
                    <span className={`${styles.reasonWhy}`}>Why</span> Choose FazzPay?
                  </h2>
                  <p className={`${styles.reasonDesc} mt-3`}>
                    We have some great features from the application and it's totally free <br /> to use by all users around the world.
                  </p>
                  <div className="row mt-5">
                    <div className="col-md-4">
                      <Image src={require("../assets/img/phone-vec.png")}></Image>
                      <h3 className={`${styles.cardTitle}`}>24/7 Support</h3>
                      <p className={`${styles.cardDesc} mt-3`}>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
                    </div>
                    <div className={`col-md-4 ${styles.reasonCard}`}>
                      <Image src={require("../assets/img/privacy-vec.png")}></Image>
                      <h3 className={`${styles.cardTitle}`}>Data Privacy</h3>
                      <p className={`${styles.cardDesc} mt-3`}>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
                    </div>
                    <div className="col-md-4">
                      <Image src={require("../assets/img/download-vec.png")}></Image>
                      <h3 className={`${styles.cardTitle}`}>Easy Download</h3>
                      <p className={`${styles.cardDesc} mt-3`}>Zwallet is 100% totally free to use it's now available on Google Play Store and App Store.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>
          <section className={`${styles.client}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 my-5">
                  <Image src={require("../assets/img/Group 52.png")} width={1000} height={200} />
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>
          <section className={`${styles.reason}`}>
            <div className="container-fluid">
              <div className="row ">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center mt-5 pt-3">
                  <Image src={require("../assets/img/money-transfered.png")} />
                  <h2 className={`${styles.reasonTitle} mt-3`}>
                    <span className={`${styles.reasonWhy}`}>Money</span> has Been Transfered.
                  </h2>
                  <p className={`${styles.reasonDesc} mt-4 mb-5 pb-3`}>
                    That amount of money has been transfered from all users. We still counting <br /> and going strong!
                  </p>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>
          <section className={`${styles.features}`}>
            <div className="container-fluid">
              <div className="row ">
                <div className="col-md-6">
                  <Image src={require("../assets/img/double-phone.png")} />
                </div>
                <div className="col-md-6 mt-5 pt-5">
                  <h2 className={`${styles.reasonTitle}`}>
                    All The <span className={`${styles.reasonWhy}`}>Great</span> <br /> FazzPay Features.
                  </h2>
                  <div className={`${styles.featCard} py-2 mt-5`}>
                    <h3 className={`${styles.featCardTitle} ms-3 mt-3`}>
                      {" "}
                      <span className={`${styles.featCardNum}`}>1.</span> Small Fee
                    </h3>
                    <p className={`${styles.featCardDesc} ms-3`}>We only charge 5% of every success transaction done in FazzPay app.</p>
                  </div>
                  <div className={`${styles.featCard} py-2 my-5`}>
                    <h3 className={`${styles.featCardTitle} ms-3 mt-3`}>
                      {" "}
                      <span className={`${styles.featCardNum}`}>2.</span> Data Secured
                    </h3>
                    <p className={`${styles.featCardDesc} ms-3`}>All your data is secured properly in our system and it's encrypted.</p>
                  </div>
                  <div className={`${styles.featCard} py-2`}>
                    <h3 className={`${styles.featCardTitle} ms-3 mt-3`}>
                      {" "}
                      <span className={`${styles.featCardNum}`}>3.</span> User Friendly
                    </h3>
                    <p className={`${styles.featCardDesc} ms-3`}>FazzPay come up with modern and sleek design and not complicated.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.reason}`}>
            <div className="container-fluid">
              <div className="row pb-5">
                <div className="col-md-2 align-self-center text-end">
                  {" "}
                  <Image src={require("../assets/img/arrow-left.png")}></Image>
                </div>
                <div className="col-md-8 text-center">
                  <h2 className={`${styles.reasonTitle} mt-4`}>
                    What Users are <span className={`${styles.reasonWhy}`}>Saying.</span>
                  </h2>
                  <p className={`${styles.featCardDesc}`}>
                    We have some great features from the application and it's totally free <br /> to use by all users around the world.
                  </p>
                  <div className={`${styles.cardTestimony} mt-5 py-5`}>
                    <Image src={require("../assets/img/alex.png")}></Image>
                    <h3 className={`${styles.testiName} mt-3`}>Alex Hansinburg</h3>
                    <h5 className={`${styles.testiJob} mt-3`}>Designer</h5>
                    <p className={`${styles.testiComment} mt-5`}>
                      “This is the most outstanding app that I've ever try in my live, this app is such an amazing masterpiece and <br /> it's suitable for you who is bussy with their bussiness and must transfer money to another person aut
                      there.
                      <br /> Just try this app and see the power!”
                    </p>
                  </div>
                </div>
                <div className="col-md-2 align-self-center text-start">
                  {" "}
                  <Image src={require("../assets/img/arrow-right.png")}></Image>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.botHome}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10 mt-5 border-bottom">
                  <h2 className={`${styles.title}`}>FazzPay</h2>
                  <p className={`${styles.botDesc} mt-3 mb-5`}>
                    Simplify financial needs and saving <br /> much time in banking needs with <br /> one single app.
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-1"></div>
                <div className="col-md-10 d-flex justify-content-between">
                  <p className={`${styles.botDesc} mb-5`}>2022 FazzPay. All right reserved.</p>
                  <div className="d-flex gap-3">
                    <p className={`${styles.botDesc} mb-5`}>+62 5637 8882 9901</p>
                    <p className={`${styles.botDesc} mb-5`}>contact@fazzpay.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </IsLoggedInRoutes>
    </>
  );
}
