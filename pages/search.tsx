import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import MONTH_MAP from "../services/monthMap";

import { useDataBase } from "../hooks/useDataBase";
import { useEditModeContext } from "./context/EditModeContext";
import { useDeleteRecord } from "../hooks/useDeleteRecord";
import { useUserStore } from "../stores/useUserStore";
import { useDataBaseStore } from "../stores/useDataBaseStore";

import OperationButton from "../components/buttons/OperationButton";
import LoaderModal from "../components/modalWindows/LoaderModal";
import ErrorModal from "../components/modalWindows/ErrorModal";
import DeleteConfirmationDialog from "../components/modalWindows/DeleteConfirmationDialog";
import SuccessDialog from "../components/modalWindows/SuccessDialog";
import ErrorDialog from "../components/modalWindows/ErrorDialog";

import { DataBaseType, DeleteStateType } from "../types/types";

const WrapperAllContent = styled.div`
  width: 100%;
`;

const InputStyled = styled.input`
  width: -webkit-fill-available;
  min-height: 50px;
  font-size: 1.2em;
  margin: 5px;
  padding: 0px 10px;
  border: solid #3c3e3f 1px;
  border-radius: 5px;
`;

const ResultContainer = styled.div`
  margin: 5px 2px;
  border: 2px #3c3e3f solid;
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
  const user = useUserStore();
  const [search, setSearch] = useState<string>("");
  const [operation, setOperation] = useState("");
  const [isSuccessDialogVisible, setIsSuccessDialogVisible] = useState(false);
  const [isErrorDialogVisible, setErrorDialogVisible] = useState(false);

  const { isEditMode } = useEditModeContext();

  const { isLoading, data, isError, error } = useDataBase({});
  console.log("dataBase", data);
  const { mutate: deleteOperation } = useDeleteRecord({
    onSuccess: () => {
      setIsSuccessDialogVisible(true);
    },
    onError: () => {
      setErrorDialogVisible(true);
    },
  });
  const [isErrorVisible, setIserrorVisible] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate<HTMLDivElement>();
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteStateType>({ id: "", year: "", month: "" });

  // if (isLoading) return <LoaderModal text="Fetching data..." />;

  // if (isError)
  //   return (
  //     <ErrorModal
  //       isVisible={true}
  //       onClose={() => {
  //         setIserrorVisible(false);
  //       }}
  //     ></ErrorModal>
  //   );

  const searchBase = data?.flatMap((yearItem: any) => {
    return yearItem.months?.flatMap((monthItem: any) => {
      return monthItem.ops?.flatMap((opsItem: any) => {
        return {
          year: Number(yearItem.year),
          month: monthItem.month,
          date: opsItem.startDate,
          index: (
            opsItem.startDate +
            " " +
            opsItem.number +
            " " +
            opsItem.field
          ).toUpperCase(),
        };
      });
    });
  });
  console.log("SearchBase", searchBase);

  const result = searchBase
    ?.filter(
      (item: any) =>
        item?.index.includes(search.toUpperCase()) && search.length > 0
    )
    .map((operation: any) => {
      return {
        year: operation.year,
        month: operation.month,
        date: operation.date,
        index: operation.index,
      };
    });
  console.log("result", result);
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
        return (
          `${opsItem.startDate.toUpperCase()} ${opsItem.number.toUpperCase()} ${opsItem.field.toUpperCase()}` ===
          resultItem.index.toUpperCase()
        );
      });
  });
  console.log("search output", outputArray);
  return (
    <WrapperAllContent>
      <InputStyled
        placeholder="Введите номер скважины и/или месторождение"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></InputStyled>
      <ResultContainer ref={parent}>
        {outputArray?.map((item: any, index: number) => {
          console.log("items", item);
          return (
            <OperationButton
              key={Math.random()}
              isEditMode={isEditMode}
              department={item.department}
              duration={item.duration}
              operation={item}
              onDeleteOperation={() => {
                // console.log(MONTH_MAP.get(Number(item.id.split(".")[1])));
                setDeleteConfirmationState({
                  id: `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`,
                  year: Number(
                    `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`
                      .split(".")[2]
                      .slice(0, 4)
                  ),
                  month: MONTH_MAP.get(
                    Number(
                      `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`.split(
                        "."
                      )[1]
                    ) - 1
                  ),
                });
              }}
              onDeleteRecord={(dateTime) => {
                setDeleteConfirmationState({
                  id: `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`,
                  year: Number(item.id.split(".")[2].slice(0, 4)),
                  month: MONTH_MAP.get(
                    Number(
                      `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`.split(
                        "."
                      )[1]
                    ) - 1
                  ),
                  dateTime,
                });
              }}
              isDeleteble={user?.user.role === "ADMIN" && isEditMode}
              onClick={() => {
                setOperation(
                  `${item.startDate.toUpperCase()} ${item.number.toUpperCase()} ${item.field.toUpperCase()}`
                );
                console.log("sets", operation);
              }}
              onSecondClick={() => {
                setOperation("");
              }}
              isHighlighted={
                `${item.startDate.toUpperCase()} ${
                  item.number
                } ${item.field.toUpperCase()}` === operation
              }
              isCurrent={
                !item?.result
                  .map((res: any) => {
                    return res.isFinal;
                  })
                  .includes(true)
              }
              text={`${index + 1}.  ${item?.startDate}  ${item?.number}  ${
                item?.field
              } `}
            ></OperationButton>
          );
        })}
      </ResultContainer>
      <DeleteConfirmationDialog
        isVisible={!!deleteConfirmationState?.id}
        onAbort={() => {
          setDeleteConfirmationState({ id: "", year: "", month: "" });
        }}
        onSubmit={() => {
          deleteOperation(deleteConfirmationState);
          setDeleteConfirmationState({ id: "", year: "", month: "" });
        }}
      ></DeleteConfirmationDialog>
      <SuccessDialog
        onClose={() => {
          setIsSuccessDialogVisible(false);
        }}
        isVisible={isSuccessDialogVisible}
        message={"Запись успешно удалена"}
      ></SuccessDialog>
      <ErrorDialog
        onClose={() => {
          setErrorDialogVisible(false);
        }}
        isVisible={isErrorDialogVisible}
        message={"При удалении произошла ошибка"}
      ></ErrorDialog>
    </WrapperAllContent>
  );
}
