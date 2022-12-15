import { useState } from "react";
import { useUserContext } from "./context/UserContext";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";
import CustomLink from "../components/buttons/CustomLink";
import OperationButton from "../components/buttons/OperationButton";

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

  // console.log("Add Page", user);

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
            <SelectStyled
              defaultValue={year}
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
              placeholder={hours}
              value={hours}
            ></InputStyled>
            <InputStyled
              onChange={(e) => {
                setMinutes(e.target.value);
              }}
              value={minutes}
              placeholder={minutes}
            ></InputStyled>
          </DateTimeContainer>
          <FieldNumberContainer>
            <LabelStyled>Номер скважины</LabelStyled>
            <LabelStyled>Месторождение</LabelStyled>
            <LabelStyled>Промысел</LabelStyled>
            <InputStyled></InputStyled>
            <InputStyled></InputStyled>
            <SelectStyled>
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
        </EditorContainer>
        <AdminContainer isVisible={adminPannel}>
          <AddContainer>
            <LabelStyled>Год</LabelStyled>
            <LabelStyled>Месяц</LabelStyled>
            <LabelStyled>Количество операций по плану</LabelStyled>
            <LabelStyled>
              Средняя планируемая продолжительность операции, час
            </LabelStyled>
            <InputStyled></InputStyled>
            <InputStyled></InputStyled>
            <InputStyled></InputStyled>
            <InputStyled></InputStyled>
          </AddContainer>
          <ButtonStyled>Добавить месяц</ButtonStyled>
          <ButtonStyled>Редактировать записи</ButtonStyled>
        </AdminContainer>
      </Wraper>
    </WrapperAllContent>
  );
}
