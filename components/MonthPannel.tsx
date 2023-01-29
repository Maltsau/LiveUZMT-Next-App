import styled from "styled-components";
import MONTH_MAP from "../services/monthMap";
import { useMainStore } from "../stores/useMainStore";
import { useDataBaseStore } from "../stores/useDataBaseStore";

import CustomLink from "./buttons/CustomLink";
import {
  Rectangle,
  SmallRectangle,
} from "./menuComponents/AdditionalComponents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2px 0px;
`;

const ButtonBar = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  padding-top: 2px;
  order: ${({ isHighlighted }) => (isHighlighted ? "2" : "1")};
`;

export default function MonthPannel() {
  const { year, month, setMonth } = useMainStore();
  const dataBase = useDataBaseStore();
  const currentYear = dataBase.dataBase
    .find((yearItem) => yearItem.year === year)
    ?.months?.map((monthItem) => {
      return monthItem.month;
    })
    .map((item: any) => {
      return [...MONTH_MAP.keys()].find((key) => MONTH_MAP.get(key) === item);
    })
    .sort((a, b) => {
      return a! - b!;
    })
    .map((month) => {
      return MONTH_MAP.get(month!);
    });

  const yearHalf: Array<string> = [];
  const yearRest: Array<string> = [];
  currentYear?.forEach((element, index) => {
    if (index < 6 && element) {
      yearHalf.push(element);
    } else if (element) {
      yearRest.push(element);
    }
  });
  return (
    <Wrapper>
      {yearHalf.length ? (
        <ButtonBar isHighlighted={yearHalf.includes(month)}>
          <SmallRectangle />
          {yearHalf.map((monthItem) => {
            return (
              <CustomLink
                onClick={() => {
                  setMonth(monthItem);
                }}
                key={monthItem}
                text={monthItem}
                isHighlighted={monthItem === month}
              />
            );
          })}
          <Rectangle />
        </ButtonBar>
      ) : null}
      {yearRest.length ? (
        <ButtonBar isHighlighted={yearRest.includes(month)}>
          <SmallRectangle />
          {yearRest.map((monthItem) => {
            return (
              <CustomLink
                onClick={() => {
                  setMonth(monthItem);
                }}
                key={monthItem}
                text={monthItem}
                isHighlighted={monthItem === month}
              />
            );
          })}
          <Rectangle />
        </ButtonBar>
      ) : null}
    </Wrapper>
  );
}
