import styles from "styles/Auth.module.css";
import { Eye, EyeSlash, Lock } from "react-bootstrap-icons";
import { AuthLayout } from "component/AuthLayout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "component/Sub/Loading";
import ToastMessage from "component/Sub/Toast";

const NewPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const confirmHandler = (e) => {
    e.preventDefault();
    setError(null);
    let code;
    if (router) {
      code = router.query.code;
    }
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confPassword.value;
    if (newPassword !== confirmPassword) {
      setError("Password not match");
      return;
    }
    setLoading(true);

    const body = {
      newPassword,
      confirmPassword,
      keysChangePassword: code,
    };

    axios
      .patch(`${process.env.API_HOST}/auth/reset-password`, body)
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
                        <p className={`${styles.descRight} mt-4`}>Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</p>
                        <form
                          onSubmit={confirmHandler}
                          onChange={() => {
                            setError(null);
                          }}
                          className="d-flex flex-column mt-5"
                        >
                          <div className={`${styles.inputLogin} d-flex justify-content-between align-items-center mt-5`}>
                            <span className="flex-fill d-flex gap-2">
                              <Lock size={30} color="#a9a9a9cc" />
                              <input type={showNewPassword ? "text" : "password"} required name="newPassword" className={`${styles.inputLogin} p-0 border-0`} placeholder="Create your new password" />
                            </span>
                            {showNewPassword ? (
                              <EyeSlash size={30} color="#a9a9a9cc" className={`${styles.eyeIcon}`} onClick={() => setShowNewPassword(false)}></EyeSlash>
                            ) : (
                              <Eye size={30} color="#a9a9a9cc" className={`${styles.eyeIcon}`} onClick={() => setShowNewPassword(true)}></Eye>
                            )}
                          </div>
                          <div className={`${styles.inputLogin} d-flex justify-content-between align-items-center mt-5`}>
                            <span className="flex-fill d-flex gap-2">
                              <Lock size={30} color="#a9a9a9cc" />
                              <input type={showConfPassword ? "text" : "password"} required name="confPassword" className={`${styles.inputLogin} p-0 border-0`} placeholder="Confirm your new password" />
                            </span>
                            {showConfPassword ? (
                              <EyeSlash size={30} className={`${styles.eyeIcon}`} color="#a9a9a9cc" onClick={() => setShowConfPassword(false)}></EyeSlash>
                            ) : (
                              <Eye size={30} className={`${styles.eyeIcon}`} color="#a9a9a9cc" onClick={() => setShowConfPassword(true)}></Eye>
                            )}
                          </div>

                          {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                          <button type="submit" className={`${styles.confirmButton}`}>
                            Reset Password
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

export default NewPassword;
