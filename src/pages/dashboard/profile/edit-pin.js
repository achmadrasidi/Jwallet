import styles from "styles/Dashboard.module.css";
import { DashLayout } from "component/DashLayout";
import Loading from "component/Sub/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

import { PinInput } from "react-input-pin-code";
import ToastMessage from "component/Sub/Toast";
import { useRouter } from "next/router";

const EditPin = () => {
  const [error, setError] = useState(null);

  const [nextStep, setNextStep] = useState(false);
  const [loading, setLoading] = useState(null);
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const { id, token } = useSelector((state) => state.persist.user.userInfo);
  const checkPin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const pin = values.map((val) => val).join("");
    axios
      .get(`${process.env.API_HOST}/user/pin?pin=${pin}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setNextStep(true);
        setLoading(false);
        setValues(["", "", "", "", "", ""]);
        ToastMessage({ type: "success", message: "Correct pin, please input your new pin" });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  const updatePin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const pin = values.map((val) => val).join("");
    const body = {
      pin,
    };
    axios
      .patch(`${process.env.API_HOST}/user/pin/${id}`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        setLoading(false);
        setNextStep(false);
        ToastMessage({ type: "success", message: result.data.msg });
        setValues(["", "", "", "", "", ""]);
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
                  <h2 className={`${styles.historyTitle} mt-2`}>Change PIN</h2>
                  <p className={`${styles.profileDesc} mt-4`}>{nextStep ? "Type your new 6 digits security PIN to use in Zwallet." : "Enter your current 6 digits Zwallet PIN below to continue to the next steps."}</p>
                </div>
              </div>
              <div className="row mt-0 m-5 mb-2 pt-5 p-3 ps-0 text-center">
                <div className="col-md-4"></div>
                <div className="col-md-4 p-0 d-flex flex-column">
                  <form
                    onSubmit={nextStep ? updatePin : checkPin}
                    onChange={() => {
                      setError(null);
                    }}
                    id="pin"
                    className="d-flex mt-5 justify-content-center "
                  >
                    <PinInput values={values} size={"lg"} className={`${styles.passwordPin} mt-5`} onChange={(_value, _index, val) => setValues(val)} />
                  </form>
                  {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                  <button form="pin" type="submit" className={`${styles.buttonPhone} mt-5`}>
                    {nextStep ? "Change PIN" : "Continue"}
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

export default EditPin;
