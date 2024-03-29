import { useState } from "react";
import styled from "styled-components";

import OperationButton from "./buttons/OperationButton";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  padding: 2px;
  margin: 0px 2px 2px 2px;
`;

const Container = styled.div`
  width: 100%;
  margin: 2px;
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

export default function MonthTable({
  db,
  year,
  month,
}: {
  db: any;
  year: number;
  month: string;
}) {
  const [operation, setOperation] = useState("");
  const [statisticVisible, setStatisticVisible] = useState(false);

  const currentMonth =
    db
      .find((yearItem: any) => yearItem.year === year)
      ?.months.find((monthItem: any) => monthItem.month === month) ??
    ({} as any);

  const {
    month: mnth,
    wishfullAverageLength,
    planOps,
    ops: currentMonthOps,
  } = currentMonth;

  const factOps1: number = currentMonthOps.filter(
    (elem: any) => elem.department === 1
  ).length;
  const factOps2: number = currentMonthOps.filter(
    (elem: any) => elem.department === 2
  ).length;

  const factHrs1: number = currentMonthOps
    .filter((elem: any) => elem.department === 1)
    .reduce((sum: number, elem: any) => {
      return sum + elem.duration;
    }, 0);
  const factHrs2: number = currentMonthOps
    .filter((elem: any) => elem.department === 2)
    .reduce((sum: number, elem: any) => {
      return sum + elem.duration;
    }, 0);

  const buttons = currentMonthOps.map((element: any, index: number) => {
    return (
      <OperationButton
        onClick={() => {
          setOperation(element.date);
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
                  <TableRow key={result.dateTime}>
                    <Cell>{result.dateTime}</Cell>
                    <Cell>{result.debitMass}</Cell>
                    <Cell>{result.density}</Cell>
                    <Cell>{result.watterRate}</Cell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        }
        key={element.date}
        isHighlighted={element.date === operation}
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
