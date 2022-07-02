import styles from "styles/Auth.module.css";
import { Envelope, Eye, EyeSlash, Lock, Person } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { AuthLayout } from "component/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetState, userRegister } from "reduxStore/Actions/UserAction";
import Loading from "component/Sub/Loading";
import ToastMessage from "component/Sub/Toast";

const Register = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, isSuccess, errorRegister } = useSelector((state) => state.userRegist);
  useEffect(() => {
    setError(null);
    if (isSuccess) {
      ToastMessage({ type: "success", message: "Register Success,Please check email for verification" });
      dispatch(resetState());
      router.push("/auth/login");
      return;
    }
    if (errorRegister) {
      setError(errorRegister);
    }
  }, [isSuccess, errorRegister]);
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const password = e.target.password.value;
    if (!email.match(emailFormat)) {
      setError("Invalid Email Format");
      return;
    }
    const body = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(userRegister(body));
  };
  return (
    <>
      {loading && <Loading />}
      <main>
        <div className="container-fluid">
          <div className="row">
            <AuthLayout title={"Zwallet - Register"}>
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
                          onSubmit={submitHandler}
                          onChange={() => {
                            setError(null);
                          }}
                          className="d-flex flex-column mt-5"
                        >
                          <div className={`${styles.inputLogin} d-flex gap-2 `}>
                            <Person size={30} color="#a9a9a9cc" />
                            <input type="text" name="firstName" required className={`${styles.inputLogin} p-0 border-0 `} placeholder="Enter your firstname" />
                          </div>
                          <div className={`${styles.inputLogin} d-flex gap-2 mt-5`}>
                            <Person size={30} color="#a9a9a9cc" />
                            <input type="text" required name="lastName" className={`${styles.inputLogin} p-0 border-0`} placeholder="Enter your lastname" />
                          </div>
                          <div className={`${styles.inputLogin} d-flex gap-2 mt-5`}>
                            <Envelope size={30} color="#a9a9a9cc" />
                            <input type="text" required name="email" className={`${styles.inputLogin} p-0 border-0`} placeholder="Enter your e-mail" />
                          </div>
                          <div className={`${styles.inputLogin} d-flex justify-content-between mt-5 align-items-center`}>
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

                          {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                          <button type="submit" className={`${styles.loginButton} mt-5`}>
                            Sign Up
                          </button>
                          <p className={`${styles.haveAccText} mt-5`}>
                            Already have an account? Let's
                            <span
                              className={`${styles.signUpText}`}
                              onClick={() => {
                                dispatch(resetState());
                                setError(null);
                                router.push("/auth/login");
                              }}
                            >
                              &nbsp;Login
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

export default Register;
