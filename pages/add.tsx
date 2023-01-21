import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserStore } from "../stores/useUserStore";
import { useAddMonth } from "../hooks/useAddMonth";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";
import CustomLink from "../components/buttons/CustomLink";
import AddMonthModal from "../components/modalWindows/AddMonthModal";
import {
  InputSimple,
  InputVanishing,
  InputSubmit,
  SelectStyled,
} from "../components/menuComponents/Inputs";
import {
  Rectangle,
  SmallRectangle,
  PannelContainer,
  AddFormContentWrapper,
  GridBorderedContainer,
  GridUnborderedContainer,
  VanishingContainer,
} from "../components/menuComponents/AdditionalComponents";

import ky from "ky";

const CheckboxContainer = styled.div`
  display: flex;
`;

const AddButtonsContainer = styled.div`
  display: flex;
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

const AddContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const DropDownListContainer = styled.div<{
  isVisible: boolean;
}>`
  position: fixed;
  top: 374px;
  left: 214px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 293px;
  min-height: 20px;
  z-index: 20;
  border: 1px solid black;
  opacity: 1;
  background-color: white;
`;

const DropDownUl = styled.ul`
  font-size: 1em;
  margin: 0;
  list-style-type: none;
`;

export default function AddPage() {
  const now = new Date();
  const [isLengthInputVisible, setIsLengthInputVisible] = useState(false);
  const [addMonthModalVisible, setAddMonthModalVisible] = useState(false);
  const [isNewMonthBlockVisible, setIsNewMonthBlockVisible] = useState(false);
  const [isNewMonthBlockAlarmed, setIsNewMonthBlockAlarmed] = useState(false);
  const user = useUserStore();
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
  const [isDropDownListVisible, setIsDropDownListVisible] = useState(false);

  const {
    data: addMonthResponse,
    mutate: addMonth,
    mutateAsync: addMonthAsync,
  } = useAddMonth();

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

  const { data: fieldBase } = useQuery("GET_FIELD_BASE", async () => {
    const res = await ky.get("api/fieldBaseApi");
    return await res.json<[string] | []>();
  });
  console.log(fieldBase);
  const dropDownList = fieldBase?.filter((fieldItem) =>
    fieldItem.includes(field.toUpperCase())
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
  }, [newYear, newMonth, planOps, wishfullAverageLength, addMonth]);

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

  return (
    <>
      <PannelContainer isAdmin={user?.user.role === "ADMIN"}>
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

      <AddFormContentWrapper isAdmin={user?.user.role === "ADMIN"}>
        <VanishingContainer isVisible={!adminPannel}>
          <GridBorderedContainer gridColumns={"150px 1fr 150px"}>
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
                return (
                  <option key={dayItem} value={dayItem}>
                    {dayItem}
                  </option>
                );
              })}
            </SelectStyled>
            <SelectStyled
              value={startMonth}
              onChange={(e) => {
                setStartMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return (
                  <option key={mnth} value={mnth}>
                    {mnth}
                  </option>
                );
              })}
            </SelectStyled>
            <SelectStyled
              value={startYear}
              onChange={(e) => {
                setStartYear(Number(e.target.value));
              }}
            >
              {startYearIterator.map((yearItem) => {
                return (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                );
              })}
            </SelectStyled>
          </GridBorderedContainer>
          <GridBorderedContainer gridColumns="150px 1fr 150px 70px 70px">
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
                return (
                  <option key={dayItem} value={dayItem}>
                    {dayItem}
                  </option>
                );
              })}
            </SelectStyled>
            <SelectStyled
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return (
                  <option key={mnth} value={mnth}>
                    {mnth}
                  </option>
                );
              })}
            </SelectStyled>
            <SelectStyled
              value={year}
              onChange={(e) => {
                setYear(Number(e.target.value));
              }}
            >
              {yearIterator.map((yearItem) => {
                return (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                );
              })}
            </SelectStyled>
            <InputSimple
              isNotValid={notValidInput === "hours"}
              onChange={(e) => {
                validateNumber(e.target.value, setHours, "hours", 24);
              }}
              value={hours}
            ></InputSimple>
            <InputSimple
              isNotValid={notValidInput === "minutes"}
              onChange={(e) => {
                validateNumber(e.target.value, setMinutes, "minutes", 59);
              }}
              value={minutes}
            ></InputSimple>
          </GridBorderedContainer>
          <>
            <GridUnborderedContainer gridColumns="200px 1fr 200px">
              <LabelStyled>Номер скважины</LabelStyled>
              <LabelStyled>Месторождение</LabelStyled>
              <LabelStyled>Промысел</LabelStyled>
              <InputSimple
                isNotValid={false}
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              ></InputSimple>
              <InputSimple
                onFocus={() => {
                  setIsDropDownListVisible(true);
                }}
                onBlur={() => {
                  setIsDropDownListVisible(false);
                }}
                isNotValid={false}
                value={field}
                onChange={(e) => {
                  setField(e.target.value);
                }}
              ></InputSimple>
              <SelectStyled
                value={department}
                onChange={(e) => setDepartment(Number(e.target.value))}
              >
                <option value={1}>{"ЦДНГ-1"}</option>
                <option value={2}>{"ЦДНГ-2"}</option>
              </SelectStyled>
              <DropDownListContainer
                isVisible={isDropDownListVisible && field.length > 0}
              >
                <DropDownUl>
                  {dropDownList?.map((fieldItem) => {
                    return (
                      <li
                        key={fieldItem}
                        value={fieldItem}
                        onClick={(e) => {
                          setField(fieldItem);
                          console.log(field);
                        }}
                      >
                        {fieldItem}
                      </li>
                    );
                  })}
                </DropDownUl>
              </DropDownListContainer>
            </GridUnborderedContainer>
            <GridUnborderedContainer gridColumns="repeat(4, 1fr)">
              <LabelStyled>Дебит, т/сут</LabelStyled>
              <LabelStyled>
                Удельный вес <br></br>жидкости, г/см<sup>3</sup>
              </LabelStyled>
              <LabelStyled>Обводнённость, %</LabelStyled>
              <CheckboxContainer>
                <LabelStyled>Замер окончен?</LabelStyled>
                <CheckboxStyled
                  type={"checkbox"}
                  onClick={() => {
                    setIsLengthInputVisible(!isLengthInputVisible);
                  }}
                ></CheckboxStyled>
              </CheckboxContainer>
              <InputSimple
                isNotValid={notValidInput === "debitMass"}
                value={debitMass}
                onChange={(e) =>
                  validateNumber(e.target.value, setDebitMass, "debitMass")
                }
              ></InputSimple>
              <InputSimple
                isNotValid={notValidInput === "density"}
                value={density}
                onChange={(e) =>
                  validateNumber(e.target.value, setDensity, "density", 2)
                }
              ></InputSimple>
              <InputSimple
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
              ></InputSimple>
              <InputVanishing
                isNotValid={notValidInput === "duration"}
                isVisible={isLengthInputVisible}
                placeholder="Введите продолжительность"
                value={duration}
                onChange={(e) =>
                  validateNumber(e.target.value, setDuration, "duration")
                }
              ></InputVanishing>
            </GridUnborderedContainer>
            <AddMonthContainer
              isVisible={isNewMonthBlockVisible}
              isAlarmed={isNewMonthBlockAlarmed}
            >
              <NewMonthLabelStyled>Добавьте новый месяц</NewMonthLabelStyled>
              <LabelStyled>Количество операций по плану</LabelStyled>
              <LabelStyled>
                Средняя планируемая продолжительность операции, час
              </LabelStyled>
              <InputSimple
                onFocus={() => {
                  setIsNewMonthBlockAlarmed(false);
                }}
                isNotValid={notValidInput === "planOps"}
                value={String(planOps)}
                onChange={(e) =>
                  validateNumber(e.target.value, setPlanOps, "planOps")
                }
              ></InputSimple>
              <InputSimple
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
              ></InputSimple>
            </AddMonthContainer>
          </>
          <AddButtonsContainer>
            <AddPhotoButton></AddPhotoButton>
            <AddExcellButton></AddExcellButton>
          </AddButtonsContainer>
          <InputSubmit
            type={"submit"}
            onClick={onEditorFormSubmit}
            value={"Добавить"}
          ></InputSubmit>
        </VanishingContainer>
        <VanishingContainer isVisible={adminPannel}>
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
                return (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                );
              })}
            </SelectStyled>
            <SelectStyled
              onChange={(e) => {
                setNewMonth(e.target.value);
              }}
            >
              {[...MONTH_MAP.values()].map((mnth) => {
                return (
                  <option key={month} value={mnth}>
                    {mnth}
                  </option>
                );
              })}
            </SelectStyled>
            <InputSimple
              isNotValid={notValidInput === "planOps"}
              value={String(planOps)}
              onChange={(e) =>
                validateNumber(e.target.value, setPlanOps, "planOps")
              }
            ></InputSimple>
            <InputSimple
              isNotValid={notValidInput === "wishfullAverageLength"}
              value={String(wishfullAverageLength)}
              onChange={(e) =>
                validateNumber(
                  e.target.value,
                  setWishfullAveregeLength,
                  "wishfullAverageLength"
                )
              }
            ></InputSimple>
          </AddContainer>
          <InputSubmit
            type={"submit"}
            value={"Добавить месяц"}
            onClick={onAdminFormSubmit}
          ></InputSubmit>
        </VanishingContainer>
      </AddFormContentWrapper>
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
    </>
  );
}
