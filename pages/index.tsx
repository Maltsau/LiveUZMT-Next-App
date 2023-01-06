import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useUserContext } from "./context/UserContext";
import { useMutation, useQuery } from "react-query";
import ky from "ky";

import { useDataBase } from "../hooks/useDataBase";

import now from "../services/now";
import MONTH_MAP from "../services/monthMap";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";
import ModalWindow from "../components/modalWindows/ModalWindow";
import LoaderModal from "../components/modalWindows/LoaderModal";

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

  // useEffect(() => {
  //   (async function () {
  //     const response = await fetch("/api/dataBaseApi", { method: "GET" });
  //     const responseData = await response.json();
  //     setDataBase(responseData);
  //   })();
  // }, []);

  const onError = (error: any) => {
    console.log(error);
  };

  const onSuccess = (data: any) => {
    console.log(data);
  };

  const { isLoading, data, isError, error } = useDataBase({
    onError,
    onSuccess,
  });

  // console.log(JSON.stringify(data));
  // console.dir(error);

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

  if (isLoading) return <LoaderModal />;

  if (isError)
    return (
      <ModalWindow isVisible={true} onClose={() => {}}>
        <h1>{`error`}</h1>
      </ModalWindow>
    );

  return (
    <Wraper>
      <InnerWraper>
        <YearPannel
          db={data}
          year={year}
          onChange={handleYearChange}
        ></YearPannel>
        <MonthPannel
          db={data}
          year={year}
          month={month}
          onChange={handleMonthChange}
        ></MonthPannel>
        <MonthTable db={data} year={year} month={month}></MonthTable>
      </InnerWraper>
    </Wraper>
  );
}
