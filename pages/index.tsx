import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useDataBase } from "../hooks/useDataBase";
import { useMainStore } from "../stores/useMainStore";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";
import LoaderModal from "../components/modalWindows/LoaderModal";
import ErrorModal from "../components/modalWindows/ErrorModal";

const Wraper = styled.div`
  width: 100%;
`;

const InnerWraper = styled.div`
  margin: 1px 1px 1px 1px;
  border: 2px solid #3c3e3f;
`;

// const AdninPannel = styled.div<{
//   isVisible: boolean;
// }>`
//   display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
//   flex-direction: row-reverse;
//   padding: 3px;
// `;

// const ButtonStyled = styled.button`
//   font-size: 1.2em;
//   background-color: red;
//   color: white;
//   border: solid red 1px;
//   border-radius: 5px;
// `;

export default function Home() {
  const [isErrorVisible, setIserrorVisible] = useState(false);

  const mainStore = useMainStore();

  const { isLoading, data, isError, error } = useDataBase({});

  // function onError(error: any) {
  //   console.log(error);
  // }

  // function onSuccess(data: any) {
  //   console.log("onSuccess", data);
  // }

  // const handleYearChange = useCallback(
  //   (year: number) => {
  //     mainStore.setYear(year);
  //     console.log("HandleYearChange", mainStore.year);
  //   },
  //   [mainStore.setYear]
  // );

  // const handleMonthChange = useCallback(
  //   (month: string) => {
  //     mainStore.setMonth(month);
  //     console.log("HandleMonthChange", mainStore.month);
  //   },
  //   [mainStore.setMonth]
  // );

  console.log("index", mainStore.year, mainStore.month);

  if (isLoading) return <LoaderModal text="Загружается база данных..." />;

  if (isError)
    return (
      <ErrorModal
        isVisible={true}
        onClose={() => {
          setIserrorVisible(false);
        }}
      ></ErrorModal>
    );

  return (
    <Wraper>
      <InnerWraper>
        <YearPannel db={data}></YearPannel>
        <MonthPannel db={data}></MonthPannel>
        <MonthTable db={data}></MonthTable>
      </InnerWraper>
    </Wraper>
  );
}
