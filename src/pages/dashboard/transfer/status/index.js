import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useRouter } from "next/router";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [item, setItem] = useState({});
  const router = useRouter();
  const { token } = useSelector((state) => state.persist.user.userInfo);
  const user = useSelector((state) => state.persist.user.userDetail);
  const { receiver, transAmount, notes } = useSelector((state) => state.persist.transaction.transItem);

  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
  const date = new Date(item.createdAt);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${process.env.API_HOST}/transaction/history?page=1&limit=1&filter=WEEK`, { headers: { Authorization: `Bearer ${token}` } });
        setItem(result.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <DashLayout title={"Zwallet - Transfer Status"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="text-center mt-5">
                <CheckCircleFill size={80} color="#1EC15F" />
                <h2 className={`${styles.successTitle} mt-4 mb-5`}>Transfer Success</h2>
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
                  <p className={`${styles.transName} mt-2`}>{currencyFormatter.format(user.balance)}</p>
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
              <div className="row p-5 pt-0 pb-4">
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
              <div className="text-end my-5 me-5">
                <button
                  className={`${styles.pdfButton} me-3`}
                  onClick={() => {
                    axios.get(`${process.env.API_HOST}/export/transaction/${item.id}`, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
                      const { url } = result.data.data;
                      window.open(url, "_blank");
                    });
                  }}
                >
                  Download PDF
                </button>
                <button
                  className={`${styles.continueButton}`}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Back To Home
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
