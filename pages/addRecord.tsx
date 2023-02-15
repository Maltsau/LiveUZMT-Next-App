import { useCallback, useEffect, useState } from "react";

import { useUserStore } from "../stores/useUserStore";

import styled from "styled-components";

import CustomLink from "../components/buttons/CustomLink";
import AddRecordForm from "../components/forms/AddRecordForm";
import AddMonthForm from "../components/forms/addMonthForm";
import SuccessDialog from "../components/modalWindows/SuccessDialog";
import ErrorDialog from "../components/modalWindows/ErrorDialog";
import {
  Rectangle,
  SmallRectangle,
  PannelContainer,
  AddFormContentWrapper,
  VanishingContainer,
} from "../components/menuComponents/AdditionalComponents";
import AddRecordForm2 from "../components/forms/AddRecordForm2";

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
  const [isSuccessDialogVisible, setIsSuccessDialogVisible] = useState(false);
  const [isErrorDialogVisible, setErrorDialogVisible] = useState(false);

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
          {/* <AddRecordForm
            onSuccess={() => {
              setIsSuccessDialogVisible(true);
            }}
            onError={() => {
              setIsSuccessDialogVisible(true);
            }}
          /> */}
          <AddRecordForm2
            onSuccess={() => {
              setIsSuccessDialogVisible(true);
            }}
            onError={() => {
              setIsSuccessDialogVisible(true);
            }}
          />
        </VanishingContainer>
        <VanishingContainer isVisible={adminPannel}>
          <AddMonthForm
            onSuccess={() => {
              setIsSuccessDialogVisible(true);
            }}
            onError={() => {
              setIsSuccessDialogVisible(true);
            }}
          />
        </VanishingContainer>
      </AddFormContentWrapper>
      <SuccessDialog
        onClose={() => {
          setIsSuccessDialogVisible(false);
        }}
        isVisible={isSuccessDialogVisible}
        message={"Запись успешно добавлена"}
      ></SuccessDialog>
      <ErrorDialog
        onClose={() => {
          setErrorDialogVisible(false);
        }}
        isVisible={isErrorDialogVisible}
        message={"При добавлении записи произошла ошибка"}
      ></ErrorDialog>
    </>
  );
}
