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
`;

const SmallRectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 30px;
`;

export default function YearPannel({
  db,
  year,
  onChange,
}: {
  db: any;
  year: number;
  onChange: any;
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
