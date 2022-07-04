import styles from "styles/Dashboard.module.css";
import { DashLayout } from "component/DashLayout";
import Loading from "component/Sub/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Telephone } from "react-bootstrap-icons";
import axios from "axios";
import { useState } from "react";
import { userDetail } from "reduxStore/Actions/UserAction";
import ToastMessage from "component/Sub/Toast";
import { useRouter } from "next/router";

const EditPhone = () => {
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, token } = useSelector((state) => state.persist.user.userInfo);
  const updatePhone = () => {
    setLoading(true);
    setError(null);

    const numberFormat = /^\d+$/;
    if (!phone.match(numberFormat)) {
      setError("Invalid Phone Format");
      setLoading(false);
      return;
    }
    const body = {
      noTelp: phone,
    };
    axios
      .patch(`${process.env.API_HOST}/user/profile/${id}`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        setLoading(false);
        dispatch(userDetail());
        ToastMessage({ type: "success", message: result.data.msg });
        router.push("/dashboard/profile");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  return (
    <>
      {loading && <Loading />}

      <DashLayout title={"Zwallet - Edit Profile Phone"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashPhone}`}>
              <div className="row mt-0 m-5 mb-2 pt-4 p-3 ps-0">
                <div className="col-md-12 p-0">
                  <h2 className={`${styles.historyTitle} mt-2`}>Edit Phone Number</h2>
                  <p className={`${styles.profileDesc} mt-4`}>
                    Add at least one phone number for the transfer ID <br /> so you can start transfering your money <br /> to another user.
                  </p>
                </div>
              </div>
              <div className="row mt-0 m-5 mb-2 pt-5 p-3 ps-0 text-center">
                <div className="col-md-4"></div>
                <div className="col-md-4 p-0 d-flex flex-column">
                  <div className={`${styles.inputLogin} mt-5 text-start`}>
                    <Telephone color="#a9a9a9cc" />
                    <span className="mx-2">+62</span>
                    <input
                      type="text"
                      name="phone_number"
                      className={`${styles.inputPhone}`}
                      required
                      placeholder="Enter your phone number"
                      onChange={(e) => {
                        setError(null);
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                  <button className={`${styles.buttonPhone} mt-5`} onClick={updatePhone}>
                    Edit Phone Number
                  </button>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default EditPhone;
