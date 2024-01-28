import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
//const userFormat = "D.M.YYYY H:mm:ss [GMT]Z (z)";

//funckja wyswietlająca date ostatecznego zuzycia ->
//najpierw funkcja na podstawie pao oblicza date waznosci zgodną z pao
//tj. wysokosc w liczbie pao to ilosc miesiecy jakie należy dodać do daty otwarcia
// obliczenie daty PAO
// następuje porównanie - która data jest mniejsza
//wyświetla date ważności lub date pao

export const handleCaltulateExpirationDate = (start, pao, expiration) => {
  if (start && pao && !expiration) {
    return dayjs(start)?.format("DD-MM-YYYY");
    //  return dayjs(start).format("DD-MM-YYYY").add(pao, "month");
    // do start daty dodaj liczbę pao i zwróc paodate jako final expiratgion date
  }

  if (start && !pao && expiration) {
    //zwróć expiration date.

    return dayjs(expiration);
  }

  if (start && pao && expiration) {
    const data_after_pao = dayjs(start).add(pao, "month");
    const new_expiration_date = dayjs(expiration);
    const isAfterPao = dayjs(new_expiration_date).isAfter(data_after_pao);

    if (isAfterPao) {
      return dayjs(data_after_pao)?.format("DD-MM-YYYY");
    } else {
      return dayjs(new_expiration_date)?.format("DD-MM-YYYY");
    }

    //porownac i zwrocic mniejszą
    //do start date dodaj liczbę pao. Porównaj date pao i date expiration. Wyświetl mniejszą date jako final expiratin date
    //if (pao_date <> expiration_date ) {return pao_date, else expiration}
  }
  return "-";
};
