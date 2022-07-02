import styles from "styles/Auth.module.css";
import { Envelope, Eye, EyeSlash, Lock } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { AuthLayout } from "component/AuthLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userLogin } from "reduxStore/Actions/UserAction";
import Loading from "component/Sub/Loading";
import ToastMessage from "component/Sub/Toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, error, loading, userInfo } = useSelector((state) => state.persist.user);
  let pin;
  if (userInfo) {
    pin = userInfo.pin;
  }

  useEffect(() => {
    setError(null);
    if (router.query.returnUrl) {
      ToastMessage({ type: "error", message: "Please login first" });
      return;
    }
    if (isSuccess && !pin) {
      ToastMessage({ type: "success", message: "Login successful,please set your pin !" });
      router.push("/auth/pin");
      return;
    }
    if (isSuccess && pin) {
      dispatch(resetState());
      ToastMessage({ type: "success", message: "You have successfully logged in" });
      router.push("/dashboard");
      return;
    }
    if (error) {
      setError(error);
    }
  }, [isSuccess, error]);

  const loginHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const password = e.target.password.value;
    if (!email.match(emailFormat)) {
      setError("Invalid Email Format");
      return;
    }
    const body = {
      email,
      password,
    };
    dispatch(userLogin(body));
  };
  return (
    <>
      {loading && <Loading />}
      <main>
        <div className="container-fluid">
          <div className="row">
            <AuthLayout title={"Zwallet - Login"}>
              <div className="col-md-6 mt-5">
                <section>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-9  my-5">
                        <h2 className={`${styles.titleRight}`}>
                          Start Accessing Banking Needs <br /> With All Devices and All Platforms <br /> With 30.000+ Users
                        </h2>
                        <p className={`${styles.descRight} mt-4`}>
                          Transfering money is eassier than ever, you can access <br /> FazzPay wherever you are. Desktop, laptop, mobile phone? <br /> we cover all of that for you!
                        </p>
                        <form
                          onSubmit={loginHandler}
                          onChange={() => {
                            router.query = "";

                            setError(null);
                            dispatch(resetState());
                          }}
                          className="d-flex flex-column mt-5"
                        >
                          <div className={`${styles.inputLogin} d-flex gap-2`}>
                            <Envelope size={30} color="#a9a9a9cc" />
                            <input type="text" required name="email" className={`${styles.inputLogin} p-0 border-0`} placeholder="Enter your e-mail" />
                          </div>
                          <div className={`${styles.inputLogin} d-flex justify-content-between align-items-center mt-5`}>
                            <span className="flex-fill d-flex gap-2">
                              <Lock size={30} color="#a9a9a9cc" />
                              <input type={showPassword ? "text" : "password"} required name="password" className={`${styles.inputLogin} p-0 border-0`} placeholder="Enter your password" />
                            </span>
                            {showPassword ? (
                              <EyeSlash size={30} color="#a9a9a9cc" className={`${styles.eyeIcon}`} onClick={() => setShowPassword(false)}></EyeSlash>
                            ) : (
                              <Eye size={30} color="#a9a9a9cc" className={`${styles.eyeIcon}`} onClick={() => setShowPassword(true)}></Eye>
                            )}
                          </div>
                          <p
                            className={`${styles.forgotText} mt-3`}
                            onClick={() => {
                              router.push("/auth/reset-password");
                            }}
                          >
                            Forgot password?
                          </p>
                          {err && <p className={`${styles.errorAuth} mt-3`}>{err}</p>}
                          <button type="submit" className={`${styles.loginButton} mt-5`}>
                            Login
                          </button>
                          <p className={`${styles.haveAccText} mt-5`}>
                            {" "}
                            Don't have an account? Let's{" "}
                            <span
                              className={`${styles.signUpText}`}
                              onClick={() => {
                                router.push("/auth/register");
                              }}
                            >
                              Sign Up
                            </span>
                          </p>
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

export default Login;
