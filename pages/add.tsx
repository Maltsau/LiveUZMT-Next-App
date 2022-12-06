import { useState } from "react";
import { useUserContext } from "./context/UserContext";
import styled from "styled-components";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";

const Wraper = styled.div`
  padding: 2px;
  margin: 0;
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

export default function AddPage({
  onSignOut,
  onAllReset,
}: {
  onSignOut: any;
  onAllReset: any;
}) {
  const [isLengthInputVisible, setIsLengthInputVisible] = useState(false);
  const { user, setUser } = useUserContext();
  console.log(user);
  return (
    <Wraper>
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
