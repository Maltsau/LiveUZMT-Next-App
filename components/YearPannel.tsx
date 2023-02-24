import styled from "styled-components";
import { useMainStore } from "../stores/useMainStore";

import CustomLink from "./buttons/CustomLink";
import {
  Rectangle,
  SmallRectangle,
} from "./menuComponents/AdditionalComponents";

import { DataBaseType } from "../types/types";
import { useDataBaseStore } from "../stores/useDataBaseStore";
import FolderLabel from "./buttons/FolderLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`;

const ButtonBar = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  padding-top: 2px;
  order: ${({ isHighlighted }) => (isHighlighted ? "3" : "1")};
`;

export default function YearPannel() {
  const { year, setYear } = useMainStore();
  const dataBase = useDataBaseStore();
  const yearList = dataBase.dataBase
    .filter((yearItem) => yearItem.months.length)
    .map((yearItem) => yearItem.year)
    .sort((a: number, b: number) => {
      return a - b;
    });

  const firstSix: Array<number> = [];
  const secondSix: Array<number> = [];
  const rest: Array<number> = [];

  yearList?.forEach((year, index) => {
    if (index < 7) firstSix.push(year);
    else if (index < 14) secondSix.push(year);
    else rest.push(year);
  });

  const getBarContent = (arr: Array<number>) => {
    return arr.length ? (
      <ButtonBar isHighlighted={arr.includes(year)}>
        <SmallRectangle />
        {arr?.map((yearItem: any) => {
          return (
            <FolderLabel
              text={yearItem}
              isHighlighted={yearItem === year}
              key={yearItem}
              onClick={() => {
                setYear(yearItem);
              }}
            ></FolderLabel>
          );
        })}
        <Rectangle />
      </ButtonBar>
    ) : null;
  };

  return (
    <Container>
      {getBarContent(firstSix)}
      {getBarContent(secondSix)}
      {getBarContent(rest)}
    </Container>
  );
}
