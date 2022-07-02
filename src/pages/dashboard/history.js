import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from "component/Sub/Loading";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("--Select Filter--");
  const { token } = useSelector((state) => state.persist.user.userInfo);
  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${process.env.API_HOST}/transaction/history?page=${page}&limit=7&filter=${filter === "--Select Filter--" ? "WEEK" : filter}`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result.data;
        const { pagination } = result.data;
        setLoading(false);
        setTotalPage(pagination.totalPage);
        router.query.page = page;
        router.push(router);
        setHistory(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
    if (filter !== "--Select Filter--") {
      router.query.filter = filter;
    }
  }, [page, filter]);
  const getPaginationGroup = () => {
    let start = page || totalPage ? Math.floor((page - 1) / totalPage) * totalPage : 1;
    return new Array(totalPage).fill().map((_, i) => start + i + 1);
  };
  const changePageHandler = (e) => {
    const pageNumber = Number(e.target.textContent);
    setPage(pageNumber);
  };
  return (
    <>
      {loading && <Loading />}
      <DashLayout title={"Zwallet - History"}>
        <div className="col-md-8 my-5 ms-4">
          <div className="row justify-content-around">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="row mt-4">
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <h2 className={`${styles.historyTitle} mt-2`}>Transaction History</h2>
                </div>
                <div className="col-md-5 text-end">
                  <DropdownButton variant="secondary" className="dropdown-sort" title={filter}>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        setFilter("WEEK");
                      }}
                    >
                      {"Week"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => {
                        setFilter("MONTH");
                      }}
                    >
                      {"Month"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onClick={() => {
                        setFilter("YEAR");
                      }}
                    >
                      {"Year"}
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="col-md-1"></div>
              </div>
              {!history.length ? (
                <h3 className={`${styles.transName} text-center mt-5`}>No History Found</h3>
              ) : (
                history.map((item, i) => (
                  <div className="row my-4" key={i}>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 d-flex gap-3">
                      <div className="">
                        <Image src={item.image ? `${process.env.CLOUDINARY_URL}${item.image}` : require("assets/img/default-img.webp")} className={styles.defaultImg} width={50} height={50} />
                      </div>
                      <div className="">
                        <h3 className={`${styles.transName}`}>{`${item.firstName} ${item.lastName}`}</h3>
                        <p className={`${styles.transStatus}`}>{item.type}</p>
                      </div>
                    </div>
                    <div className="col-md-5 text-end">
                      <h2 className={`${item.type !== "send" ? styles.transAmountIn : styles.transAmountEx}`}>
                        {item.type !== "send" ? "+" : "-"}
                        {currencyFormatter.format(item.amount)}
                      </h2>
                      <h2 className={`${styles.transStatus}`}>{item.status}</h2>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                ))
              )}
              <div className={`${styles.pagination} my-3`}>
                {getPaginationGroup().map((item, i) => (
                  <button onClick={changePageHandler} key={i} className={`${styles.paginationItem} ${page === item ? styles.active : null} `}>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default History;
