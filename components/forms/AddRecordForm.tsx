import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CreatableSelect, { useCreatable } from "react-select/creatable";
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
  ErrorDiv,
  ErrorParagraph,
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

// const DurationLabel = styled(LabelStyled)`
//   grid-column: 2 / 4;
// `;

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

interface OptionType {
  readonly value: string;
  readonly label: string;
}

export default function AddRecordForm({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const now = new Date();
  const queryClient = useQueryClient();
  const [addMonthModalVisible, setAddMonthModalVisible] = useState(false);
  const [isNewMonthBlockVisible, setIsNewMonthBlockVisible] = useState(false);
  const [isNewMonthBlockAlarmed, setIsNewMonthBlockAlarmed] = useState(false);

  const { data: fieldBase } = useQuery("GET_FIELD_BASE", async () => {
    const res = await ky.get("api/fieldBaseApi");
    return await res.json<[string]>();
  });

  const { mutate: addField } = useMutation(
    "ADD_FIELD",
    async ({ field }: { field: string }) => {
      await ky
        .post("api/fieldBaseApi", { json: { field } })
        .json<{ message: string }>();
    }
  );

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
            field: field.toUpperCase(),
            department: Number(department),
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
        if (res.message === "Month does not exist") {
          setAddMonthModalVisible(true);
          setIsNewMonthBlockAlarmed(true);
        } else {
          queryClient.invalidateQueries("REQUEST_DATA_BASE");
          setIsNewMonthBlockVisible(false);
          reset();
          onSuccess();
        }
      },
      onError: () => {
        onError();
      },
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    control,
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

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    addRecord(data);
    if (!fieldBase?.includes(data.field)) {
      addField({ field: data.field.toUpperCase() });
    }
  };

  let options: OptionType[] = [];
  if (fieldBase) {
    options = fieldBase.map((field) => {
      return { value: field, label: field };
    });
  }

  const getValue = (value: string) => {
    return value ? options.find((field) => field.value === value) : "";
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
        <GridUnborderedContainer gridColumns={"repeat(auto-fill, 1fr)"}>
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
        </GridUnborderedContainer>
        <GridUnborderedContainer gridColumns="repeat(auto-fill, 1fr)">
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
                {...register("hours", {
                  required: "Поле обязательно к заполнению",
                  maxLength: 2,
                })}
              ></InputSimple>
              <InputSimple
                {...register("minutes", {
                  required: "Поле обязательно к заполнению",
                  maxLength: 2,
                })}
              ></InputSimple>
            </FlexInlineContainer>
          </LabelStyled>
        </GridUnborderedContainer>
        <GridUnborderedContainer gridColumns="repeat(auto-fill, 1fr)">
          <LabelStyled>
            <SpanStyled>Номер скважины</SpanStyled>
            <InputSimple
              {...register("number", {
                required: "Поле обязательно к заполнению",
              })}
            ></InputSimple>
            <ErrorDiv>
              {errors.number && (
                <ErrorParagraph>
                  {errors.number.message || `Ошибка заполнения`}
                </ErrorParagraph>
              )}
            </ErrorDiv>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Месторождение</SpanStyled>
            <Controller
              control={control}
              name={"field"}
              rules={{ required: "Поле обязательно к заполнению" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <CreatableSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder={"Введите месторождение"}
                    isSearchable
                    options={options}
                    value={getValue(value)}
                    onChange={(newValue) =>
                      onChange((newValue as OptionType).value)
                    }
                  ></CreatableSelect>
                  <ErrorDiv>
                    {errors.field && (
                      <ErrorParagraph>
                        {errors.field.message || `Ошибка заполнения`}
                      </ErrorParagraph>
                    )}
                  </ErrorDiv>
                </>
              )}
            ></Controller>
          </LabelStyled>
          <LabelStyled>
            <SpanStyled>Промысел</SpanStyled>
            <SelectStyled {...register("department", { required: true })}>
              <option value={1}>{"ЦДНГ-1"}</option>
              <option value={2}>{"ЦДНГ-2"}</option>
            </SelectStyled>
          </LabelStyled>
        </GridUnborderedContainer>
        <GridUnborderedContainer gridColumns="repeat(auto-fill, 1fr)">
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
        </GridUnborderedContainer>
        <GridUnborderedContainer gridColumns="1fr 2fr">
          <LabelStyled>
            <CheckboxContainer>
              <SpanStyled minHeight={40}>
                Замер окончен?
                <CheckboxStyled
                  onClick={() => resetField("duration")}
                  type={"checkbox"}
                  {...register("isFinal", {})}
                />
              </SpanStyled>
            </CheckboxContainer>
          </LabelStyled>
          <LabelStyled>
            <InputVanishing
              isVisible={watchInputs.isFinal}
              placeholder={"Введите продолжительность"}
              {...register("duration", {
                required: watchInputs.isFinal
                  ? "Поле обязательно к заполнению"
                  : false,
                pattern: {
                  value: /^[0-9]*[.,]?[0-9]+$/,
                  message: "Продолжительность должна быть числом",
                },
                min: {
                  value: 0,
                  message: "Продолжительность должна больше нуля",
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
                required: isNewMonthBlockVisible
                  ? "Поле обязательно к заполнению"
                  : false,
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
                required: isNewMonthBlockVisible
                  ? "Поле обязательно к заполнению"
                  : false,
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
        </AddButtonsContainer>
        <InputSubmit type={"submit"} value={"Добавить"}></InputSubmit>
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
