import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import now from "../services/now";

import YearPannel from "../components/YearPannel";
import { useState } from "react";

export default function Home() {
  const [year, setYear] = useState(now.getFullYear());

  const onYearChange = () => {
    setYear(year);
  };
  return (
    <div>
      <YearPannel year={year} onChange={onYearChange}></YearPannel>
    </div>
  );
}
