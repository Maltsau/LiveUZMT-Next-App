import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { useUserStore } from "../../stores/useUserStore";
import { useAddMonth } from "../../hooks/useAddMonth";
import ky from "ky";

import MONTH_MAP from "../../services/monthMap";

import {
  InputSimple,
  InputSubmit,
  SelectStyled,
  ErrorDiv,
  ErrorParagraph,
} from "../menuComponents/Inputs";
import {
  GridBorderedContainer,
  GridUnborderedContainer,
} from "../menuComponents/AdditionalComponents";

const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 0;
`;

const SpanStyled = styled.span<{ minHeight?: number }>`
  margin: 0 10px;
  min-height: ${(props) => props.minHeight}px;
  vertical-align: bottom;
`;

// const ErrorDiv = styled.div`
//   color: red;
//   margin: 0;
//   padding: 0;
//   height: 20px;
//   font-size: 0.6em;
// `;

// const ErrorParagraph = styled.p`
//   margin: 0 10px;
// `;

type Inputs = {
  year: number;
  month: string | undefined;
  planOps: string;
  wishfullAverageLength: string;
};

export default function AddMonthForm() {
  const now = new Date();

  const {
    data: addMonthResponse,
    mutate: addMonth,
    mutateAsync: addMonthAsync,
  } = useAddMonth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      year: now.getFullYear(),
      month: MONTH_MAP.get(now.getMonth()),
      planOps: "",
      wishfullAverageLength: "",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    console.log(data);
    addMonth({
      year: Number(data.year),
      month: data.month,
      planOps: Number(data.planOps),
      wishfullAverageLength: Number(data.wishfullAverageLength),
    });
  };

  const yearIterator: number[] = new Array();

  for (let i = 2007; i < now.getFullYear() + 10; i++) {
    yearIterator.push(i);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridUnborderedContainer gridColumns="1fr 1fr 1fr 1fr">
        <LabelStyled>
          <SpanStyled minHeight={72}>Месяц</SpanStyled>
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
          <SpanStyled minHeight={72}>Год</SpanStyled>
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
          <SpanStyled minHeight={72}>Количество операций по плану</SpanStyled>
          <InputSimple
            {...register("planOps", {
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[0-9]*[.,]?[0-9]+$/,
                message: "Количество операций должно быть числом",
              },
              min: {
                value: 0,
                message: "Количество операций должно быть больше нуля",
              },
            })}
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
          <SpanStyled minHeight={72}>
            Средняя планируемая продолжительность операции, час
          </SpanStyled>
          <InputSimple
            {...register("wishfullAverageLength", {
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[0-9]*[.,]?[0-9]+$/,
                message: "Продолжительность должна быть числом",
              },
              min: {
                value: 0,
                message: "Продолжительность должна быть больше нуля",
              },
            })}
          ></InputSimple>
          <ErrorDiv>
            {errors.wishfullAverageLength && (
              <ErrorParagraph>
                {errors.wishfullAverageLength?.message || "Ошибка заполнения"}
              </ErrorParagraph>
            )}
          </ErrorDiv>
        </LabelStyled>
      </GridUnborderedContainer>
      <InputSubmit type={"submit"} value={"Добавить месяц"}></InputSubmit>
    </form>
  );
}
