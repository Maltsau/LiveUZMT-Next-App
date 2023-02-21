import styled from "styled-components";
import Image from "next/image";
import { DataBaseType, SingleOpType } from "../../types/types";
import { useUserStore } from "../../stores/useUserStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const getButtonColor = ({
  isCurrent,
  department,
}: {
  isCurrent: boolean;
  department: number;
}) => {
  if (isCurrent) {
    return "red";
  } else if (department === 1) {
    return "#72A0C1";
  } else {
    return "#008E97";
  }
};

const UpperTrapezoid = styled.div<{
  isCurrent: boolean;
  department: number;
}>`
  max-height: 0px;
  border-bottom: 20px solid ${({ isCurrent, department }) =>
    getButtonColor({ isCurrent, department })}};
  border-right: 10px solid transparent;
`;

const LowerTrapezoid = styled.div<{
  isCurrent: boolean;
  department: number;
}>`
  border-top: 20px solid ${({ isCurrent, department }) =>
    getButtonColor({ isCurrent, department })}};
  border-right: 10px solid transparent;
`;

const ButtonStyled = styled.span<{
  isCurrent: boolean;
}>`
  display: flex;
  position: relative;
  background-color: transparent;
  top: 10px;
  padding-left: 5px;
  color: white;
`;

const ButtonStyledActive = styled.div<{
  isCurrent: boolean;
}>`
  position: relative;
  background-color: transparent;
  display: flex;
  top: 2px;
  font-size: 0.9em;
  padding-left: 5px;
  color: white;
`;

const InnerContainer = styled.span`
  position: relative;
  display: flex;
`;

const DeleteButton = styled.span<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableRow = styled.tr`
  height: 20px;
`;

const Cell = styled.td`
  text-align: center;
  padding: 10px;
  border: solid black 1px;
`;

const DeleteTableButton = styled.button`
  border: 0;
  background-color: transparent;
  justify-self: end;
`;

const FileIconsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DurationContainer = styled.div`
  display: flex;
  margin-left: auto;
  font-size: 0.9em;
  align-item: center;
`;

export default function OperationButton({
  operation,
  isEditMode,
  onClick,
  onSecondClick,
  onDeleteOperation,
  onDeleteRecord,
  text,
  duration,
  isHighlighted,
  isDeleteble,
  isCurrent,
  department,
}: {
  operation: SingleOpType;
  isEditMode: boolean;
  onClick?: any;
  onSecondClick?: any;
  onDeleteOperation: any;
  onDeleteRecord: (dateTime: string) => void;
  text: string;
  duration?: string;
  isHighlighted: boolean;
  isDeleteble: boolean;
  isCurrent: boolean;
  department: number;
}) {
  const user = useUserStore();
  const [parent] = useAutoAnimate<HTMLTableSectionElement>();
  if (isHighlighted) {
    return (
      <Container onClick={onSecondClick}>
        <UpperTrapezoid department={department} isCurrent={isCurrent}>
          <ButtonStyledActive isCurrent={isCurrent}>{text}</ButtonStyledActive>
        </UpperTrapezoid>
        <InnerContainer>
          <Table>
            <thead>
              <TableRow>
                <Cell>Дата, время</Cell>
                <Cell>Дебит, т/сут</Cell>
                <Cell>
                  Плотность <br></br> жидкости, <br></br> кг/м<sup>3</sup>
                </Cell>
                <Cell>
                  Обводнён-<br></br>ность, <br></br> %
                </Cell>
                <Cell>Дополнительно</Cell>
                {user?.user.role === "ADMIN" && isEditMode ? (
                  <Cell>Действия</Cell>
                ) : null}
              </TableRow>
            </thead>
            <tbody ref={parent}>
              {operation.result.map((result: any) => {
                return (
                  <TableRow key={result.index}>
                    <Cell>{result.dateTime}</Cell>
                    <Cell>{result.debitMass}</Cell>
                    <Cell>{result.density}</Cell>
                    <Cell>{result.watterRate}</Cell>
                    <Cell>
                      <FileIconsContainer>
                        <Image
                          src="/excell.svg"
                          height={20}
                          width={20}
                          alt="EXSELL"
                        />
                        <Image
                          src="/add-photo.png"
                          height={20}
                          width={20}
                          alt="PHOTO"
                        />
                      </FileIconsContainer>
                    </Cell>
                    {user?.user.role === "ADMIN" && isEditMode ? (
                      <Cell>
                        <DeleteTableButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteRecord(result.dateTime);
                          }}
                        >
                          <Image
                            src="/delete.png"
                            height={20}
                            width={20}
                            alt="DELETE"
                          />
                        </DeleteTableButton>{" "}
                      </Cell>
                    ) : null}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </InnerContainer>
        <LowerTrapezoid department={department} isCurrent={isCurrent} />
      </Container>
    );
  } else {
    return (
      <Container onClick={onClick}>
        <UpperTrapezoid department={department} isCurrent={isCurrent}>
          <ButtonStyled isCurrent={isCurrent}>
            <span>{text}</span>
            <DurationContainer>
              {!isCurrent ? `Продолжительность ${duration} ч.` : null}
              <DeleteButton
                isVisible={isDeleteble}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOperation();
                }}
              >
                <Image
                  style={{ filter: "invert(100%)" }}
                  src="/delete.png"
                  height={20}
                  width={20}
                  alt="DELETE"
                />
              </DeleteButton>
            </DurationContainer>
          </ButtonStyled>
        </UpperTrapezoid>
        <LowerTrapezoid department={department} isCurrent={isCurrent} />
      </Container>
    );
  }
}
