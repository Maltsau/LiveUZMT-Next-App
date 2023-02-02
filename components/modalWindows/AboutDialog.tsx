import styled from "styled-components";

import ModalDialog from "./ModalDialog";
import CustomLink from "../buttons/CustomLink";

import {
  SmallRectangle,
  Rectangle,
  AddFormContentWrapper,
  PannelContainer,
} from "../menuComponents/AdditionalComponents";

import { useUserStore } from "../../stores/useUserStore";
import { useState } from "react";

const Container = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  padding: 10px;
  background-color: #f3f5f6;
  min-height: 600px;
`;

const Paragraph = styled.p`
  text-align: justify;
  background-color: #f3f5f6;
`;

const PannelContainerAbout = styled(PannelContainer)`
  background-color: transparent;
`;

interface AboutDialogProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AboutDialog({ isVisible, onClose }: AboutDialogProps) {
  const [mode, setMode] = useState("Геолог");
  const user = useUserStore();
  const buttonArray: string[] = ["Геолог"];
  if (user?.user.role === "ADMIN") buttonArray.push("Инженер", "Начальник");
  else if (user?.user.role === "EDITOR") buttonArray.push("Инженер");
  return (
    <ModalDialog
      isNotTransparent={false}
      isVisible={isVisible}
      onClose={onClose}
    >
      <PannelContainerAbout isAdmin={true}>
        <SmallRectangle />
        {buttonArray.map((option) => {
          return (
            <CustomLink
              key={option}
              text={option}
              isHighlighted={option === mode}
              onClick={(e: React.SyntheticEvent) => {
                e.stopPropagation();
                setMode(option);
              }}
            ></CustomLink>
          );
        })}
        <Rectangle />
      </PannelContainerAbout>
      <AddFormContentWrapper isAdmin={true}>
        <Container isVisible={mode === "Геолог"}>
          <Paragraph>Здравствуйте!</Paragraph>
          <Paragraph>
            Представляем Вашему вниманию приложение, созданное для облегчения
            оперативного информирования специалистов НГДУ “Речицанефть” и других
            заинтересованных специалистов о результатах ииследований с помощью
            УЗМ.Т. Также приложение позволяет контролировать выполнение плановых
            показателей в части указанных выше исследований в рамках текущего и
            прошедших месяцев.
          </Paragraph>
          <Paragraph>
            Для оптимизации работы с приложением прилагаем краткое описание
            интерфейса:
          </Paragraph>
          <Paragraph>
            1. На домашней странице во вкладке “Операции” находится список
            скважин, исследуемых в текущем месяце с указанием даты начала
            исследований.
          </Paragraph>
          <Paragraph>
            2. Сменить текущий месяц можно при помощи вкладок с названиями
            месяцев и лет в верхней части страницы.
          </Paragraph>
          <Paragraph>
            3. Ознакомиться с результатами исследований необходимой скважины
            можно в выпадающей таблице, которая появится по клику на название
            скважины. В таблице также размещены ссылки для скачивания
            Excell-файлов и фотографий результатов замеров, добавленных
            инженерами УЗМ.Т.
          </Paragraph>
          <Paragraph>
            4. Во вкладке “Статистика” находится таблица показателей выполнения
            плана в выбранном месяце, включая среднюю продолжительность
            операции.
          </Paragraph>
          <Paragraph>
            5. По клику на иконку “увеличительного стекла” в верхней части
            экрана доступна страница поиска по базе данных выполненных операций.
          </Paragraph>
          <Paragraph>Надеемся, данный продукт будет Вам полезен!</Paragraph>
        </Container>
        <Container isVisible={mode === "Инженер"}>
          <Paragraph>
            Пользователям, авторизованным в качестве инженера, доступна функция
            добавления записей в базу данных. Форма добавления записи появится
            после нажатия кнопки “Добавить запись” в нижнем меню. Во избежание
            путаницы и обеспечения корректной работы приложения следуйте
            нескольким простым правилам:
          </Paragraph>
          <Paragraph>
            1. При вводе дробных чисел пользуйтесь ‘.’ в качестве разделителя –
            в противном случае форма не будет провалидирована и появится
            сообщение об ошибке.
          </Paragraph>
          <Paragraph>
            2. При вводе названия месторождения используйте подсказки из
            выпадающего меню. В случае отсутствия меторождения в подсказках
            можно добавить новое название, но злоупотребление этим может
            привести к тому, что приложение будет считать одну и ту же скважину
            разными по причине отличия названия на один символ.
          </Paragraph>
          <Paragraph>
            3. Названия месторождений в базе данных записано заглавными буквами,
            ваша запись также приводится к верхнему регистру, но сложносоставные
            названия следует записывать, сокращая первое слово, например,
            Ю.-Осташковичская, З.-Сосновская, Н.-Давыдовская, В.-Дроздовская.
            Исключение составляет префикс “Старо-”, он записывается полностью:
            Старо-Малодушинская.
          </Paragraph>
          <Paragraph>
            4. При вводе номера скважины по возможности указывайте полный номер,
            включая буквенную часть – приложение воспримет скважины с разными
            номерами, как разные скважины.
          </Paragraph>
          <Paragraph>
            5. При попытке добавить первую скважину в месяце, для которого
            начальник не ввел плановые показатели, Вам предоставится возможность
            сделать это самим. Не пугайтесь – эти цифры можно легко изменить
            через меню “Начальника”.
          </Paragraph>
          <Paragraph>Приятного использования!</Paragraph>
        </Container>
        <Container isVisible={mode === "Начальник"}>
          <Paragraph>
            Начальнику доступен максимальный диапазон возможностей приложения:
            кроме возможности добавлять записи, доступной инженеру, начальник
            может удалять как операцию целиком, так и отдельне записи о замерах,
            а также редактировать и вводить заданные плановые показатели.
          </Paragraph>
          <Paragraph>
            1. Чтобы войти в режим редактирования, нужно нажать кнопку
            “Редактировать записи” в нижнем меню. Напротив названия операции
            появится иконка “Удалить” в виде мусорного ведра. Нажатие на эту
            иконку приведет к удалению из базы данных записи о данной операции.
          </Paragraph>
          <Paragraph>
            2. В режиме редактирования иконки “Удалить” появятся также в каждой
            строке выпадающей таблицы. Нажатие на эту иконку приведет к удалению
            записи, отображенной в данной строке.
          </Paragraph>
          <Paragraph>
            3. Редактирование плановых показателей доступно в режиме
            редактирования во вкладке “Статистика”. В таблице вместо значений
            “План, опреаций” и “Средняя планируемая продолжительность операции”
            появятся поля ввода, в которых можно ввести новые значения (целые
            положительные числа). Сохранить изменения можно, нажав красную
            кнопку “Сохранить изменения”, расположенную поверх таблицы.
          </Paragraph>
          <Paragraph>
            4. Закончив редактирование, нажмите кнопку “Закончить
            редактирование”.
          </Paragraph>
          <Paragraph>
            5. Добавление нового месяца доступно на странице добавления записи
            во вкладке “Начальник”.
          </Paragraph>
          <Paragraph>
            Приятного администрирования! Постарайтесь не сломать!
          </Paragraph>
        </Container>
      </AddFormContentWrapper>
    </ModalDialog>
  );
}
