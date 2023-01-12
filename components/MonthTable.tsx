import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useMutation } from "react-query";
import ky from "ky";

import { useUserContext } from "../pages/context/UserContext";
import { useEditModeContext } from "../pages/context/EditModeContext";
import { useDeleteRecord } from "../hooks/useDeleteRecord";

import OperationButton from "./buttons/OperationButton";

import { DataBaseType } from "../types/types";

const Wraper = styled.div`
  display: grid;
  margin: 1px;
  grid-template-columns: 1fr 1fr;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2px;
  padding: 1px;
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

export default function MonthTable({
  db,
  year,
  month,
}: {
  db: DataBaseType | undefined;
  year: number;
  month: string;
}) {
  const [operation, setOperation] = useState("");
  const [statisticVisible, setStatisticVisible] = useState(false);
  const { user } = useUserContext();
  const { isEditMode } = useEditModeContext();
  const { mutate: deleteOperation } = useDeleteRecord();

  // const { mutate: deleteOperation, mutateAsync: deleteOperationAsync } =
  //   useMutation(
  //     "DELETE_RECORD",
  //     async ({
  //       id,
  //       year,
  //       month,
  //       dateTime,
  //     }: {
  //       id: string;
  //       year: number;
  //       month: string;
  //       dateTime?: string;
  //     }) => {
  //       const res = await ky
  //         .delete("/api/dataBaseApi", {
  //           json: { id, year, month, dateTime },
  //         })
  //         .json<{ message: string }>();
  //       return res;
  //     }
  //   );

  const currentMonth =
    db!
      .find((yearItem: any) => yearItem.year === year)
      ?.months?.find((monthItem: any) => monthItem.month === month) ??
    ({} as any);

  const {
    month: mnth,
    wishfullAverageLength,
    planOps,
    ops: currentMonthOps,
  } = currentMonth;

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

  const buttons = currentMonthOps?.map((element: any, index: number) => {
    return (
      <OperationButton
        onDeleteOperation={() => {
          deleteOperation({ id: element.id, year, month });
        }}
        isDeleteble={user?.role === "ADMIN" && isEditMode}
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
        table={
          <Table>
            <thead>
              <TableRow>
                <Cell>Дата, время</Cell>
                <Cell>Дебит, т/сут</Cell>
                <Cell>
                  Плотность <br></br> жидкости, <br></br> кг/м<sup>3</sup>
                </Cell>
                <Cell>
                  Обводнён-<br></br>ность, <br></br> %
                </Cell>
              </TableRow>
            </thead>
            <tbody>
              {element.result.map((result: any) => {
                return (
                  <TableRow
                    key={result.dateTime + result.number + result.field}
                  >
                    <Cell>{result.dateTime}</Cell>
                    <Cell>{result.debitMass}</Cell>
                    <Cell>{result.density}</Cell>
                    <Cell>
                      {result.watterRate}
                      {user?.role === "ADMIN" && isEditMode ? (
                        <DeleteButton
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOperation({
                              id: element.id,
                              year,
                              month,
                              dateTime: result.dateTime,
                            });
                          }}
                        >
                          <Image
                            src="/delete.png"
                            height={20}
                            width={20}
                            alt="DELETE"
                          />
                        </DeleteButton>
                      ) : null}
                    </Cell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
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
      <Container>{buttons}</Container>
      <Container>
        <OperationButton
          isDeleteble={false}
          isCurrent={false}
          onClick={() => {
            setStatisticVisible(true);
          }}
          onSecondClick={() => {
            setStatisticVisible(false);
          }}
          text="Статистика за месяц"
          isHighlighted={statisticVisible}
          table={
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
                  <Cell>{planOps}</Cell>
                </TableRow>
                <TableRow>
                  <Cell colSpan={2}>
                    План, часов <br /> (при планируемой средней
                    продолжительности операции {wishfullAverageLength} часов)
                  </Cell>
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
                      ((planOps * wishfullAverageLength -
                        (factHrs1 + factHrs2)) /
                        (planOps - factOps1 - factOps2)) *
                        100
                    ) / 100}
                  </Cell>
                </TableRow>
              </tbody>
            </Table>
          }
        />
      </Container>
    </Wraper>
  );
}
