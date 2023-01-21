import styled, { StyledComponent } from "styled-components";

export const Rectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 100%;
`;

export const SmallRectangle = styled.div`
  height: 30px;
  border-bottom: solid red 2px;
  width: 30px;
`;

export const PannelContainer = styled.div<{
  isAdmin: boolean;
}>`
  display: ${({ isAdmin }) => (isAdmin ? "flex" : "none")};
  width: 100%;
  margin-top: 2px;
  padding: 1px 1px 1px 1px;
`;

export const AddFormContentWrapper = styled.div<{
  isAdmin: boolean;
}>`
  padding: 2px;
  margin: -1px 1px 1px 1px;
  ${({ isAdmin }) =>
    isAdmin
      ? "border-right: 2px solid red; border-left: 2px solid red;border-bottom: 2px solid red;"
      : "border: 2px solid red"};
`;

export const GridBorderedContainer = styled.div<{
  gridColumns: string;
}>`
  display: grid;
  grid-template-columns: ${(props) => props.gridColumns};
  border: 1px red solid;
  border-radius: 5px;
  margin-bottom: 3px;
`;

export const GridUnborderedContainer = styled.div<{
  gridColumns: string;
}>`
  display: grid;
  justify-items: stretch;
  overflow: auto;
  width: 100%;
  grid-template-columns: ${(props) => props.gridColumns};
  grid-column-gap: 5px;
  padding: 2px;
  overflow: hidden;
`;

export const VanishingContainer = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;
