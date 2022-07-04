import styles from "styles/Dashboard.module.css";
import { DashLayout } from "component/DashLayout";
import Loading from "component/Sub/Loading";
import { useSelector } from "react-redux";
import { Eye, EyeSlash, Lock } from "react-bootstrap-icons";
import axios from "axios";
import { useState } from "react";
import ToastMessage from "component/Sub/Toast";
import { useRouter } from "next/router";

const EditPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [password, setPassword] = useState({
    current: null,
    newPass: null,
    confirm: null,
  });

  const router = useRouter();

  const { id, token } = useSelector((state) => state.persist.user.userInfo);
  const updatePassword = () => {
    setLoading(true);
    setError(null);

    const { current, newPass, confirm } = password;
    if (newPass !== confirm) {
      setLoading(false);
      setError("Password not match");
      return;
    }

    const body = {
      oldPassword: current,
      newPassword: newPass,
      confirmPassword: confirm,
    };
    axios
      .patch(`${process.env.API_HOST}/user/password/${id}`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        setLoading(false);
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

      <DashLayout title={"Zwallet - Edit Profile Password"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashPhone}`}>
              <div className="row mt-0 m-5 mb-2 pt-4 p-3 ps-0">
                <div className="col-md-12 p-0">
                  <h2 className={`${styles.historyTitle} mt-2`}>Change Password</h2>
                  <p className={`${styles.profileDesc} mt-4`}>
                    You must enter your current password <br /> and then type your new password twice.
                  </p>
                </div>
              </div>
              <div className="row mt-0 m-5 mb-2 pt-5 p-3 ps-0 text-center">
                <div className="col-md-4"></div>
                <div className="col-md-4 p-0 d-flex flex-column">
                  <div className={`${styles.inputLogin} d-flex justify-content-between align-items-center `}>
                    <span>
                      <Lock color="#a9a9a9cc" size={20} />
                      <input
                        type={showPassword.current ? "text" : "password"}
                        name="phone_number"
                        className={`${styles.inputPhone} ms-2`}
                        required
                        placeholder="Current Password"
                        onChange={(e) => {
                          setError(null);

                          setPassword({ ...password, current: e.target.value });
                        }}
                      />
                    </span>

                    {showPassword.current ? (
                      <EyeSlash size={20} color="#a9a9a9cc" className={styles.eyePass} onClick={() => setShowPassword({ ...showPassword, current: false })}></EyeSlash>
                    ) : (
                      <Eye size={20} className={styles.eyePass} color="#a9a9a9cc" onClick={() => setShowPassword({ ...showPassword, current: true })}></Eye>
                    )}
                  </div>
                  <div className={`${styles.inputLogin} d-flex mt-5 justify-content-between align-items-center `}>
                    <span>
                      <Lock color="#a9a9a9cc" size={20} />
                      <input
                        type={showPassword.newPass ? "text" : "password"}
                        name="phone_number"
                        className={`${styles.inputPhone} ms-2`}
                        required
                        placeholder="New Password"
                        onChange={(e) => {
                          setError(null);

                          setPassword({ ...password, newPass: e.target.value });
                        }}
                      />
                    </span>

                    {showPassword.newPass ? (
                      <EyeSlash size={20} color="#a9a9a9cc" className={styles.eyePass} onClick={() => setShowPassword({ ...showPassword, newPass: false })}></EyeSlash>
                    ) : (
                      <Eye size={20} color="#a9a9a9cc" className={styles.eyePass} onClick={() => setShowPassword({ ...showPassword, newPass: true })}></Eye>
                    )}
                  </div>
                  <div className={`${styles.inputLogin} d-flex mt-5 justify-content-between align-items-center `}>
                    <span>
                      <Lock color="#a9a9a9cc" size={20} />
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        name="phone_number"
                        className={`${styles.inputPhone} ms-2`}
                        required
                        placeholder="Repeat new Password"
                        onChange={(e) => {
                          setError(null);

                          setPassword({ ...password, confirm: e.target.value });
                        }}
                      />
                    </span>

                    {showPassword.confirm ? (
                      <EyeSlash size={20} color="#a9a9a9cc" className={styles.eyePass} onClick={() => setShowPassword({ ...showPassword, confirm: false })}></EyeSlash>
                    ) : (
                      <Eye size={20} color="#a9a9a9cc" className={styles.eyePass} onClick={() => setShowPassword({ ...showPassword, confirm: true })}></Eye>
                    )}
                  </div>
                  {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
                  <button className={`${styles.buttonPhone} mt-5`} onClick={updatePassword}>
                    Change Password
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

export default EditPassword;
