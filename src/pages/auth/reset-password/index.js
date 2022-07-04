import styles from "styles/Auth.module.css";
import { Envelope } from "react-bootstrap-icons";
import { AuthLayout } from "component/AuthLayout";
import axios from "axios";
import { useState } from "react";
import Loading from "component/Sub/Loading";
import { useRouter } from "next/router";
import ToastMessage from "component/Sub/Toast";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const confirmHandler = (e) => {
    e.preventDefault();
    setError(null);

    const email = e.target.email.value;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailFormat)) {
      setError("Invalid Email Format");
      return;
    }
    setLoading(true);
    const body = {
      email,
      linkDirect: "https://jwallet.vercel.app/auth/reset-password",
    };
    axios
      .post(`${process.env.API_HOST}/auth/forgot-password`, body)
      .then((result) => {
        setLoading(false);
        ToastMessage({ type: "success", message: result.data.msg });
        router.push("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  return (
    <>
      {loading && <Loading />}

      <main>
        <div className="container-fluid">
          <div className="row">
            <AuthLayout title={"Zwallet - Reset Password"}>
              <div className="col-md-6 mt-5">
                <section>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-9  my-5">
                        <h2 className={`${styles.titleRight}`}>
                          Did You Forgot Your Password? <br /> Don&apos;t Worry, You Can Reset Your <br /> Password In a Minutes.
                        </h2>
                        <p className={`${styles.descRight} mt-4`}>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                        <form
                          onSubmit={confirmHandler}
                          onChange={() => {
                            setError(null);
                          }}
                          className="d-flex flex-column mt-5"
                        >
                          <div className={`${styles.inputLogin} d-flex gap-2 mt-4`}>
                            <Envelope size={30} color="#a9a9a9cc" />
                            <input type="text" required name="email" className={`${styles.inputLogin} p-0 border-0`} placeholder="Enter your e-mail" />
                          </div>
                          {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                          <button type="submit" className={`${styles.confirmButton}`}>
                            Confirm
                          </button>
                        </form>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </section>
              </div>
            </AuthLayout>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
