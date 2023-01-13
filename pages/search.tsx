import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useDataBase } from "../hooks/useDataBase";
import { useEditModeContext } from "./context/EditModeContext";
import { useDeleteRecord } from "../hooks/useDeleteRecord";

import OperationButton from "../components/buttons/OperationButton";
import LoaderModal from "../components/modalWindows/LoaderModal";
import ErrorModal from "../components/modalWindows/ErrorModal";

import { DataBaseType } from "../types/types";
import { useUserContext } from "./context/UserContext";

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

const DeleteButton = styled.button`
  border: 0;
  background-color: transparent;
`;

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [operation, setOperation] = useState("");

  const { isEditMode } = useEditModeContext();
  const { user } = useUserContext();
  const { isLoading, data, isError, error } = useDataBase({});
  const { mutate: deleteOperation } = useDeleteRecord();
  const [isErrorVisible, setIserrorVisible] = useState(false);

  if (isLoading) return <LoaderModal text="Fetching data..." />;

  if (isError)
    return (
      <ErrorModal
        isVisible={true}
        onClose={() => {
          setIserrorVisible(false);
        }}
      ></ErrorModal>
    );

  const searchBase = data?.flatMap((yearItem: any) => {
    return yearItem.months?.flatMap((monthItem: any) => {
      return monthItem.ops?.flatMap((opsItem: any) => {
        return {
          year: Number(yearItem.year),
          month: monthItem.month,
          date: opsItem.date,
          index: (
            opsItem.date +
            " " +
            opsItem.number +
            " " +
            opsItem.field
          ).toLowerCase(),
        };
      });
    });
  });

  const result = searchBase
    ?.filter(
      (item: any) =>
        item?.index.includes(search.toLowerCase()) && search.length > 0
    )
    .map((operation: any) => {
      return {
        year: operation.year,
        month: operation.month,
        date: operation.date,
        index: operation.index,
      };
    });

  const outputArray = result?.flatMap((resultItem: any) => {
    return data
      ?.filter((yearItem: any) => {
        return yearItem.year === resultItem.year;
      })
      ?.flatMap((monthItem: any) => {
        return monthItem.months;
      })
      ?.filter((monthItem: any) => {
        return monthItem.month === resultItem.month;
      })
      ?.flatMap((monthItem: any) => {
        return monthItem.ops;
      })
      ?.find((opsItem: any) => {
        console.log("index", resultItem.index);
        return opsItem.id?.toLowerCase() === resultItem.index;
      });
  });

  const getRecordYear = (result: any, item: any) => {
    const year = result?.find((element: any) => {
      element.date === item.date;
      return element.year;
    });
    return year.year;
  };

  const getRecordMonth = (result: any, item: any) => {
    const year = result?.find((element: any) => {
      element.date === item.date;
      return element.year;
    });
    return year.month;
  };

  console.log("searchBase", searchBase);
  console.log(
    "presult",
    result?.flatMap((resultItem: any) => {
      return data
        ?.filter((yearItem: any) => {
          return yearItem.year === resultItem.year;
        })
        ?.flatMap((monthItem: any) => {
          return monthItem.months;
        })
        ?.filter((monthItem: any) => {
          return monthItem.month === resultItem.month;
        })
        ?.flatMap((monthItem: any) => {
          return monthItem.ops;
        });
      // ?.find((opsItem: any) => {
      //   return opsItem.id === resultItem.index;
      // });
    })
  );
  console.log("outputArray", outputArray);
  console.log("result", outputArray);

  return (
    <WrapperAllContent>
      <InputStyled
        placeholder="Введите номер скважины и/или месторождение"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></InputStyled>
      <ResultContainer>
        {outputArray?.map((item: any, index: number) => {
          return (
            <OperationButton
              user={user}
              isEditMode={isEditMode}
              operation={item}
              onDeleteOperation={() => {
                deleteOperation({
                  id: item.id,
                  year: getRecordYear(result, item),
                  month: getRecordMonth(result, item),
                });
              }}
              onDeleteRecord={(dateTime) => {
                deleteOperation({
                  id: item.id,
                  year: getRecordYear(result, item),
                  month: getRecordMonth(result, item),
                  dateTime,
                });
              }}
              isDeleteble={user?.role === "ADMIN" && isEditMode}
              onClick={() => {
                setOperation(item.id);
                console.log("sets", operation);
              }}
              onSecondClick={() => {
                setOperation("");
              }}
              isHighlighted={item?.id === operation}
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
