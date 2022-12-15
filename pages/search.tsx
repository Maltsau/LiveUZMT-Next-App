import styled from "styled-components";
import { useState, useEffect } from "react";

import OperationButton from "../components/buttons/OperationButton";

type DataBaseType = [
  {
    year: number;
    months: [
      {
        month: string;
        wishfullAverageLength: number;
        planOps: number;
        ops: [
          {
            date: string;
            department: number;
            number: string;
            field: string;
            duration: number;
            result: [
              {
                isFinal: boolean;
                dateTime: string;
                debitMass: number;
                density: number;
                watterRate: number;
                files?: [string];
              }
            ];
          }
        ];
      }
    ];
  }
];

const WrapperAllContent = styled.div`
  width: 100%;
`;

const InputStyled = styled.input`
  width: -webkit-fill-available;
  min-height: 50px;
  font-size: 1.2em;
  margin: 5px;
  padding: 0px 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

const ResultContainer = styled.div`
  margin: 5px 2px;
  border: 2px red solid;
  min-height: 300px;
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

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [dataBase, setDataBase] = useState<DataBaseType | []>([]);
  const [operation, setOperation] = useState<string | undefined>("");

  useEffect(() => {
    (async function () {
      const response = await fetch("/api/dataBaseApi");
      const responseData = await response.json();
      setDataBase(responseData);
    })();
  }, []);

  const searchBase = dataBase.flatMap((yearItem: any) => {
    return yearItem.months.flatMap((monthItem: any) => {
      return monthItem.ops.flatMap((opsItem: any) => {
        return {
          year: Number(yearItem.year),
          month: monthItem.month,
          date: opsItem.date,
          index: opsItem.number + " " + opsItem.field,
        };
      });
    });
  });

  const result = searchBase
    .filter((item) => item.index.includes(search) && search.length > 0)
    .map((operation) => {
      return {
        year: operation.year,
        month: operation.month,
        date: operation.date,
      };
    });

  const outputArray = result.flatMap((resultItem) => {
    return dataBase
      .filter((yearItem) => {
        return yearItem.year === resultItem.year;
      })
      .flatMap((monthItem) => {
        return monthItem.months;
      })
      .filter((monthItem) => {
        return monthItem.month === resultItem.month;
      })
      .flatMap((monthItem) => {
        return monthItem.ops;
      })
      .find((opsItem) => {
        return opsItem.date === resultItem.date;
      });
  });

  return (
    <WrapperAllContent>
      <InputStyled
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></InputStyled>
      <ResultContainer>
        {outputArray.map((item, index) => {
          return (
            <OperationButton
              onClick={() => {
                setOperation(item?.date);
              }}
              onSecondClick={() => {
                setOperation("");
              }}
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
                    {item?.result.map((result: any) => {
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
              isHighlighted={item?.date === operation}
              isCurrent={
                !item?.result
                  .map((res: any) => {
                    return res.isFinal;
                  })
                  .includes(true)
              }
              text={`${index + 1}.  ${item?.date}  ${item?.number}  ${
                item?.field
              } `}
            ></OperationButton>
          );
        })}
      </ResultContainer>
    </WrapperAllContent>
  );
}
