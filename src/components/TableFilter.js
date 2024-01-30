import React, { useState } from "react";
import FormTextInput from "../global/FormTextInput";
import Select from "../global/Select";
import {
  secondary_category_options,
  main_category_options,
  product_status_options,
} from "../consts/product.js";
import "../style/table-filter.scss";
import FormButton from "../global/FormButton.js";

function TableFilter(props) {
  const [filter, setFilter] = useState({
    brand: "",
    main_category: "",
    secondary_category: "",
    product_short_name: "",
    status: "",
  });

  const handleClear = () => {
    const emptyFilters = {
      brand: "",
      main_category: "",
      secondary_category: "",
      product_short_name: "",
      status: "",
    };
    setFilter(emptyFilters);
    props.handleClick(emptyFilters); //komunikacja z backendem poprzez handle Click
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, [name]: value });
  };

  const filteredOptions = () => {
    const opcje = secondary_category_options.filter(
      (option) => option.category === filter.main_category
    );
    return opcje;
  };

  //  SELECT: w użyciu/ zużyte/ nieotwarte
  // product_opened - jest start_data, nie ma ending_daty
  // product_ending - wtedy gdy jest wypełnione ending_date
  // product_closed - produkt z pustym: start_date

  return (
    <div className="table-filter">
      <FormTextInput
        title="Marka"
        type="text"
        name="brand"
        value={filter.brand}
        onChange={handleInput}
      />
      <Select
        title="Kategoria główna"
        name="main_category"
        value={filter.main_category}
        options={main_category_options}
        onChange={handleInput}
      />
      <Select
        title="Podkategoria"
        tooltip="Należy uprzednio wybrać kategorię główną"
        name="secondary_category"
        value={filter.secondary_category}
        options={filteredOptions()}
        onChange={handleInput}
      />
      <FormTextInput
        title="Nazwa produktu"
        type="text"
        name="product_short_name"
        value={filter.product_short_name}
        onChange={handleInput}
      />
      <Select
        title="Status"
        name="status"
        value={filter.status}
        options={product_status_options}
        onChange={handleInput}
      />
      <FormButton handleForm={() => props.handleClick(filter)} title="Szukaj" />
      <FormButton handleForm={() => handleClear()} title="wyczyść" />
    </div>
  );
}
export default TableFilter;
