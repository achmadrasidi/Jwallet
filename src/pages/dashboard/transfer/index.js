import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useRouter } from "next/router";
import { Search, SortAlphaDown, SortAlphaUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Loading from "component/Sub/Loading";

const Transfer = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [start, setStart] = useState(0);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState("Sort by");
  const [order, setOrder] = useState("ASC");
  const [totalPage, setTotalPage] = useState(1);
  const { token } = useSelector((state) => state.persist.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setError(null);
      setLoading(true);
      try {
        let sortValue;
        switch (sort) {
          case "Sort by":
            sortValue = "firstName";
            break;
          case "Name":
            sortValue = "firstName";
            break;
          case "Phone Number":
            sortValue = "noTelp";
            break;
          default:
            break;
        }
        const result = await axios.get(`${process.env.API_HOST}/user?page=${page}&limit=4&search=${search ? search : ""}&sort=${sortValue} ${order}`, { headers: { Authorization: `Bearer ${token}` } });
        const { pagination } = result.data;
        const { data } = result.data;
        setTotalPage(pagination.totalPage);
        router.query.page = page;
        router.push(router);
        setLoading(false);
        setUsers(data);
      } catch (err) {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      }
    })();
    if (search || search === "") {
      router.query.search = search;
    }
    if (sort !== "Sort by") {
      router.query.sort = `${sort} ${order}`;
    }
  }, [page, search, sort, order]);
  const getPaginationGroup = () => {
    let strt = totalPage ? Math.floor((page - 1) / totalPage) * totalPage : 1;
    return new Array(totalPage ? totalPage : 1).fill().map((_, i) => {
      return totalPage ? strt + i + 1 : strt + i;
    });
  };
  const changePageHandler = (e) => {
    const pageNumber = Number(e.target.textContent);
    setPage(pageNumber);
  };
  const nextPageHandler = () => {
    if (page === limit) {
      setStart((prevStart) => prevStart + 1);
      setLimit((prevLimit) => prevLimit + 1);
    }
    setPage((currPage) => currPage + 1);
  };
  const lastPageHandler = () => {
    setStart(totalPage - 5);
    setLimit(totalPage);
    setPage(totalPage);
  };
  const prevPageHandler = () => {
    if (page === start + 1) {
      setStart((prevStart) => prevStart - 1);
      setLimit((prevLimit) => prevLimit - 1);
    }
    setPage((currPage) => currPage - 1);
  };
  const firstPageHandler = () => {
    setStart(0);
    setLimit(5);
    setPage(1);
  };
  return (
    <>
      {loading && <Loading />}
      <DashLayout title={"Zwallet - Transfer"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="row p-5 pb-3">
                <div className="col-md-12">
                  <h2 className={`${styles.searchTitle} mt-2`}>Search Receiver</h2>
                  <div className={`${styles.searchContainer} d-flex mt-4`}>
                    <Search size={20} color="#a9a9a9cc" />
                    <input
                      type="text"
                      className={`${styles.inputSearch} d-flex `}
                      onKeyUp={(e) => {
                        e.preventDefault();
                        if (e.key === "Enter") {
                          setSearch(e.target.value);
                        }
                      }}
                      placeholder="Search receiver here"
                    />
                  </div>
                </div>
                <div className=" mt-3 d-flex justify-content-end gap-1">
                  <DropdownButton variant="secondary" className="dropdown-sort" title={sort}>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        setSort("Name");
                      }}
                    >
                      {"Name"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => {
                        setSort("Phone Number");
                      }}
                    >
                      {"Phone Number"}
                    </Dropdown.Item>
                  </DropdownButton>
                  {order === "ASC" ? (
                    <SortAlphaDown
                      className={`${styles.sortIcon}`}
                      size={40}
                      onClick={() => {
                        setOrder("DESC");
                      }}
                    ></SortAlphaDown>
                  ) : (
                    <SortAlphaUp
                      size={40}
                      className={`${styles.sortIcon}`}
                      onClick={() => {
                        setOrder("ASC");
                      }}
                    ></SortAlphaUp>
                  )}
                </div>
              </div>
              {error || !users.length ? (
                <p className={`${styles.errorAuth} mb-5`}>{error || "No User Found"}</p>
              ) : (
                users.map((user, i) => (
                  <div
                    key={i}
                    className={`row mt-0 m-5 pt-4 p-3 ${styles.searchItem}`}
                    onClick={() => {
                      router.push({
                        pathname: "/dashboard/transfer/[id]",
                        query: { id: user.id },
                      });
                    }}
                  >
                    <div className="col-md-12 d-flex gap-3 ">
                      <div className="">
                        <Image src={user.image ? `${process.env.CLOUDINARY_URL}${user.image}` : require("assets/img/default-img.webp")} className={styles.defaultImg} width={50} height={50} />
                      </div>
                      <div className="">
                        <h3 className={`${styles.transName}`}>{`${user.firstName ? user.firstName : "John"} ${user.lastName ? user.lastName : "Doe"}`}</h3>
                        <p className={`${styles.transStatus} mt-2`}>{user.noTelp ? "0" + user.noTelp : "No Phone Number"}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className={`${styles.pagination} my-3`}>
                <button onClick={firstPageHandler} className={`${styles.prev} ${page === 1 || !users.length ? styles.disabled : ""}`}>
                  First Page
                </button>
                <button onClick={prevPageHandler} className={`${styles.prev} ${page === 1 || !users.length ? styles.disabled : ""}`}>
                  Prev
                </button>

                {getPaginationGroup()
                  .map((item, i) => (
                    <button onClick={changePageHandler} key={i} className={`${styles.paginationItem} ${page === item ? styles.active : null} `}>
                      <span>{item}</span>
                    </button>
                  ))
                  .slice(start, limit)}

                <button onClick={nextPageHandler} className={`${styles.next} ${page === totalPage || !users.length ? styles.disabled : ""}`}>
                  Next
                </button>
                <button onClick={lastPageHandler} className={`${styles.prev} ${page === totalPage || !users.length ? styles.disabled : ""}`}>
                  Last Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default Transfer;
