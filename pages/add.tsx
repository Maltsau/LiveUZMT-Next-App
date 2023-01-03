import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useUserContext } from "./context/UserContext";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";
import CustomLink from "../components/buttons/CustomLink";
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

const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 150px 70px 70px;
`;

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
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const AddButtonsContainer = styled.div`
  display: flex;
`;

const InputStyled = styled.input`
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
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
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

const CheckboxStyled = styled.input`
  height: 25px;
  width: 25px;
`;

const LabelStyled = styled.label`
  margin: auto 10px;
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
  const { user } = useUserContext();
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

  // console.log("Add Page", user);

  const {
    data: addResponse,
    mutate: addRecord,
    mutateAsync: addRecordAsync,
  } = useMutation(
    "ADD_RECORD",
    async ({
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
    }: {
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
    }) => {
      const res = await ky
        .post("/api/dataBaseApi", {
          json: {
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
          },
        })
        .json<{ message: string }>();
      return res;
    }
  );

  const onEditorFormSubmit = () => {
    addRecord({
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
    });
  };

  const daysInMonth =
    32 -
    new Date(
      year,
      [...MONTH_MAP.keys()].find((e) => MONTH_MAP.get(e) === month) ||
        now.getMonth(),
      32
    ).getDate();
  console.log(daysInMonth, department, debitMass);

  const dayIterator = new Array();
  const yearIterator = new Array();
  for (let i = 1; i < daysInMonth + 1; i++) {
    dayIterator.push(i);
  }
  for (let i = 2007; i < now.getFullYear() + 10; i++) {
    yearIterator.push(i);
  }

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
          <DateTimeContainer>
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
              onChange={(e) => {
                setHours(e.target.value);
              }}
              value={hours}
            ></InputStyled>
            <InputStyled
              onChange={(e) => {
                setMinutes(e.target.value);
              }}
              value={minutes}
            ></InputStyled>
          </DateTimeContainer>
          <FieldNumberContainer>
            <LabelStyled>Номер скважины</LabelStyled>
            <LabelStyled>Месторождение</LabelStyled>
            <LabelStyled>Промысел</LabelStyled>
            <InputStyled
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            ></InputStyled>
            <InputStyled
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
              value={debitMass}
              onChange={(e) => setDebitMass(e.target.value)}
            ></InputStyled>
            <InputStyled
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            ></InputStyled>
            <InputStyled
              value={watterRate}
              onChange={(e) => setWatterRate(e.target.value)}
            ></InputStyled>
            <LengthInput
              isVisible={isLengthInputVisible}
              placeholder="Введите продолжительность"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></LengthInput>
          </ResultContainer>
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
              {yearIterator.map((yearItem) => {
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
              value={String(planOps)}
              onChange={(e) => setPlanOps(e.target.value)}
            ></InputStyled>
            <InputStyled
              value={String(wishfullAverageLength)}
              onChange={(e) => setWishfullAveregeLength(e.target.value)}
            ></InputStyled>
          </AddContainer>
          <ButtonStyled>Добавить месяц</ButtonStyled>
        </AdminContainer>
      </Wraper>
    </WrapperAllContent>
  );
}
