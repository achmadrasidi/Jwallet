import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import ConfirmPin from "component/Sub/ConfirmPin";
import { useState } from "react";
import { useSelector } from "react-redux";

const TransferConfirm = () => {
  const [show, setShow] = useState(false);
  const { receiver, transAmount, notes } = useSelector((state) => state.persist.transaction.transItem);
  const user = useSelector((state) => state.persist.user.userDetail);
  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
  const date = new Date();

  return (
    <>
      <ConfirmPin
        show={show}
        setShow={setShow}
        onClose={() => {
          setShow(false);
        }}
      />
      <DashLayout title={"Zwallet - Transfer Confirm"}>
        <div className="col-md-8 my-5 ms-4">
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="row p-5 pb-4">
                <div className="col-md-12">
                  <h2 className={`${styles.searchTitle} mt-2`}>Transfer To</h2>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12 d-flex gap-3 ">
                  <div className="">
                    <Image src={receiver.image ? `${process.env.CLOUDINARY_URL}${receiver.image}` : require("assets/img/default-img.webp")} className={styles.defaultImg} width={50} height={50} />
                  </div>
                  <div className="">
                    <h3 className={`${styles.transName}`}>{`${receiver.firstName} ${receiver.lastName}`}</h3>
                    <p className={`${styles.transStatus} mt-2`}>{receiver.noTelp ? "0" + receiver.noTelp : "No Phone Number"}</p>
                  </div>
                </div>
              </div>
              <div className="row pt-0  p-5 pb-4">
                <div className="col-md-12">
                  <h2 className={`${styles.searchTitle} mt-2`}>Details</h2>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Amount</h3>
                  <p className={`${styles.transName} mt-2`}>{currencyFormatter.format(transAmount)}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3  ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Balance Left</h3>
                  <p className={`${styles.transName} mt-2`}>{currencyFormatter.format(Number(user.balance) - Number(transAmount))}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Date & Time</h3>
                  <p className={`${styles.transName} mt-2`}>{date.toString().split("GMT")[0]}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Notes</h3>
                  <p className={`${styles.transName} mt-2`}>{notes}</p>
                </div>
              </div>
              <div className="text-end mb-5 me-5">
                <button
                  className={`${styles.continueButton}`}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default TransferConfirm;
