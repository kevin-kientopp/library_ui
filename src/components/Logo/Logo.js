import React from "react";
import { Row } from "simple-flexbox";
import styles from "./Logo.module.css";
import LogoIcon from "../../assets/icon-logo";

const Logo = () => (
  <Row className={styles.container} horizontal="center" vertical="center">
    <LogoIcon />
    <span className={styles.title}>My Library</span>
  </Row>
);

export default Logo;
