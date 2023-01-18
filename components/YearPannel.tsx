import styled from "styled-components";

import { useMainStore } from "../stores/useMainStore";

import CustomLink from "./buttons/CustomLink";

import { DataBaseType } from "../types/types";

const Container = styled.div`
  display: flex;
  margin-top: 2px;
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

export default function YearPannel({ db }: { db: DataBaseType | undefined }) {
  const { year, setYear } = useMainStore();
  const yearList = db
    ?.filter((yearItem) => yearItem.months.length)
    .map((yearItem) => yearItem.year)
    .sort((a: number, b: number) => {
      return a - b;
    });

  return (
    <Container>
      <SmallRectangle />
      {yearList?.map((yearItem: any) => {
        return (
          <CustomLink
            text={yearItem}
            isHighlighted={yearItem === year}
            key={yearItem}
            onClick={() => {
              setYear(yearItem);
            }}
          ></CustomLink>
        );
      })}
      <Rectangle />
    </Container>
  );
}
