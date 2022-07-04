import { useRouter } from "next/router";
import React from "react";
import styles from "styles/NotFound.module.css";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className={styles.notfound}>
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-12">
            <h1 className={styles.pageTitle}>404</h1>
            <h2>Whoops....</h2>
            <p>Page you&apos;re looking for not found.</p>
            <button
              className={`${styles.upcomingButton} w-50 mb-5`}
              onClick={() => {
                router.push("/");
              }}
            >
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
