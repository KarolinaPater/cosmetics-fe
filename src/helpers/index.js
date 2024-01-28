import {
  main_category_options,
  product_capacity_options,
  secondary_category_options,
} from "../consts/product";
import dayjs from "dayjs";

//funkcja przyjmuje category (face etc) a zwrace jej polskie nazwy
export const mainCategoryHelper = (category) => {
  //tworzymy zmienna znalezionaOpcja ktora...
  //na tablicy z opcjami (main_category_options)
  //uzywamy metody find(znajdz jeden) ta metoda przeszukuje nam cala tablice
  // opcja jako kazda kolejn a opcja tablicy i przyruwnuje ja do (category czyli wartosci wejsciowerj)
  // jesli znajdze nam taka opcje
  // to przypisuje ja do zmniennej findedOption
  const findedOption = main_category_options?.find(
    (option) => option.value === category
  );
  // i na koniec zwracamy returenm label znalezionej opcji
  return findedOption?.label || "unknown"; //return findedOption.label || null;
};

export const secondaryCategoryHelper = (category) => {
  const findedOption = secondary_category_options?.find(
    (option) => option.value === category
  );
  return findedOption?.label;
};

export const productCapacityHelper = (category) => {
  const findedOption = product_capacity_options?.find(
    (option) => option.value === category
  );
  return findedOption?.label;
};

export const dateFormatter = (date) => {
  return date ? dayjs(date).format("DD-MM-YYYY") : "-";
};

export const productPricePerUnitHelper = (product_price, product_capacity) => {
  return (product_price / product_capacity).toFixed(2);
};
