import { useState } from "react";
import { useUserContext } from "./context/UserContext";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";

const Wraper = styled.div`
  padding: 2px;
  margin: 0;
`;

const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 150px;
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

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
  vertical-align: center;
  align-items: stretch;
`;

const ButtonStyled = styled.button`
  font-size: 1.2em;
  background-color: red;
  color: white;
  margin: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

export default function AddPage() {
  const now = new Date();
  const [isLengthInputVisible, setIsLengthInputVisible] = useState(false);
  const { user } = useUserContext();
  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(MONTH_MAP.get(now.getMonth()));
  const [year, setYear] = useState(now.getFullYear());
  // console.log("Add Page", user);
  console.log([...MONTH_MAP.keys()].find((e) => MONTH_MAP.get(e) === month));
  const daysInMonth =
    32 -
    new Date(
      year,
      [...MONTH_MAP.keys()].find((e) => MONTH_MAP.get(e) === month) ||
        now.getMonth(),
      32
    ).getDate();
  console.log(daysInMonth);

  const dayIterator = new Array();
  const yearIterator = new Array();
  for (let i = 1; i < daysInMonth + 1; i++) {
    dayIterator.push(i);
  }
  for (let i = 2007; i < now.getFullYear() + 10; i++) {
    yearIterator.push(i);
  }

  console.log(dayIterator);
  return (
    <Wraper>
      <DateTimeContainer>
        <LabelStyled>Число</LabelStyled>
        <LabelStyled>Месяц</LabelStyled>
        <LabelStyled>Год</LabelStyled>
        <SelectStyled
          defaultValue={day}
          onChange={(e) => {
            setDay(Number(e.target.value));
          }}
        >
          {dayIterator.map((dayItem) => {
            return <option value={dayItem}>{dayItem}</option>;
          })}
        </SelectStyled>
        <SelectStyled
          defaultValue={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          {[...MONTH_MAP.values()].map((mnth) => {
            return <option value={mnth}>{mnth}</option>;
          })}
        </SelectStyled>
        <SelectStyled defaultValue={year}>
          {yearIterator.map((yearItem) => {
            return <option value={yearItem}>{yearItem}</option>;
          })}
        </SelectStyled>
      </DateTimeContainer>
      <FieldNumberContainer>
        <LabelStyled>Номер скважины</LabelStyled>
        <LabelStyled>Месторождение</LabelStyled>
        <LabelStyled>Промысел</LabelStyled>
        <InputStyled></InputStyled>
        <InputStyled></InputStyled>
        <InputStyled></InputStyled>
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
        <InputStyled></InputStyled>
        <InputStyled></InputStyled>
        <InputStyled></InputStyled>
        <LengthInput
          isVisible={isLengthInputVisible}
          placeholder="Введите продолжительность"
        ></LengthInput>
      </ResultContainer>
      <AddButtonsContainer>
        <AddPhotoButton></AddPhotoButton>
        <AddExcellButton></AddExcellButton>
      </AddButtonsContainer>
      <ButtonStyled>Добавить</ButtonStyled>
    </Wraper>
  );
}
