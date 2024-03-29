import styled from "styled-components";

import CustomLink from "./buttons/CustomLink";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2px 0px;
`;

const ButtonBar1 = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  padding-top: 2px;
  order: ${({ isHighlighted }) => (isHighlighted ? "2" : "1")};
`;

const ButtonBar2 = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  padding-top: 2px;
  order: ${({ isHighlighted }) => (isHighlighted ? "2" : "1")};
`;

const Rectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 100%;
  margin-left: -6px;
`;

const SmallRectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 100px;
`;

export default function MonthPannel({
  db,
  year,
  month,
  onChange,
}: {
  db: any;
  year: number;
  month: string;
  onChange: any;
}) {
  const currentYear = db
    .find((yearItem: any) => yearItem.year === year)
    .months.map((monthItem: any) => {
      return monthItem.month;
    });
  const yearHalf: Array<string> = [];
  const yearRest: Array<string> = [];
  currentYear.forEach((element: string, index: number) => {
    if (index < 6) {
      yearHalf.push(element);
    } else {
      yearRest.push(element);
    }
  });
  return (
    <Wrapper>
      <ButtonBar1 isHighlighted={yearHalf.includes(month)}>
        <SmallRectangle />
        {yearHalf.map((monthItem) => {
          return (
            <CustomLink
              onClick={() => {
                onChange(monthItem);
              }}
              key={monthItem}
              text={monthItem}
              isHighlighted={monthItem === month}
            />
          );
        })}
        <Rectangle />
      </ButtonBar1>
      <ButtonBar2 isHighlighted={yearRest.includes(month)}>
        <SmallRectangle />
        {yearRest.map((monthItem) => {
          return (
            <CustomLink
              onClick={() => {
                onChange(monthItem);
              }}
              key={monthItem}
              text={monthItem}
              isHighlighted={monthItem === month}
            />
          );
        })}
        <Rectangle />
      </ButtonBar2>
    </Wrapper>
  );
}
