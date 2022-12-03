import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import now from "../services/now";
import MONTH_MAP from "../services/monthMap";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";

const Wraper = styled.div`
  width: 100%;
`;

export default function Home({ userBase }: { userBase: any }) {
  const [dataBase, setDataBase] = useState([]);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState([...MONTH_MAP.values()][now.getMonth()]);

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
    <Wraper>
      <div>{JSON.stringify(userBase)}</div>
      <YearPannel
        db={dataBase}
        year={year}
        onChange={handleYearChange}
      ></YearPannel>
      <MonthPannel
        db={dataBase}
        year={year}
        month={month}
        onChange={handleMonthChange}
      ></MonthPannel>
      <MonthTable db={dataBase} year={year} month={month}></MonthTable>
    </Wraper>
  );
}
