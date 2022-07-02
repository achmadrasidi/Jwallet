import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { ArrowDown, ArrowUp, Plus } from "react-bootstrap-icons";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DashLayout } from "component/DashLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Topup from "component/Sub/Topup";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "component/Sub/Loading";
import ToastMessage from "component/Sub/Toast";

const Dashboard = () => {
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState({});
  const [history, setHistory] = useState([]);
  const router = useRouter();
  const { id, token } = useSelector((state) => state.persist.user.userInfo);
  const user = useSelector((state) => state.persist.user.userDetail);
  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
  const { listIncome = [], listExpense = [] } = dashboard;

  useEffect(() => {
    if (router.query.returnUrl) {
      ToastMessage({ type: "error", message: "You are logged in" });
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${process.env.API_HOST}/dashboard/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result.data;
        setLoading(false);
        setDashboard(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${process.env.API_HOST}/transaction/history?page=1&limit=4&filter=WEEK`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result.data;
        setLoading(false);
        setHistory(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [router.query]);

  const dataChart = {
    labels: listIncome.map((item) => item.day),
    datasets: [
      {
        label: ["Income"],
        data: listIncome.map((item) => item.total),
        backgroundColor: ["#9DA6B5"],
      },
      {
        label: ["Expense"],
        data: listExpense.map((item) => item.total),
        backgroundColor: ["#6379F4"],
      },
    ],
  };

  return (
    <>
      {loading && <Loading />}
      <Topup
        show={show}
        setShow={setShow}
        onClose={() => {
          setShow(false);
        }}
      />
      <DashLayout title={"Zwallet - Dashboard"}>
        <div className="col-md-8 my-5 ms-4">
          <div className={`row ${styles.midContentDashTop} mb-4`}>
            <div className="col-md-6 mb-3">
              <p className={`${styles.balanceTitle} mt-4`}>Balance</p>
              <h2 className={`${styles.balanceAcc}`}>{user.balance ? currencyFormatter.format(Number(user.balance)) : "Rp 0"}</h2>
              <p className={`${styles.balanceTitle}`}>{user.noTelp ? "0" + user.noTelp : "No Phone Number"}</p>
            </div>
            <div className="col-md-6 text-end">
              <button
                onClick={() => {
                  router.push("/dashboard/transfer");
                }}
                className={`${styles.transferButton} mt-4 me-3`}
              >
                <ArrowUp />
                Transfer
              </button>{" "}
              <br />
              <button
                onClick={() => {
                  setShow(true);
                }}
                className={`${styles.transferButton} mt-3 me-3`}
              >
                <Plus />
                Top Up
              </button>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className={`col-md-7 ${styles.midContentDashBot}`}>
              <div className="row mt-4">
                <div className="col-md-6 text-center">
                  <ArrowDown size={30} className={`${styles.arrowIn}`} />
                  <h2 className={`${styles.incomeText} mt-3`}>Income</h2>
                  <p className={`${styles.incomeVal} mt-3`}>{dashboard.totalIncome ? currencyFormatter.format(Number(dashboard.totalIncome)) : "Rp 0"}</p>
                </div>
                <div className="col-md-6 text-center">
                  <ArrowUp size={30} className={`${styles.arrowEx}`} />
                  <h2 className={`${styles.incomeText} mt-3`}>Expense</h2>
                  <p className={`${styles.incomeVal} mt-3`}>{dashboard.totalExpense ? currencyFormatter.format(Number(dashboard.totalExpense)) : "Rp 0"}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center mb-4">
                  <Bar
                    data={dataChart}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`col-md-4 ${styles.midContentDashBot} ps-4`}>
              <div className="row">
                <div className="col-md-8">
                  <h2 className={`${styles.transTitle} mt-3`}>Transaction History</h2>
                </div>
                <div className="col-md-4">
                  <h2
                    className={`${styles.seeAll} text-center  mt-3`}
                    onClick={() => {
                      router.push("/dashboard/history");
                    }}
                  >
                    See All
                  </h2>
                </div>
              </div>
              {!history.length ? (
                <h3 className={`${styles.transName} text-center mt-5`}>No history Found</h3>
              ) : (
                history.map((item) => (
                  <div className="row mb-3">
                    <div className="col-md-6 d-flex gap-3 mt-4">
                      <div className="">
                        <Image src={item.image ? `${process.env.CLOUDINARY_URL}${item.image}` : require("assets/img/default-img.webp")} className={styles.defaultImg} width={50} height={50} />
                      </div>
                      <div className="">
                        <h3 className={`${styles.transName}`}>{`${item.firstName} ${item.lastName}`}</h3>
                        <p className={`${styles.transStatus}`}>{item.type}</p>
                      </div>
                    </div>
                    <div className="col-md-6 text-center mt-4">
                      <h2 className={`${item.type !== "send" ? styles.transAmountIn : styles.transAmountEx}`}>
                        {item.type !== "send" ? "+" : "-"}
                        {currencyFormatter.format(item.amount)}
                      </h2>
                      <h2 className={`${styles.transStatus}`}>{item.status}</h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default Dashboard;
