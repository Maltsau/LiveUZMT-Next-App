import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useDataBase } from "../hooks/useDataBase";
import { useDataBaseStore } from "../stores/useDataBaseStore";

import YearPannel from "../components/YearPannel";
import MonthPannel from "../components/MonthPannel";
import MonthTable from "../components/MonthTable";
import LoaderModal from "../components/modalWindows/LoaderModal";
import ErrorDialog from "../components/modalWindows/ErrorDialog";

const Wraper = styled.div`
  width: 100%;
`;

const InnerWraper = styled.div`
  margin: 1px 1px 1px 1px;
  border: 2px solid #3c3e3f;
`;

export default function Home() {
  const [isErrorVisible, setIserrorVisible] = useState(false);

  const dataBase = useDataBaseStore();

  const { isLoading, data, isError, error } = useDataBase({});

  if (isLoading) return <LoaderModal text="Загружается база данных..." />;

  if (isError)
    return (
      <ErrorDialog
        isVisible={isError}
        onClose={() => {
          setIserrorVisible(false);
        }}
        message="Что-то пошло не так. Обновите страницу."
      ></ErrorDialog>
    );

  return (
    <Wraper>
      <InnerWraper>
        <YearPannel></YearPannel>
        <MonthPannel></MonthPannel>
        <MonthTable></MonthTable>
      </InnerWraper>
    </Wraper>
  );
}
