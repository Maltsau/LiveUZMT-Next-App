import styled from "styled-components";
import MONTH_MAP from "../services/monthMap";
import { useMainStore } from "../stores/useMainStore";

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

export default function MonthPannel({ db }: { db: any }) {
  const { year, month, setMonth } = useMainStore();
  const currentYear = db
    .find((yearItem: any) => yearItem.year === year)
    ?.months?.map((monthItem: any) => {
      return monthItem.month;
    })
    .map((item: any) => {
      return [...MONTH_MAP.keys()].find((key) => MONTH_MAP.get(key) === item);
    })
    .sort((a: number, b: number) => {
      return a - b;
    })
    .map((month: number) => {
      return MONTH_MAP.get(month);
    });

  const yearHalf: Array<string> = [];
  const yearRest: Array<string> = [];
  currentYear?.forEach((element: string, index: number) => {
    if (index < 6) {
      yearHalf.push(element);
    } else {
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
