import { useState } from "react";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useUserStore } from "../stores/useUserStore";
import { useDataBaseStore } from "../stores/useDataBaseStore";
import { useMainStore } from "../stores/useMainStore";
import { useEditModeContext } from "../pages/context/EditModeContext";
import { useDeleteRecord } from "../hooks/useDeleteRecord";
import { useAddMonth } from "../hooks/useAddMonth";

import { DeleteStateType } from "../types/types";

import OperationButton from "./buttons/OperationButton";
import {
  Rectangle,
  SmallRectangle,
  PannelContainer,
} from "./menuComponents/AdditionalComponents";

import { DataBaseType, SingleMonthType } from "../types/types";
import CustomLink from "./buttons/CustomLink";
import DeleteConfirmationDialog from "./modalWindows/DeleteConfirmationDialog";
import SuccessDialog from "./modalWindows/SuccessDialog";
import ErrorDialog from "./modalWindows/ErrorDialog";
import FolderLabel from "./buttons/FolderLabel";

const Wraper = styled.div`
  margin: 1px;
`;

const FolderLabelContainer = styled.div`
  display: flex;
  width: 100%;
`;

const OperationContainer = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  border-right: 2px solid #3c3e3f;
  border-left: 2px solid #3c3e3f;
  border-bottom: 2px solid #3c3e3f;
  min-height: 200px;
  margin-top: -3px;
`;

const StatisticsContainer = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  border-right: 2px solid #3c3e3f;
  border-left: 2px solid #3c3e3f;
  border-bottom: 2px solid #3c3e3f;
  min-height: 100px;
  margin-top: -3px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid white;
`;
const TableRow = styled.tr`
  height: 20px;
`;

const Cell = styled.td`
  text-align: center;
  padding: 10px;
  border: solid black 1px;
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

interface VisibilityState {
  state: "" | "change" | "delete";
}

export default function MonthTable() {
  const user = useUserStore();
  const dataBase = useDataBaseStore();
  console.log("PB", dataBase.dataBase);
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteStateType>({ id: "", year: "", month: "" });
  const [isSuccessDialogVisible, setIsSuccessDialogVisible] =
    useState<VisibilityState>({ state: "" });
  const [isErrorDialogVisible, setErrorDialogVisible] =
    useState<VisibilityState>({ state: "" });
  const { year, month, operation, setOperation } = useMainStore();
  const { isEditMode, setIsEditMode } = useEditModeContext();
  const { mutate: deleteOperation } = useDeleteRecord({
    onSuccess: () => {
      setIsSuccessDialogVisible({ state: "delete" });
    },
    onError: () => {
      setErrorDialogVisible({ state: "delete" });
    },
  });
  const [mode, setMode] = useState("opeartions");
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const currentMonth =
    dataBase.dataBase
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

  const { mutate: changeMonth } = useAddMonth({
    onSuccess: () => {
      setIsSuccessDialogVisible({ state: "change" });
    },
    onError: () => {
      setErrorDialogVisible({ state: "change" });
    },
  });

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
        department={element.department}
        isEditMode={isEditMode}
        operation={element}
        onDeleteOperation={() => {
          console.log({
            id: `${element.startDate} ${element.number} ${element.field}`,
            year,
            month,
          });
          setDeleteConfirmationState({
            id: `${element.startDate} ${element.number} ${element.field}`,
            year,
            month,
          });
        }}
        onDeleteRecord={(dateTime) => {
          setDeleteConfirmationState({
            id: `${element.startDate} ${element.number} ${element.field}`,
            year,
            month,
            dateTime,
          });
        }}
        isDeleteble={user?.user.role === "ADMIN" && isEditMode}
        onClick={() => {
          setOperation(
            `${element.startDate.toUpperCase()} ${
              element.number
            } ${element.field.toUpperCase()}`
          );
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
        key={`${element.startDate} ${element.number} ${element.field} ${element.dateTime}`}
        isHighlighted={
          `${element.startDate.toUpperCase()} ${
            element.number
          } ${element.field.toUpperCase()}` === operation
        }
        text={`${index + 1}.  ${element.startDate}  ${element.number}  ${
          element.field
        } `}
        duration={element.duration}
      ></OperationButton>
    );
  });

  return (
    <Wraper>
      <PannelContainer isAdmin={true}>
        <SmallRectangle />
        <FolderLabel
          text={"Oперации"}
          isHighlighted={mode === "opeartions"}
          onClick={() => {
            setMode("opeartions");
          }}
        ></FolderLabel>
        <FolderLabel
          text={"Статистика"}
          isHighlighted={mode === "statistics"}
          onClick={() => {
            setMode("statistics");
          }}
        ></FolderLabel>
        <Rectangle />
      </PannelContainer>
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
          setIsSuccessDialogVisible({ state: "" });
        }}
        isVisible={!!isSuccessDialogVisible.state}
        message={
          isSuccessDialogVisible.state === "delete"
            ? "Запись успешно удалена"
            : "Запись успешно изменена"
        }
      ></SuccessDialog>
      <ErrorDialog
        onClose={() => {
          setErrorDialogVisible({ state: "" });
        }}
        isVisible={!!isErrorDialogVisible.state}
        message={
          isErrorDialogVisible.state === "delete"
            ? "При удалении произошла ошибка"
            : "При изменении записи произошла ошибка"
        }
      ></ErrorDialog>
      <OperationContainer isVisible={mode === "opeartions"} ref={parent}>
        {buttons}
      </OperationContainer>
      <StatisticsContainer isVisible={mode === "statistics"}>
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
                  План, часов <br /> (при планируемой средней продолжительности
                  операции{" "}
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
                  План, часов <br /> (при планируемой средней продолжительности
                  операции {wishfullAverageLength} часов)
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
              <Cell>{Math.round((factHrs1 / factOps1) * 100) / 100 || 0}</Cell>
            </TableRow>
            <TableRow>
              <Cell>ЦДНГ-2</Cell>
              <Cell>{Math.round((factHrs2 / factOps2) * 100) / 100 || 0}</Cell>
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
      </StatisticsContainer>
    </Wraper>
  );
}
