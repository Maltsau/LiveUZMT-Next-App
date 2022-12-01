import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import now from "../services/now";
import { useState, useCallback, useEffect } from "react";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";

export default function Home() {
  const [dataBase, setDataBase] = useState([]);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("ru", { month: "long" })
  );

  useEffect(() => {
    (async function () {
      const response = await fetch("/api/dataBase");
      const responseData = await response.json();
      setDataBase(responseData);
    })();
  }, []);

  const handleYearChange = useCallback(
    (year: number) => {
      setYear(year);
    },
    [setYear]
  );

  const handleMonthChange = useCallback(
    (month: string) => {
      setMonth(month);
    },
    [setMonth]
  );

  return (
    <div>
      <YearPannel
        db={dataBase}
        year={year}
        onChange={handleYearChange}
      ></YearPannel>
      <MonthPannel
        year={year}
        month={month}
        onChange={handleMonthChange}
        db={dataBase}
      ></MonthPannel>
      <MonthTable db={dataBase} year={year} month={month}></MonthTable>
    </div>
  );
}
