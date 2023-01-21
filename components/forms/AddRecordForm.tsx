import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { useUserStore } from "../../stores/useUserStore";
import ky from "ky";

import MONTH_MAP from "../../services/monthMap";

import AddPhotoButton from "../buttons/AddPhotoButton";
import AddExcellButton from "../buttons/AddExcellButton";
import AddMonthModal from "../modalWindows/AddMonthModal";
import {
  InputSimple,
  InputVanishing,
  InputSubmit,
  SelectStyled,
} from "../menuComponents/Inputs";
import {
  GridBorderedContainer,
  GridUnborderedContainer,
} from "../menuComponents/AdditionalComponents";

const SpanStyled = styled.span<{ minHeight?: number }>`
  margin: 0 10px;
  min-height: ${(props) => props.minHeight}px;
  vertical-align: bottom;
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const FlexInlineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
  width: 100%;
  padding: 0 2px;
  justify-items: center;
  overflow: auto;
`;

const AddButtonsContainer = styled.div`
  display: flex;
`;

const CheckboxStyled = styled.input`
  height: 25px;
  width: 25px;
`;

const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 0;
`;

const CurrentTimeTitleLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 6;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const StartDateTitleLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const AddMonthContainer = styled.div<{
  isVisible: boolean;
  isAlarmed: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
  background-color: ${({ isAlarmed }) => (isAlarmed ? "pink" : "transparent")};
  overflow: auto;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  padding: 2px;
  margin: 2px 0px;
  border: solid red 1px;
  border-radius: 5px;
`;

const NewMonthLabelStyled = styled.label`
  margin: auto 10px;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 5px 3px;
  text-align: center;
  color: red;
  font-size: 1.2em;
`;

const AddContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const DropDownListContainer = styled.div<{
  isVisible: boolean;
}>`
  position: fixed;
  top: 374px;
  left: 214px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 293px;
  min-height: 20px;
  z-index: 20;
  border: 1px solid black;
  opacity: 1;
  background-color: white;
`;

const DropDownUl = styled.ul`
  font-size: 1em;
  margin: 0;
  list-style-type: none;
`;

const ErrorDiv = styled.div`
  color: red;
  margin: 0;
  padding: 0;
  height: 20px;
  font-size: 0.6em;
`;

const ErrorParagraph = styled.p`
  margin: 0 10px;
`;

type Inputs = {
  startDay: number;
  startMonth: string;
  startYear: number;
  day: number;
  month: string;
  year: number;
  hours: string;
  minutes: string;
  number: string;
  field: string;
  department: number;
  debitMass: string;
  density: string;
  watterRate: string;
  isFinal: boolean;
  duration?: string;
  newYear: number;
  newMonth: string;
  planOps?: string;
  wishfullAverageLength?: string;
};

export default function AddRecordForm() {
  const now = new Date();
  const user = useUserStore();
  const queryClient = useQueryClient();
  const [addMonthModalVisible, setAddMonthModalVisible] = useState(false);
  const [isNewMonthBlockVisible, setIsNewMonthBlockVisible] = useState(false);
  const [isNewMonthBlockAlarmed, setIsNewMonthBlockAlarmed] = useState(false);

  const {
    data: addResponse,
    mutate: addRecord,
    mutateAsync: addRecordAsync,
  } = useMutation(
    "ADD_RECORD",
    async ({
      startDay,
      startMonth,
      startYear,
      day,
      month,
      year,
      hours,
      minutes,
      number,
      field,
      department,
      debitMass,
      density,
      watterRate,
      isFinal,
      duration,
      planOps,
      wishfullAverageLength,
    }: Inputs) => {
      const res = await ky
        .post("/api/dataBaseApi", {
          json: {
            startDay,
            startMonth,
            startYear,
            day,
            month,
            year,
            hours,
            minutes,
            number,
            field,
            department,
            debitMass,
            density,
            watterRate,
            isFinal,
            duration,
            planOps,
            wishfullAverageLength,
          },
        })
        .json<{ message: string }>();
      return res;
    },
    {
      onSuccess: (res) => {
        console.log("onSuccess", res.message);
        console.log("onSuccess", res.message === "Month does not exist");
        if (res.message === "Month does not exist") {
          console.log(res.message);
          setAddMonthModalVisible(true);
          setIsNewMonthBlockAlarmed(true);
        } else {
          queryClient.invalidateQueries("REQUEST_DATA_BASE");
          setIsNewMonthBlockVisible(false);
          reset();
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      startDay: now.getDate(),
      startMonth: MONTH_MAP.get(now.getMonth()),
      startYear: now.getFullYear(),
      day: now.getDate(),
      month: MONTH_MAP.get(now.getMonth()),
      year: now.getFullYear(),
      hours: String(now.getHours()),
      minutes: String(now.getMinutes()),
      number: "",
      field: "",
      department: 1,
      debitMass: "",
      density: "",
      watterRate: "",
      isFinal: false,
      duration: "",
      newYear: now.getFullYear(),
      newMonth: MONTH_MAP.get(now.getMonth()),
      planOps: "",
      wishfullAverageLength: "",
    },
    mode: "all",
  });
  const watchInputs = watch();
  console.log("watch", watchInputs);
  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    console.log("Form", data, errors);
    addRecord(data);
  };

  const getDaysInMonth = (month: string | undefined, year: number) => {
    return (
      32 -
      new Date(
        year,
        [...MONTH_MAP.keys()].find((e) => MONTH_MAP.get(e) === month) ||
          now.getMonth(),
        32
      ).getDate()
    );
  };

  const startDayIterator: number[] = new Array();
  const dayIterator: number[] = new Array();
  const startYearIterator: number[] = new Array();
  const yearIterator: number[] = new Array();

  for (
    let i = 1;
    i < getDaysInMonth(watchInputs.startMonth, watchInputs.startYear) + 1;
    i++
  ) {
    startDayIterator.push(i);
  }
  for (
    let i = 1;
    i < getDaysInMonth(watchInputs.month, watchInputs.year) + 1;
    i++
  ) {
    dayIterator.push(i);
  }
  for (let i = 2007; i < now.getFullYear() + 10; i++) {
    startYearIterator.push(i);
  }
  for (let i = watchInputs.startYear; i < now.getFullYear() + 10; i++) {
    yearIterator.push(i);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridBorderedContainer gridColumns={"150px 1fr 150px"}>
          <StartDateTitleLabelStyled>
            Дата начала исследований
          </StartDateTitleLabelStyled>
          <LabelStyled>
            <SpanStyled>Число</SpanStyled>
            <SelectStyled {...register("startDay", { required: true })}>
              {startDayIterator.map((dayItem) => {
                return (
                  <option key={dayItem} value={dayItem}>
                    {dayItem}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Месяц</SpanStyled>
            <SelectStyled {...register("startMonth", { required: true })}>
              {[...MONTH_MAP.values()].map((mnth) => {
                return (
                  <option key={mnth} value={mnth}>
                    {mnth}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Год</SpanStyled>
            <SelectStyled {...register("startYear", { required: true })}>
              {startYearIterator.map((yearItem) => {
                return (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
        </GridBorderedContainer>
        <GridBorderedContainer gridColumns="150px 1fr 150px 150px">
          <CurrentTimeTitleLabelStyled>
            Текущее время
          </CurrentTimeTitleLabelStyled>
          <LabelStyled>
            <SpanStyled>Число</SpanStyled>
            <SelectStyled {...register("day", { required: true })}>
              {dayIterator.map((dayItem) => {
                return (
                  <option key={dayItem} value={dayItem}>
                    {dayItem}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Месяц</SpanStyled>
            <SelectStyled {...register("month", { required: true })}>
              {[...MONTH_MAP.values()].map((mnth) => {
                return (
                  <option key={mnth} value={mnth}>
                    {mnth}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Год</SpanStyled>
            <SelectStyled {...register("year", { required: true })}>
              {yearIterator.map((yearItem) => {
                return (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                );
              })}
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Время</SpanStyled>
            <FlexInlineContainer>
              <InputSimple
                {...register("hours", { required: true, maxLength: 2 })}
              ></InputSimple>
              <InputSimple
                {...register("minutes", { required: true, maxLength: 2 })}
              ></InputSimple>
            </FlexInlineContainer>
          </LabelStyled>
        </GridBorderedContainer>
        <GridUnborderedContainer gridColumns="200px 1fr 200px">
          <LabelStyled>
            <SpanStyled>Номер скважины</SpanStyled>
            <InputSimple
              {...register("number", { required: true })}
            ></InputSimple>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Месторождение</SpanStyled>
            <InputSimple
              {...register("field", { required: true })}
            ></InputSimple>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Промысел</SpanStyled>
            <SelectStyled {...register("department", { required: true })}>
              <option value={1}>{"ЦДНГ-1"}</option>
              <option value={2}>{"ЦДНГ-2"}</option>
            </SelectStyled>
          </LabelStyled>
        </GridUnborderedContainer>
        <GridUnborderedContainer gridColumns="repeat(4, 1fr)">
          <LabelStyled>
            <SpanStyled minHeight={40}>Дебит, т/сут</SpanStyled>
            <InputSimple
              {...register("debitMass", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Дебит должен быть числом",
                },
              })}
            ></InputSimple>
            <ErrorDiv>
              {errors.debitMass && (
                <ErrorParagraph>
                  {errors.debitMass.message || `Ошибка заполнения`}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled minHeight={40}>
              Удельный вес <br></br>жидкости, г/см<sup>3</sup>
            </SpanStyled>
            <InputSimple
              {...register("density", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Плотность должна быть числом",
                },
                min: { value: 0, message: "Плотность должна быть больше нуля" },
                max: {
                  value: 2,
                  message: `Плотность должна быть меньше двух`,
                },
              })}
            ></InputSimple>
            <ErrorDiv>
              {errors.density && (
                <ErrorParagraph>
                  {errors.density.message || "Ошибка заполнения"}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled minHeight={40}>Обводнённость, %</SpanStyled>
            <InputSimple
              {...register("watterRate", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Обводненность должна быть числом",
                },
                min: {
                  value: 0,
                  message: "Обводненность должна быть не меньше нуля",
                },
                max: {
                  value: 100,
                  message: `Обводненность должна быть не больше 100%`,
                },
              })}
            ></InputSimple>
            <ErrorDiv>
              {errors.watterRate && (
                <ErrorParagraph>{errors.watterRate?.message}</ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled minHeight={40}>
              Замер окончен?
              <CheckboxStyled type={"checkbox"} {...register("isFinal", {})} />
            </SpanStyled>
            <InputVanishing
              isVisible={watchInputs.isFinal}
              {...register("duration", {
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Продолжительность должна быть числом",
                },
                min: {
                  value: 0,
                  message: "Продолжительность должна быть не меньше нуля",
                },
              })}
            ></InputVanishing>
            <ErrorDiv>
              {errors.duration && (
                <ErrorParagraph>
                  {errors.duration?.message || "Ошибка заполнения"}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
        </GridUnborderedContainer>
        <AddMonthContainer
          isVisible={isNewMonthBlockVisible}
          isAlarmed={isNewMonthBlockAlarmed}
        >
          <NewMonthLabelStyled>Добавьте новый месяц</NewMonthLabelStyled>
          <LabelStyled>
            <SpanStyled minHeight={40}>Количество операций по плану</SpanStyled>
            <InputSimple
              {...register("planOps", {
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Количество операций должно быть числом",
                },
                min: {
                  value: 0,
                  message: "Количество операций должно быть больше нуля",
                },
              })}
              onFocus={() => {
                setIsNewMonthBlockAlarmed(false);
              }}
            ></InputSimple>
            <ErrorDiv>
              {errors.planOps && (
                <ErrorParagraph>
                  {errors.planOps?.message || "Ошибка заполнения"}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled minHeight={40}>
              Средняя планируемая продолжительность операции, час
            </SpanStyled>
            <InputSimple
              {...register("wishfullAverageLength", {
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Продолжительность должна быть числом",
                },
                min: {
                  value: 0,
                  message: "Продолжительность должна быть больше нуля",
                },
              })}
              onFocus={() => {
                setIsNewMonthBlockAlarmed(false);
              }}
            ></InputSimple>
            <ErrorDiv>
              {errors.wishfullAverageLength && (
                <ErrorParagraph>
                  {errors.wishfullAverageLength?.message || "Ошибка заполнения"}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
        </AddMonthContainer>
        <AddButtonsContainer>
          <AddPhotoButton></AddPhotoButton>
          <AddExcellButton></AddExcellButton>
          <div></div>
        </AddButtonsContainer>
        <InputSubmit
          type={"submit"}
          value={"Добавить"}
          // onClick={handleSubmit(onSubmit)}
        ></InputSubmit>
      </form>
      <AddMonthModal
        onSubmit={() => {
          setIsNewMonthBlockVisible(true);
          setIsNewMonthBlockAlarmed(true);
          setAddMonthModalVisible(false);
        }}
        isVisible={addMonthModalVisible}
        onClose={() => {
          setAddMonthModalVisible(false);
        }}
      ></AddMonthModal>
    </>
  );
}
