import styles from "styles/Dashboard.module.css";
import { DashLayout } from "component/DashLayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProfileDetail = () => {
  const router = useRouter();

  const user = useSelector((state) => state.persist.user.userDetail);

  return (
    <>
      <DashLayout title={"Zwallet - Profile Detail"}>
        <div className="col-md-8 my-5 ms-4">
          <div className="row justify-content-around">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="row mt-0 m-5 mb-2 pt-4 p-3 ps-0">
                <div className="col-md-12 p-0">
                  <h2 className={`${styles.historyTitle} mt-2`}>Personal Information</h2>
                  <p className={`${styles.profileDesc} mt-4`}>
                    We got your personal information from the sign up proccess. <br /> If you want to make changes on your information, <br /> contact our support.
                  </p>
                </div>
              </div>

              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 pb-2 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>First Name</h3>
                  <p className={`${styles.transName} mt-3`}>{user.firstName}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 pb-2 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Last Name</h3>
                  <p className={`${styles.transName} mt-3`}>{user.lastName}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 pb-2 ${styles.confirmTrans}`}>
                <div className="col-md-12">
                  <h3 className={`${styles.transStatus}`}>Verified E-mail</h3>
                  <p className={`${styles.transNameDisabled} mt-3`}>{user.email}</p>
                </div>
              </div>
              <div className={`row mt-0 m-5 mb-4 pt-4 p-3 pb-2 ${styles.confirmTrans}`}>
                <div className="col-md-8">
                  <h3 className={`${styles.transStatus}`}>Phone Number</h3>
                  <p className={`${styles.transName} mt-3`}>{user.noTelp ? "0" + user.noTelp : "No Phone Number"}</p>
                </div>
                <div className="col-md-4 text-end">
                  <p
                    className={`${styles.manageText} mt-3`}
                    onClick={() => {
                      router.push("/dashboard/profile/edit-phone");
                    }}
                  >
                    Manage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default ProfileDetail;
