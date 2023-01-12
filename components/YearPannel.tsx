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
  const yearList = db
    .map((yearItem: any) => {
      return yearItem.year;
    })
    .sort((a: number, b: number) => {
      return a - b;
    });

  return (
    <Container>
      <SmallRectangle />
      {yearList.map((yearItem: any) => {
        return (
          <CustomLink
            text={yearItem}
            isHighlighted={yearItem === year}
            key={yearItem}
            onClick={() => {
              onChange(yearItem);
            }}
          ></CustomLink>
        );
      })}
      <Rectangle />
    </Container>
  );
}
