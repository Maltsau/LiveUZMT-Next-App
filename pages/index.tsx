import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useUserContext } from "./context/UserContext";
// import { getDataBase } from "../dataBase/DataBase";
// import getUserBase from "../dataBase/UserBase";
// import { data } from "../dataBase/DataBase";

import now from "../services/now";
import MONTH_MAP from "../services/monthMap";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";

const Wraper = styled.div`
  width: 100%;
`;

const InnerWraper = styled.div`
  margin: 1px 1px 1px 1px;
  border: 2px solid red;
`;

const AdninPannel = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  flex-direction: row-reverse;
  padding: 3px;
`;

const ButtonStyled = styled.button`
  font-size: 1.2em;
  background-color: red;
  color: white;
  border: solid red 1px;
  border-radius: 5px;
`;

export default function Home({ userBase }: { userBase: any }) {
  const [dataBase, setDataBase] = useState([]);
  const [userDataBase, setUserDataBase] = useState([]);
  const { user, setUser } = useUserContext();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState([...MONTH_MAP.values()][now.getMonth()]);

  useEffect(() => {
    (async function () {
      const response = await fetch("/api/dataBaseApi", { method: "GET" });
      const responseData = await response.json();
      setDataBase(responseData);
    })();
  }, []);

  // useEffect(() => {
  //   (function () {
  //     setUserDataBase(getUserBase());
  //   })();
  // }, []);

  // useEffect(() => {
  //   (function () {
  //     const base = getDataBase();
  //     setDataBase(base);
  //   })();
  // }, []);

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
      <InnerWraper>
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
      </InnerWraper>
    </Wraper>
  );
}
