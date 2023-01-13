import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserContext } from "./context/UserContext";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";
import CustomLink from "../components/buttons/CustomLink";
import AddMonthModal from "../components/modalWindows/AddMonthModal";
import ky from "ky";

const WrapperAllContent = styled.div`
  width: 100%;
`;

const PannelContainer = styled.div<{
  isAdmin: boolean;
}>`
  display: ${({ isAdmin }) => (isAdmin ? "flex" : "none")};
  width: 100%;
  margin-top: 2px;
  padding: 1px 1px 1px 1px;
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

const Wraper = styled.div<{
  isAdmin: boolean;
}>`
  padding: 2px;
  margin: -1px 1px 1px 1px;
  ${({ isAdmin }) =>
    isAdmin
      ? "border-right: 2px solid red; border-left: 2px solid red;border-bottom: 2px solid red;"
      : "border: 2px solid red"};
`;

const EditorContainer = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const AdminContainer = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const StartDateContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  border: 1px red solid;
  border-radius: 5px;
  margin-bottom: 3px;
`;

const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 150px 70px 70px;
  border: 1px red solid;
  border-radius: 5px;
`;
// const OperationResultContainer = styled.div`
//   margin: 5px 0px;
//   border: 2px red solid;
//   border-radius: 5px;
// `;

const ResultContainer = styled.div`
  display: grid;
  justify-items: stretch;
  overflow: auto;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  padding: 2px;
  overflow: hidden;
`;

const FieldNumberContainer = styled.div`
  display: grid;
  overflow: auto;
  width: 100%;
  grid-template-columns: 200px 1fr 200px;
  padding: 2px;
  margin: 2px 0px;
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const AddButtonsContainer = styled.div`
  display: flex;
`;

const InputStyled = styled.input<{
  isNotValid: boolean;
}>`
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
`;

const SelectStyled = styled.select`
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: white;
`;

const LengthInput = styled.input<{
  isVisible: boolean;
  isNotValid: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
`;

const CheckboxStyled = styled.input`
  height: 25px;
  width: 25px;
`;

const LabelStyled = styled.label`
  margin: auto 10px;
`;

const CurrentTimeTitleLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 6;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const StartDateTitleLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const AddMonthContainer = styled.div<{
  isVisible: boolean;
  isAlarmed: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
  background-color: ${({ isAlarmed }) => (isAlarmed ? "pink" : "transparent")};
  overflow: auto;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  padding: 2px;
  margin: 2px 0px;
  border: solid red 1px;
  border-radius: 5px;
`;

const NewMonthLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const ButtonStyled = styled.button`
  font-size: 1.2em;
  background-color: red;
  color: white;
  margin: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

const AddContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function AddPage() {
  const now = new Date();
  const [isLengthInputVisible, setIsLengthInputVisible] = useState(false);
  const [addMonthModalVisible, setAddMonthModalVisible] = useState(false);
  const [isNewMonthBlockVisible, setIsNewMonthBlockVisible] = useState(false);
  const [isNewMonthBlockAlarmed, setIsNewMonthBlockAlarmed] = useState(false);
  const { user } = useUserContext();
  const [startDay, setStartDay] = useState(now.getDate());
  const [startMonth, setStartMonth] = useState(MONTH_MAP.get(now.getMonth()));
  const [startYear, setStartYear] = useState(now.getFullYear());
  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(MONTH_MAP.get(now.getMonth()));
  const [year, setYear] = useState(now.getFullYear());
  const [hours, setHours] = useState(String(now.getHours()));
  const [minutes, setMinutes] = useState(String(now.getMinutes()));
  const [adminPannel, setAdminPannel] = useState(false);
  const [number, setNumber] = useState("");
  const [field, setField] = useState("");
  const [department, setDepartment] = useState(1);
  const [debitMass, setDebitMass] = useState("");
  const [density, setDensity] = useState("");
  const [watterRate, setWatterRate] = useState("");
  const [duration, setDuration] = useState("");
  const [newYear, setNewYear] = useState(now.getFullYear());
  const [newMonth, setNewMonth] = useState(MONTH_MAP.get(now.getMonth()));
  const [planOps, setPlanOps] = useState("");
  const [wishfullAverageLength, setWishfullAveregeLength] = useState("");
  const [notValidInput, setNotValidInput] = useState("");

  const queryClient = useQueryClient();

  const {
    data: addResponse,
    mutate: addRecord,
    mutateAsync: addRecordAsync,
  } = useMutation(
    "ADD_RECORD",
    async ({
      startDay,
      startMonth,
      startYear,
      day,
      month,
      year,
      hours,
      minutes,
      number,
      field,
      department,
      debitMass,
      density,
      watterRate,
      isFinal,
      duration,
      planOps,
      wishfullAverageLength,
    }: {
      startDay: number;
      startMonth: string | undefined;
      startYear: number;
      day: number;
      month: string | undefined;
      year: number;
      hours: string;
      minutes: string;
      number: string;
      field: string;
      department: number;
      debitMass: string;
      density: string;
      watterRate: string;
      isFinal: boolean;
      duration?: string | undefined;
      planOps?: string;
      wishfullAverageLength?: string;
    }) => {
      const res = await ky
        .post("/api/dataBaseApi", {
          json: {
            startDay,
            startMonth,
            startYear,
            day,
            month,
            year,
            hours,
            minutes,
            number,
            field,
            department,
            debitMass,
            density,
            watterRate,
            isFinal,
            duration,
            planOps,
            wishfullAverageLength,
          },
        })
        .json<{ message: string }>();
      return res;
    },
    {
      onSuccess: (res) => {
        console.log("onSuccess", res.message);
        console.log("onSuccess", res.message === "Month does not exist");
        if (res.message === "Month does not exist") {
          console.log(res.message);
          setAddMonthModalVisible(true);
        } else {
          queryClient.invalidateQueries("REQUEST_DATA_BASE");
        }
      },
    }
  );

  // useEffect(() => {
  //   console.log("useEffect", addResponse);
  //   if (addResponse?.message === "Month does not exist") {
  //     console.log(addResponse);
  //     setAddMonthModalVisible(true);
  //   } else {
  //     queryClient.invalidateQueries("REQUEST_DATA_BASE");
  //   }
  // }, [addResponse]);

  const {
    data: addMonthResponse,
    mutate: addMonth,
    mutateAsync: addMonthAsync,
  } = useMutation(
    "ADD_MONTH",
    async ({
      year,
      month,
      planOps,
      wishfullAverageLength,
    }: {
      year: number;
      month: string | undefined;
      planOps: number;
      wishfullAverageLength: number;
    }) => {
      const res = await ky
        .put("/api/dataBaseApi", {
          json: {
            year,
            month,
            planOps,
            wishfullAverageLength,
          },
        })
        .json<{ message: string }>();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("REQUEST_DATA_BASE");
      },
    }
  );

  const onEditorFormSubmit = () => {
    addRecord({
      startDay,
      startMonth,
      startYear,
      day,
      month,
      year,
      hours,
      minutes,
      number,
      field,
      department,
      debitMass,
      density,
      watterRate,
      isFinal: isLengthInputVisible,
      duration,
      planOps,
      wishfullAverageLength,
    });
    setIsNewMonthBlockVisible(false);
    console.log("Handler");
  };

  const onAdminFormSubmit = useCallback(() => {
    addMonth({
      year: newYear,
      month: newMonth,
      planOps: Number(planOps),
      wishfullAverageLength: Number(wishfullAverageLength),
    });
  }, [newYear, newMonth, planOps, wishfullAverageLength]);

  const getDaysInMonth = (month: string | undefined, year: number) => {
    return (
      32 -
      new Date(
        year,
        [...MONTH_MAP.keys()].find((e) => MONTH_MAP.get(e) === month) ||
          now.getMonth(),
        32
      ).getDate()
    );
  };

  const startDayIterator = new Array();
  const dayIterator = new Array();
  const startYearIterator = new Array();
  const yearIterator = new Array();

  for (let i = 1; i < getDaysInMonth(startMonth, startYear) + 1; i++) {
    startDayIterator.push(i);
  }
  for (let i = 1; i < getDaysInMonth(month, year) + 1; i++) {
    dayIterator.push(i);
  }
  for (let i = 2007; i < now.getFullYear() + 10; i++) {
    startYearIterator.push(i);
  }
  for (let i = startYear; i < now.getFullYear() + 10; i++) {
    yearIterator.push(i);
  }

  const validateNumber = (
    number: string,
    cb: (number: string) => void,
    inputName: string,
    condition?: number
  ) => {
    if (
      isNaN(Number(number)) ||
      number.includes(" ") ||
      Number(number) > condition!
    ) {
      setNotValidInput(inputName);
      cb(number.slice(0, -1));
      setTimeout(() => {
        setNotValidInput("");
      }, 300);
      return number.slice(0, -1);
    } else {
      setNotValidInput("");
      cb(number);
      return number;
    }
  };
  console.log(notValidInput);
  return (
    <WrapperAllContent>
      <PannelContainer isAdmin={user?.role === "ADMIN"}>
        <SmallRectangle />
        <CustomLink
          text="Инженер"
          isHighlighted={!adminPannel}
          onClick={() => setAdminPannel(false)}
        ></CustomLink>
        <CustomLink
          text="Начальник"
          isHighlighted={adminPannel}
          onClick={() => setAdminPannel(true)}
        ></CustomLink>
        <Rectangle />
      </PannelContainer>

      <Wraper isAdmin={user?.role === "ADMIN"}>
        <EditorContainer isVisible={!adminPannel}>
          <StartDateContainer>
            <StartDateTitleLabelStyled>
              Дата начала исследований
            </StartDateTitleLabelStyled>
            <LabelStyled>Число</LabelStyled>
            <LabelStyled>Месяц</LabelStyled>
            <LabelStyled>Год</LabelStyled>
            <SelectStyled
              value={startDay}
              onChange={(e) => {
                setStartDay(Number(e.target.value));
              }}
            >
              {startDayIterator.map((dayItem) => {
                return <option value={dayItem}>{dayItem}</option>;
              })}
            </SelectStyled>
            <SelectStyled
              value={startMonth}
              onChange={(e) => {
                setStartMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return <option value={mnth}>{mnth}</option>;
              })}
            </SelectStyled>
            <SelectStyled
              value={startYear}
              onChange={(e) => {
                setStartYear(Number(e.target.value));
              }}
            >
              {startYearIterator.map((yearItem) => {
                return <option value={yearItem}>{yearItem}</option>;
              })}
            </SelectStyled>
          </StartDateContainer>
          <DateTimeContainer>
            <CurrentTimeTitleLabelStyled>
              Текущее время
            </CurrentTimeTitleLabelStyled>
            <LabelStyled>Число</LabelStyled>
            <LabelStyled>Месяц</LabelStyled>
            <LabelStyled>Год</LabelStyled>
            <LabelStyled>Время</LabelStyled>
            <LabelStyled></LabelStyled>
            <SelectStyled
              value={day}
              onChange={(e) => {
                setDay(Number(e.target.value));
              }}
            >
              {dayIterator.map((dayItem) => {
                return <option value={dayItem}>{dayItem}</option>;
              })}
            </SelectStyled>
            <SelectStyled
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return <option value={mnth}>{mnth}</option>;
              })}
            </SelectStyled>
            <SelectStyled
              value={year}
              onChange={(e) => {
                setYear(Number(e.target.value));
              }}
            >
              {yearIterator.map((yearItem) => {
                return <option value={yearItem}>{yearItem}</option>;
              })}
            </SelectStyled>
            <InputStyled
              isNotValid={notValidInput === "hours"}
              onChange={(e) => {
                validateNumber(e.target.value, setHours, "hours", 24);
              }}
              value={hours}
            ></InputStyled>
            <InputStyled
              isNotValid={notValidInput === "minutes"}
              onChange={(e) => {
                validateNumber(e.target.value, setMinutes, "minutes", 59);
              }}
              value={minutes}
            ></InputStyled>
          </DateTimeContainer>
          <>
            <FieldNumberContainer>
              <LabelStyled>Номер скважины</LabelStyled>
              <LabelStyled>Месторождение</LabelStyled>
              <LabelStyled>Промысел</LabelStyled>
              <InputStyled
                isNotValid={false}
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              ></InputStyled>
              <InputStyled
                isNotValid={false}
                value={field}
                onChange={(e) => {
                  setField(e.target.value);
                }}
              ></InputStyled>
              <SelectStyled
                value={department}
                onChange={(e) => setDepartment(Number(e.target.value))}
              >
                <option value={1}>{"ЦДНГ-1"}</option>
                <option value={2}>{"ЦДНГ-2"}</option>
              </SelectStyled>
            </FieldNumberContainer>
            <ResultContainer>
              <LabelStyled>Дебит в т/сут</LabelStyled>
              <LabelStyled>
                Удельный вес <br></br>жидкости в г/см<sup>3</sup>
              </LabelStyled>
              <LabelStyled>Обводнённость в %</LabelStyled>
              <CheckboxContainer>
                <LabelStyled>Замер окончен?</LabelStyled>
                <CheckboxStyled
                  type={"checkbox"}
                  onClick={() => {
                    setIsLengthInputVisible(!isLengthInputVisible);
                  }}
                ></CheckboxStyled>
              </CheckboxContainer>
              <InputStyled
                isNotValid={notValidInput === "debitMass"}
                value={debitMass}
                onChange={(e) =>
                  validateNumber(e.target.value, setDebitMass, "debitMass")
                }
                pattern="[0-9]"
                title="Numbers only"
              ></InputStyled>
              <InputStyled
                isNotValid={notValidInput === "density"}
                value={density}
                onChange={(e) =>
                  validateNumber(e.target.value, setDensity, "density", 2)
                }
              ></InputStyled>
              <InputStyled
                isNotValid={notValidInput === "watterRate"}
                value={watterRate}
                onChange={(e) =>
                  validateNumber(
                    e.target.value,
                    setWatterRate,
                    "watterRate",
                    100
                  )
                }
              ></InputStyled>
              <LengthInput
                isNotValid={notValidInput === "duration"}
                isVisible={isLengthInputVisible}
                placeholder="Введите продолжительность"
                value={duration}
                onChange={(e) =>
                  validateNumber(e.target.value, setDuration, "duration")
                }
              ></LengthInput>
            </ResultContainer>
            <AddMonthContainer
              isVisible={isNewMonthBlockVisible}
              isAlarmed={isNewMonthBlockAlarmed}
            >
              <NewMonthLabelStyled>Добавьте новый месяц</NewMonthLabelStyled>
              <LabelStyled>Количество операций по плану</LabelStyled>
              <LabelStyled>
                Средняя планируемая продолжительность операции, час
              </LabelStyled>
              <InputStyled
                onFocus={() => {
                  setIsNewMonthBlockAlarmed(false);
                }}
                isNotValid={notValidInput === "planOps"}
                value={String(planOps)}
                onChange={(e) =>
                  validateNumber(e.target.value, setPlanOps, "planOps")
                }
              ></InputStyled>
              <InputStyled
                onFocus={() => {
                  setIsNewMonthBlockAlarmed(false);
                }}
                isNotValid={notValidInput === "wishfullAverageLength"}
                value={String(wishfullAverageLength)}
                onChange={(e) =>
                  validateNumber(
                    e.target.value,
                    setWishfullAveregeLength,
                    "wishfullAverageLength"
                  )
                }
              ></InputStyled>
            </AddMonthContainer>
          </>
          <AddButtonsContainer>
            <AddPhotoButton></AddPhotoButton>
            <AddExcellButton></AddExcellButton>
          </AddButtonsContainer>
          <ButtonStyled onClick={onEditorFormSubmit}>Добавить</ButtonStyled>
        </EditorContainer>
        <AdminContainer isVisible={adminPannel}>
          <AddContainer>
            <LabelStyled>Год</LabelStyled>
            <LabelStyled>Месяц</LabelStyled>
            <LabelStyled>Количество операций по плану</LabelStyled>
            <LabelStyled>
              Средняя планируемая продолжительность операции, час
            </LabelStyled>
            <SelectStyled
              onChange={(e) => {
                setNewYear(Number(e.target.value));
              }}
            >
              {startYearIterator.map((yearItem) => {
                return <option value={yearItem}>{yearItem}</option>;
              })}
            </SelectStyled>
            <SelectStyled
              onChange={(e) => {
                setNewMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return <option value={mnth}>{mnth}</option>;
              })}
            </SelectStyled>
            <InputStyled
              isNotValid={notValidInput === "planOps"}
              value={String(planOps)}
              onChange={(e) =>
                validateNumber(e.target.value, setPlanOps, "planOps")
              }
            ></InputStyled>
            <InputStyled
              isNotValid={notValidInput === "wishfullAverageLength"}
              value={String(wishfullAverageLength)}
              onChange={(e) =>
                validateNumber(
                  e.target.value,
                  setWishfullAveregeLength,
                  "wishfullAverageLength"
                )
              }
            ></InputStyled>
          </AddContainer>
          <ButtonStyled onClick={onAdminFormSubmit}>
            Добавить месяц
          </ButtonStyled>
        </AdminContainer>
      </Wraper>
      <AddMonthModal
        onSubmit={() => {
          setIsNewMonthBlockVisible(true);
          setIsNewMonthBlockAlarmed(true);
          setAddMonthModalVisible(false);
        }}
        isVisible={addMonthModalVisible}
        onClose={() => {
          setAddMonthModalVisible(false);
        }}
      ></AddMonthModal>
    </WrapperAllContent>
  );
}
