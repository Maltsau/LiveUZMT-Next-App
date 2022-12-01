import styled from "styled-components";

import CustomLink from "./buttons/CustomLink";

const Container = styled.div`
  display: flex;
  margin-top: 2px;
`;

const Rectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 100%;
  margin-left: 0px;
`;

const SmallRectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 30px;
  margin-right: 0px;
`;

export default function YearPannel({
  year,
  onChange,
  db,
}: {
  year: number;
  onChange: any;
  db: any;
}) {
  return (
    <Container>
      <SmallRectangle />
      {db.map((yearItem: any) => {
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
