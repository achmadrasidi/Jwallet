import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import Head from "next/head";
import { ArrowDown, ArrowUp, Bell, BoxArrowRight, Grid, Person, Plus } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Topup from "./Sub/Topup";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Sub/Logout";
import { userDetail } from "reduxStore/Actions/UserAction";
import { OverlayTrigger, Popover } from "react-bootstrap";
import axios from "axios";
import { PrivateRoute } from "./PrivateRoute";

export const DashLayout = ({ children, title }) => {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state) => state.persist.user.userDetail) || {};
  const { token } = useSelector((state) => state.persist.user.userInfo);
  const router = useRouter();
  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${process.env.API_HOST}/transaction/history?page=1&limit=5&filter=MONTH`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result.data;
        setHistory(data);
      } catch (err) {
        console.log(err);
      }
    })();
    dispatch(userDetail());
  }, [dispatch, token]);

  const popover = (
    <Popover id="popover-basic" className={styles.popoverCard}>
      <Popover.Header as="h3" className="text-center"></Popover.Header>
      <Popover.Body>
        <div className="container-fluid">
          {!history.length ? (
            <h2 className={`${styles.nameDash} m-0`}>No New Notification</h2>
          ) : (
            history.map((item) => (
              <div className="row">
                <div className="col-md-1"></div>
                <div className={`${styles.popoverCard} col-md-10 d-flex align-items-center p-3 mt-2`}>
                  <div className="">{item.type === "send" ? <ArrowUp size={30} color={"#FF5B37"} /> : <ArrowDown size={30} color={"#4CEDB3"} />}</div>
                  <div className="">
                    <div className={styles.transInfo}>
                      {item.type === "send" ? "transfer" : item.type} {item.type === "send" ? "to" : item.type === "topup" ? "" : "from"}
                      {item.type === "send" ? ` ${item.firstName} ${item.lastName}` : item.type === "topup" ? "" : ` ${item.firstName} ${item.lastName}`}
                    </div>
                    <div className={`${styles.amountInfo} text-center`}>{currencyFormatter.format(item.amount)}</div>
                  </div>
                </div>
                <div className="col-md-1"></div>
              </div>
            ))
          )}
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <Topup
        show={show}
        setShow={setShow}
        onClose={() => {
          setShow(false);
        }}
      />
      <Logout show={showLogout} setShow={setShowLogout} onClose={() => setShowLogout(false)} />
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 text-center mt-5 mb-4">
                <h1 className={`${styles.titleDash}`}>FazzPay</h1>
              </div>

              <div className={`col-md-8 text-center mt-5 mb-4 d-flex justify-content-end align-items-center gap-4`} id={styles.topDashContent}>
                <Image src={user.image ? `${process.env.CLOUDINARY_URL}${user.image}` : require("../assets/img/default-img.webp")} width={50} height={50} className={`${styles.imageDash}`}></Image>
                <div>
                  <h2 className={`${styles.nameDash} m-0`}>{`${user.firstName ? user.firstName : "John"} ${user.lastName ? user.lastName : "Doe"}`}</h2>
                  <p className={`${styles.phoneDash} m-0`}>{user && user.noTelp ? `0${user.noTelp}` : "No Phone Number"}</p>
                </div>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                  <Bell size={30} className={`${styles.bellDash}`}></Bell>
                </OverlayTrigger>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </section>
        <section className={`${styles.contentDash}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className={`${styles.leftContentDash} col-md-3 text-center my-5`}>
                <h2
                  className={title.includes("Dashboard") || title.includes("History") ? `${styles.leftTitleActive} my-5` : `${styles.leftTitle} my-5`}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  <Grid />
                  &nbsp; Dashboard
                </h2>
                <h2
                  className={title.includes("Transfer") ? `${styles.leftTitleActive} mb-5` : `${styles.leftTitle} mb-5`}
                  onClick={() => {
                    router.push("/dashboard/transfer");
                  }}
                >
                  <ArrowUp />
                  &nbsp; Transfer &nbsp; &nbsp; &nbsp;
                </h2>
                <h2
                  className={title.includes("Topup") ? `${styles.leftTitleActive} mb-5` : `${styles.leftTitle} mb-5`}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <Plus />
                  &nbsp; Top Up &nbsp; &nbsp; &nbsp;
                </h2>
                <h2
                  className={title.includes("Profile") ? `${styles.leftTitleActive} mb-5` : `${styles.leftTitle} mb-5`}
                  onClick={() => {
                    router.push("/dashboard/profile");
                  }}
                >
                  <Person />
                  &nbsp; Profile &nbsp; &nbsp; &nbsp;
                </h2>
                <h2
                  className={`${styles.leftTitleLogout}`}
                  onClick={() => {
                    setShowLogout(true);
                  }}
                >
                  <BoxArrowRight />
                  &nbsp; Logout &nbsp; &nbsp; &nbsp;
                </h2>
              </div>
              {children}
            </div>
          </div>
        </section>
        <section className={`${styles.footerDash}`}>
          <div class="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">
                <p className={`${styles.botDesc} mt-3`}>2022 FazzPay. All right reserved.</p>
                <div className={`${styles.botRightDesc} d-flex gap-3`}>
                  <p className={`${styles.botDesc} mt-3`}>+62 5637 8882 9901</p>
                  <p className={`${styles.botDesc} mt-3`}>contact@fazzpay.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PrivateRoute>
    </>
  );
};
