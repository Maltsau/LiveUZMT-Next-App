import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useMutation } from "react-query";
import ky from "ky";

// import { useUserContext } from "../pages/context/UserContext";
import { useUserStore } from "../stores/useUserStore";
import { useMainStore } from "../stores/useMainStore";
import { useEditModeContext } from "../pages/context/EditModeContext";
import { useDeleteRecord } from "../hooks/useDeleteRecord";
import { useAddMonth } from "../hooks/useAddMonth";

import OperationButton from "./buttons/OperationButton";

import { DataBaseType, SingleMonthType } from "../types/types";
import CustomLink from "./buttons/CustomLink";

const Wraper = styled.div`
  margin: 1px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const OperationContainer = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  border-right: 2px solid red;
  border-left: 2px solid red;
  border-bottom: 2px solid red;
  min-height: 200px;
`;

const StatisticsContainer = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  border-right: 2px solid red;
  border-left: 2px solid red;
  border-bottom: 2px solid red;
  min-height: 100px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableRow = styled.tr`
  height: 20px;
`;

const Cell = styled.td`
  text-align: center;
  padding: 10px;
  border: solid black 1px;
`;

const DeleteButton = styled.button`
  border: 0;
  background-color: transparent;
`;

const Rectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 100%;
`;

const SmallRectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 30px;
`;

const StatisticTableContainer = styled.div`
  padding: 2px;
`;

const FileIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputStyled = styled.input`
  border: 1px solid red;
  border-radius: 5px;
  background-color: transparent;
  width: 30px;
  font-size: 1em;
`;

const ButtonStyled = styled.button`
  position: absolute;
  top: 350px;
  right: 50px;
  font-size: 1.2em;
  background-color: red;
  color: white;
  margin: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

export default function MonthTable({ db }: { db: DataBaseType | undefined }) {
  const user = useUserStore();
  const { year, month, operation, setOperation } = useMainStore();
  const { isEditMode, setIsEditMode } = useEditModeContext();
  const { mutate: deleteOperation } = useDeleteRecord();
  const [mode, setMode] = useState("opeartions");

  const currentMonth =
    db!
      .find((yearItem) => yearItem.year === year)
      ?.months?.find((monthItem) => monthItem.month === month) ?? ({} as any);

  const {
    month: mnth,
    wishfullAverageLength,
    planOps,
    ops: currentMonthOps,
  } = currentMonth;

  const [newPlanOps, setNewPlanOps] = useState(planOps);
  const [newWishfullAverageLength, setNewWishfullAverageLength] = useState(
    wishfullAverageLength
  );

  const { mutate: changeMonth } = useAddMonth();

  const factOps1: number = currentMonthOps?.filter(
    (elem: any) => elem.department === 1
  ).length;
  const factOps2: number = currentMonthOps?.filter(
    (elem: any) => elem.department === 2
  ).length;

  const factHrs1: number = currentMonthOps
    ?.filter((elem: any) => elem.department === 1)
    .reduce((sum: number, elem: any) => {
      if (elem.duration) {
        return sum + elem.duration;
      } else return sum;
    }, 0);
  const factHrs2: number = currentMonthOps
    ?.filter((elem: any) => elem.department === 2)
    .reduce((sum: number, elem: any) => {
      if (elem.duration) {
        return sum + elem.duration;
      } else return sum;
    }, 0);

  const handleSaveChanges = () => {
    changeMonth({
      year,
      month,
      planOps: newPlanOps,
      wishfullAverageLength: newWishfullAverageLength,
    });
    setIsEditMode(false);
  };

  const buttons = currentMonthOps?.map((element: any, index: number) => {
    return (
      <OperationButton
        isEditMode={isEditMode}
        operation={element}
        onDeleteOperation={() => {
          deleteOperation({ id: element.id, year, month });
        }}
        onDeleteRecord={(dateTime) => {
          deleteOperation({
            id: element.id,
            year,
            month,
            dateTime,
          });
        }}
        isDeleteble={user?.user.role === "ADMIN" && isEditMode}
        onClick={() => {
          setOperation(element.id);
        }}
        onSecondClick={() => {
          setOperation("");
        }}
        isCurrent={
          !element.result
            .map((res: any) => {
              return res.isFinal;
            })
            .includes(true)
        }
        key={element.id}
        isHighlighted={element.id === operation}
        text={`${index + 1}.  ${element.date}  ${element.number}  ${
          element.field
        } `}
      ></OperationButton>
    );
  });

  return (
    <Wraper>
      <Container>
        <SmallRectangle />
        <CustomLink
          text={"Oперации"}
          isHighlighted={mode === "opeartions"}
          onClick={() => {
            setMode("opeartions");
          }}
        ></CustomLink>
        <CustomLink
          text={"Статистика"}
          isHighlighted={mode === "statistics"}
          onClick={() => {
            setMode("statistics");
          }}
        ></CustomLink>
        <Rectangle />
      </Container>
      <OperationContainer isVisible={mode === "opeartions"}>
        {buttons}
      </OperationContainer>
      <StatisticsContainer isVisible={mode === "statistics"}>
        <StatisticTableContainer>
          <Table>
            <tbody>
              <TableRow>
                <Cell colSpan={2}>Месяц, год</Cell>
                <Cell>
                  {month} {year}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell colSpan={2}>План, операций</Cell>
                {user?.user.role === "ADMIN" && isEditMode ? (
                  <Cell>
                    <InputStyled
                      value={String(newPlanOps)}
                      placeholder={planOps}
                      onChange={(e) => {
                        setNewPlanOps(e.target.value);
                      }}
                    ></InputStyled>
                  </Cell>
                ) : (
                  <Cell>{planOps}</Cell>
                )}
              </TableRow>
              <TableRow>
                {user?.user.role === "ADMIN" && isEditMode ? (
                  <Cell colSpan={2}>
                    План, часов <br /> (при планируемой средней
                    продолжительности операции{" "}
                    <InputStyled
                      value={String(newWishfullAverageLength)}
                      placeholder={wishfullAverageLength}
                      onChange={(e) => {
                        setNewWishfullAverageLength(e.target.value);
                      }}
                    ></InputStyled>{" "}
                    часов)
                  </Cell>
                ) : (
                  <Cell colSpan={2}>
                    План, часов <br /> (при планируемой средней
                    продолжительности операции {wishfullAverageLength} часов)
                  </Cell>
                )}

                <Cell>{planOps * wishfullAverageLength}</Cell>
              </TableRow>
              <TableRow>
                <Cell rowSpan={3}>Факт, операций</Cell>
                <Cell>Общий</Cell>
                <Cell>{factOps1 + factOps2}</Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-1</Cell>
                <Cell>{factOps1}</Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-2</Cell>
                <Cell>{factOps2}</Cell>
              </TableRow>
              <TableRow>
                <Cell rowSpan={3}>Факт, часов</Cell>
                <Cell>Общий</Cell>
                <Cell>{factHrs1 + factHrs2}</Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-1</Cell>
                <Cell>{factHrs1}</Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-2</Cell>
                <Cell>{factHrs2}</Cell>
              </TableRow>
              <TableRow>
                <Cell rowSpan={3}>
                  Средняя продолжительность операции, час/операция
                </Cell>
                <Cell>Общая</Cell>
                <Cell>
                  {Math.round(
                    ((factHrs1 + factHrs2) / (factOps1 + factOps2)) * 100
                  ) / 100 || 0}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-1</Cell>
                <Cell>
                  {Math.round((factHrs1 / factOps1) * 100) / 100 || 0}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell>ЦДНГ-2</Cell>
                <Cell>
                  {Math.round((factHrs2 / factOps2) * 100) / 100 || 0}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell rowSpan={3}>Осталось</Cell>
                <Cell>Операций</Cell>
                <Cell>{planOps - factOps1 - factOps2}</Cell>
              </TableRow>
              <TableRow>
                <Cell>Часов</Cell>
                <Cell>
                  {planOps * wishfullAverageLength - (factHrs1 + factHrs2)}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell>Часов/операция</Cell>
                <Cell>
                  {Math.round(
                    ((planOps * wishfullAverageLength - (factHrs1 + factHrs2)) /
                      (planOps - factOps1 - factOps2)) *
                      100
                  ) / 100}
                </Cell>
              </TableRow>
            </tbody>
          </Table>
          {user?.user.role === "ADMIN" && isEditMode ? (
            <ButtonStyled onClick={handleSaveChanges}>
              Сохранить изменения
            </ButtonStyled>
          ) : null}
        </StatisticTableContainer>
      </StatisticsContainer>
    </Wraper>
  );
}
