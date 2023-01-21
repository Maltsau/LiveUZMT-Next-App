import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserStore } from "../stores/useUserStore";
import { useAddMonth } from "../hooks/useAddMonth";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import MONTH_MAP from "../services/monthMap";

import AddPhotoButton from "../components/buttons/AddPhotoButton";
import AddExcellButton from "../components/buttons/AddExcellButton";
import CustomLink from "../components/buttons/CustomLink";
import AddMonthModal from "../components/modalWindows/AddMonthModal";
import AddRecordForm from "../components/forms/AddRecordForm";
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

const SpanStyled = styled.span<{ minHeight?: number }>`
  margin: 0 5px;
  min-height: ${(props) => props.minHeight}px;
  vertical-align: bottom;
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const FlexInlineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
  width: 100%;
  padding: 0 2px;
  justify-items: center;
  overflow: auto;
`;

const AddButtonsContainer = styled.div`
  display: flex;
`;

const CheckboxStyled = styled.input`
  height: 25px;
  width: 25px;
`;

const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 0;
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

export default function AddRecordPage() {
  const user = useUserStore();

  const [adminPannel, setAdminPannel] = useState(false);

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
          <AddRecordForm />
        </VanishingContainer>

        <VanishingContainer isVisible={adminPannel}>
          <form>
            <GridUnborderedContainer gridColumns="1fr 1fr 1fr 1fr">
              <LabelStyled>
                <SpanStyled minHeight={72}>Месяц</SpanStyled>
                <SelectStyled></SelectStyled>
              </LabelStyled>
              <LabelStyled>
                <SpanStyled minHeight={72}>Год</SpanStyled>
                <SelectStyled></SelectStyled>
              </LabelStyled>
              <LabelStyled>
                <SpanStyled minHeight={72}>
                  Количество операций по плану
                </SpanStyled>
                <InputSimple></InputSimple>
              </LabelStyled>
              <LabelStyled>
                <SpanStyled minHeight={72}>
                  Средняя планируемая продолжительность операции, час
                </SpanStyled>
                <InputSimple></InputSimple>
              </LabelStyled>
            </GridUnborderedContainer>
            <InputSubmit type={"submit"} value={"Добавить месяц"}></InputSubmit>
          </form>
        </VanishingContainer>
      </AddFormContentWrapper>
    </>
  );
}
