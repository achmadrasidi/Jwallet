import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useRouter } from "next/router";
import { CheckCircleFill } from "react-bootstrap-icons";

const Status = () => {
  const router = useRouter();

  return (
    <>
      <DashLayout title={"Zwallet - Transfer Detail"}>
        <div className="col-md-8 my-5 ms-4">
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="text-center mt-5">
                <CheckCircleFill size={80} color="#FF5B37" />
                <h2 className={`${styles.successTitle} mt-4 mb-5`}>Transfer Failed</h2>
                <p className={`${styles.errorDesc}`}>We can&apos;t transfer your money at the moment, we recommend you to check your internet connection and try again.</p>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Amount</h3>
                  <p className={`${styles.transName} mt-2`}>Rp100.000</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3  ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Balance Left</h3>
                  <p className={`${styles.transName} mt-2`}>Rp20.000</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Date & Time</h3>
                  <p className={`${styles.transName} mt-2`}>May 11, 2020 - 12.20</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Notes</h3>
                  <p className={`${styles.transName} mt-2`}>For buying some socks</p>
                </div>
              </div>
              <div className="row p-5 pt-0 pb-4">
                <div className="col-md-12">
                  <h2 className={`${styles.searchTitle} mt-2`}>Transfer To</h2>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12 d-flex gap-3 ">
                  <div className="">
                    <Image src={require("assets/img/prof1.png")} />
                  </div>
                  <div className="">
                    <h3 className={`${styles.transName}`}>Samuel Suhi</h3>
                    <p className={`${styles.transStatus} mt-2`}>+62 813-8492-9994</p>
                  </div>
                </div>
              </div>
              <div className="text-end my-5 me-5">
                <button
                  className={`${styles.continueButton}`}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default Status;
