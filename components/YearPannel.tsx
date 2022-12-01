import styled from "styled-components";

import db from "../services/db";
import CustomLink from "./buttons/CustomLink";

const Container = styled.div`
  display: flex;
  margin-top: 2px;
  padding: 2px 2px 0px 2px;
`;

const Rectangle = styled.div`
  height: 28px;
  border-bottom: solid red 2px;
  width: 100%;
  margin-left: -1px;
`;

const SmallRectangle = styled.div`
  height: 28px;
  border-bottom: solid red 2px;
  width: 30px;
  margin-right: -1px;
`;

export default function YearPannel({
  year,
  onChange,
}: {
  year: number;
  onChange: any;
}) {
  return (
    <Container>
      <SmallRectangle />
      {db.map((yearItem) => {
        return (
          <CustomLink
            text={yearItem.year}
            isHighlighted={yearItem.year === year}
            key={yearItem.year}
            onClick={() => {
              onChange(yearItem.year);
            }}
          ></CustomLink>
        );
      })}
      <Rectangle />
    </Container>
  );
}
