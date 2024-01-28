import "../style/text.scss";

function FAQ() {
  return (
    <div className="page">
      <div className="theme">Dodaj produkt</div>

      <div className="text-area-wrapper">
        Dodaj produkt jest podstroną umożliwiającą dodanie nowego kosmetyku na
        listę produktów użytkownika. W tym celu niezbędne jest uzupełnienie
        następujących pól:
        <ol>
          <li>
            Producent - pole przeznaczone na nazwę przedsiębiorstwa
            wytwarzającego dany produkt.
          </li>
          <li>
            Kategoria główna - wybrane z listy pole określający rodzaj produkty
          </li>
          <li>
            Podkategoria - pole możliwe do wybrania po ustawieniu kategorii
            głównej.
          </li>
          <li>
            Nazwa produktu - pole przeznaczone na skróconą nazwe produktu. Do
            uszczególnienia lub dodatkowych informacji służy opis produktu.
          </li>
        </ol>
      </div>

      <div className="text-area-wrapper">
        PAO (Period After Opening) – jest to międzynarodowe oznaczenie, które
        wskazuje na przydatność produktu po otwarciu opakowania.
      </div>

      <div className="text-area-wrapper">
        Wśród dodatkowych pól znajdują się:
        <ol>
          <li>
            Ilość, Jednostka, Cena - pozwalają na automatyczne obliczanie kwoty
            za jednostkę danego produktu. Znajduje się ona w zakładce z listą
            produktów po rozwinięciu szczegółowych informacji danego produktu.
          </li>
          <li>
            Pola związane z datą - umożliwiającą filtrowanie produktów poprzez
            nadanie im statusu: w użyciu, zużyte, nieużywane.
          </li>
        </ol>
      </div>
      <div className="theme">Lista produktów</div>
      <div className="text-area-wrapper">
        Lista produktów jest zakładką pozwalającą użytkownikowi na podgląd,
        filtrowanie, edycje oraz usuwanie dodanych do bazy danych produktów.
      </div>
      <div className="text-area-wrapper">
        Czas do zużycia jest funkcjonalnością, która porównując ze sobą datę
        ważności oraz PAO (po wprowadzeniu daty otwarcia), wyświetla najkrótszy
        możliwy czas na bezpieczne używanie produktu.
      </div>
    </div>
  );
}
export default FAQ;
