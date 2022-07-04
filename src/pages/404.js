import { useRouter } from "next/router";
import React from "react";
import styles from "styles/NotFound.module.css";

const NotFound = () => {
  const router = useRouter();
  return (
    <section class={styles.notfound}>
      <div class="container-fluid">
        <div class="row text-center">
          <div class="col-md-12">
            <h1 class={styles.pageTitle}>404</h1>
            <h2>Whoops....</h2>
            <p>Page you're looking for not found.</p>
            <button
              class={`${styles.upcomingButton} w-50 mb-5`}
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
