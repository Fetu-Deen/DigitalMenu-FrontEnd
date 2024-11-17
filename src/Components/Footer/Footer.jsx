import React from "react";
import styles from "./Footer.module.css"; // Importing the CSS Module

export default function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <h3>Contact Us</h3>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Email:</strong> info@evangadi.com
          </p>
          <p>
            <strong>Location:</strong> 123 Main St, City, Country
          </p>
        </div>
        <div className={styles.contactMethods}>
          <h3>Get in Touch</h3>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Telegram:</strong> @YourTelegramHandle
          </p>
          <p>
            <strong>Email:</strong> info@evangadi.com
          </p>
        </div>
      </footer>
      <div className={styles.developerCredit}>
        <p>
          Developed by:
          <a
            style={{ textDecoration: "none" }}
            href="https://fetudev-portfolio.netlify.app/"
            target="_blank"
          >
            {" "}
            Moonlight Tech Solutions
          </a>
        </p>
      </div>
    </div>
  );
}
