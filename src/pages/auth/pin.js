import styles from "styles/Auth.module.css";
import { AuthLayout } from "component/AuthLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import Loading from "component/Sub/Loading";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { PinInput } from "react-input-pin-code";
import { PrivateRoute } from "component/PrivateRoute";

const Pin = () => {
  const [isSuccess, setSuccess] = useState(null);
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, token } = useSelector((state) => state.persist.user.userInfo);

  const router = useRouter();
  const confirmPin = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    setLoading(true);
    const pin = values.map((val) => val).join("");
    const body = {
      pin,
    };
    axios
      .patch(`${process.env.API_HOST}/user/pin/${id}`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((_result) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  return (
    <>
      {loading && <Loading />}
      <PrivateRoute>
        <main>
          <div className="container-fluid">
            <div className="row">
              <AuthLayout title={"Zwallet - Confirm Pin"}>
                <div className="col-md-6 mt-5">
                  <section>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-1"></div>
                        {isSuccess ? (
                          <div className="col-md-9 my-5">
                            <CheckCircleFill size={60} color="#1EC15F" />
                            <h2 className={`${styles.titleRight} mt-4`}>Your PIN Was Successfully Created</h2>
                            <p className={`${styles.descRight} mt-4`}>Your PIN was successfully created and you can now access all the features in FazzPay.</p>
                            <button
                              className={`${styles.goToDashBtn}`}
                              onClick={() => {
                                router.push("/dashboard");
                              }}
                            >
                              Go To Dashboard
                            </button>
                          </div>
                        ) : (
                          <div className="col-md-9 my-5">
                            <h2 className={`${styles.titleRight}`}>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h2>
                            <p className={`${styles.descRight} mt-4`}>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don&apos;t tell anyone about your FazzPay account password and the PIN.</p>
                            <p className={`${styles.descRight} mt-4`}>Your PIN was successfully created and you can now access all the features in FazzPay.</p>
                            <form
                              onSubmit={confirmPin}
                              onChange={() => {
                                setError(null);
                              }}
                              id="pin"
                              className="d-flex mt-5 justify-content-center "
                            >
                              <PinInput values={values} size={"lg"} className={`${styles.passwordPin} mt-5`} onChange={(_value, _index, val) => setValues(val)} />
                            </form>
                            {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                            <button type="submit" form="pin" className={`${styles.confirmButton}`}>
                              Confirm
                            </button>
                          </div>
                        )}

                        <div className="col-md-2"></div>
                      </div>
                    </div>
                  </section>
                </div>
              </AuthLayout>
            </div>
          </div>
        </main>
      </PrivateRoute>
    </>
  );
};

export default Pin;
