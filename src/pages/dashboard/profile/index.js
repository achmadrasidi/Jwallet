import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useState } from "react";
import Loading from "component/Sub/Loading";
import { ArrowRight, FileEarmarkArrowDown, Pencil } from "react-bootstrap-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "reduxStore/Actions/UserAction";
import { useRouter } from "next/router";
import Logout from "component/Sub/Logout";
import ToastMessage from "component/Sub/Toast";

const Profile = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { id, token } = useSelector((state) => state.persist.user.userInfo);
  const user = useSelector((state) => state.persist.user.userDetail);

  const handleFoto = (e) => {
    let reader = false;

    e.preventDefault();
    setError(null);

    const files = e.target.files[0];

    setFile(files);
    const imageType = /image\/(png|jpg|jpeg)/i;
    if (files) {
      reader = new FileReader();
      reader.onload = (ev) => {
        const { result } = ev.target;
        if (!!result) setFileUrl(result);
      };
    }
    if (!files) {
      setError("No File Selected");
      return;
    }
    if (!files.type.match(imageType)) {
      setError("Invalid image type (png,jpg,jpeg)");
      return;
    }
    reader.readAsDataURL(files);
  };

  const updateFoto = () => {
    setLoading(true);
    setError(null);
    const body = {
      image: file,
    };

    axios
      .patch(`${process.env.API_HOST}/user/image/${id}`, body, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
      .then((result) => {
        setLoading(false);
        setFileUrl(null);
        dispatch(userDetail());
        ToastMessage({ type: "success", message: result.data.msg });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };

  return (
    <>
      <Logout show={showLogout} setShow={setShowLogout} onClose={() => setShowLogout(false)} />
      {loading && <Loading />}

      <DashLayout title={"Zwallet - Profile"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`${styles.midContentDashBot} col-md-12`}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className={`col-md-4 text-center py-5`}>
                  <label htmlFor="foto">
                    {fileUrl && !error ? (
                      <Image src={fileUrl} className={`${styles.imageDash}`} width={150} height={150} />
                    ) : (
                      <Image src={user.image ? `${process.env.CLOUDINARY_URL}${user.image}` : require("assets/img/default-img.webp")} className={`${styles.imageDash}`} width={150} height={150} />
                    )}
                  </label>
                  <input type="file" required className="foto-input" name="foto" id="foto" onChange={handleFoto} hidden></input>
                  <br />

                  {fileUrl && !error ? (
                    <span className={`${styles.editText}`} onClick={updateFoto}>
                      <FileEarmarkArrowDown />
                      &nbsp;Save
                    </span>
                  ) : (
                    <label htmlFor="foto">
                      <span className={`${styles.editText} `} html>
                        <Pencil size={20} color="#7A7886" className={`${styles.editText}`} />
                        &nbsp;Edit
                      </span>
                    </label>
                  )}
                  {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}

                  <h2 className={`${styles.nameText} mt-4`}>{`${user.firstName} ${user.lastName}`}</h2>
                  <p className={`${styles.phoneText} mt-2`}>{user.noTelp ? "0" + user.noTelp : "No Phone Number"}</p>
                  <div className="d-flex flex-column">
                    <div
                      className={`${styles.profileButton} p-4 mt-4 d-flex align-items-center justify-content-between`}
                      onClick={() => {
                        router.push("/dashboard/profile/detail");
                      }}
                    >
                      Personal Information <ArrowRight size={30} />
                    </div>
                    <div
                      className={`${styles.profileButton} p-4 mt-4 d-flex align-items-center justify-content-between`}
                      onClick={() => {
                        router.push("/dashboard/profile/edit-pass");
                      }}
                    >
                      Change Password <ArrowRight size={30} />
                    </div>
                    <div
                      className={`${styles.profileButton} p-4 mt-4 d-flex align-items-center justify-content-between`}
                      onClick={() => {
                        router.push("/dashboard/profile/edit-pin");
                      }}
                    >
                      Change PIN <ArrowRight size={30} />
                    </div>
                    <div
                      className={`${styles.profileButton} p-4 mt-4 d-flex align-items-center justify-content-start`}
                      onClick={() => {
                        setShowLogout(true);
                      }}
                    >
                      Logout
                    </div>
                  </div>
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

export default Profile;
