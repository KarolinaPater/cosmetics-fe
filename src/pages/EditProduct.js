import { useState, useEffect } from "react";
import FormTextInput from "../global/FormTextInput";
import Select from "../global/Select";
import FormButton from "../global/FormButton";
import {
  ValidateBrand,
  ValidateMainCategory,
  ValidateSecondaryCategory,
  ValidatePeriodAfterOpening,
  ValidateProductCapacity,
  ValidateProductDescription,
  ValidateProductPrice,
  ValidateProductShortName,
} from "../validator/validator";
import "../style/add-product-page.scss";
import {
  secondary_category_options,
  main_category_options,
  product_capacity_options,
} from "../consts/product";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

function EditProduct() {
  const { id } = useParams();

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    brand: "",
    main_category: "",
    secondary_category: "",
    product_short_name: "",
    product_description: "",
    product_capacity: "",
    unit_of_capacity: "",
    starting_date: "",
    ending_date: "",
    period_after_opening: "",
    expiration_date: "",
    final_expiration_date: "",
    product_price: "",
    price_per_unit: "",
    user: "",
  });

  const [error, setError] = useState({
    brand: null,
    main_category: null,
    secondary_category: null,
    product_short_name: null,
    product_description: null,
    product_capacity: null,
    unit_of_capacity: null,
    period_after_opening: null,
    product_price: null,
    price_per_unit: null,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleForm = () => {
    setError({
      brand: null,
      main_category: null,
      secondary_category: null,
      product_short_name: null,
      product_description: null,
      product_capacity: null,
      unit_of_capacity: null,
      starting_date: null,
      period_after_opening: null,
      product_price: null,
    });

    //walidacja
    const brand_error = ValidateBrand(product.brand);
    const main_category_error = ValidateMainCategory(product.main_category);
    const secondary_category_error = ValidateSecondaryCategory(
      product.secondary_category
    );
    const product_short_name_error = ValidateProductShortName(
      product.product_short_name
    );
    const product_description_error = ValidateProductDescription(
      product.product_description
    );
    const product_capacity_error = ValidateProductCapacity(
      product.product_capacity
    );
    const product_price_error = ValidateProductPrice(product.product_price);
    const period_after_opening_error = ValidatePeriodAfterOpening(
      product?.period_after_opening
    );
    //wyswietlanie błędów walidacji
    setError({
      brand: brand_error,
      main_category: main_category_error,
      secondary_category: secondary_category_error,
      product_short_name: product_short_name_error,
      product_description: product_description_error,
      product_capacity: product_capacity_error,
      product_price: product_price_error,
      period_after_opening: period_after_opening_error,
    });

    if (
      brand_error ||
      main_category_error ||
      secondary_category_error ||
      product_short_name_error ||
      product_description_error ||
      product_capacity_error ||
      product_price_error ||
      period_after_opening_error
    ) {
      return;
    }

    setIsDisabledButton(true);
    //axios
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/edit-product/${id}`,
        product,
        config
      )
      .then(() => {
        alert("Produkt edytowano pomyślnie");
        navigate(`/my-product-list`);
      })
      .catch(() => {
        alert("Wystąpił błąd");
      });
    setIsDisabledButton(false);
  };

  const filteredOptions = () => {
    const opcje = secondary_category_options.filter(
      (option) => option.category === product.main_category
    );
    return opcje;
  };

  const handleInit = () => {
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/get-product/${id}`, config)
      .then((response) => {
        const productGet = response?.data?.product;
        setProduct(productGet);
      })
      .catch(() => {
        alert("Wystąpił błąd");
      });
  };

  useEffect(() => {
    //hook r
    handleInit();
  }, [id]);

  return (
    <div className="page">
      <div className="theme">Formularz edycji produktów</div>

      <div className="text-area-wrapper">
        <FormTextInput
          title="Producent *"
          tooltip="Nazwa przedsiębiorstwa wytwarzającego dany produkt"
          type="text"
          name="brand"
          value={product.brand}
          placeholder="Handmade"
          onChange={handleInput}
          error={error.brand}
        />

        <Select
          title="Kategoria główna"
          name="main_category"
          value={product.main_category}
          options={main_category_options}
          onChange={handleInput}
          error={error.main_category}
        />

        <Select
          title="Podkategoria *"
          tooltip="Należy uprzednio wybrać kategorię główną"
          name="secondary_category"
          value={product.secondary_category}
          options={filteredOptions()}
          onChange={handleInput}
          error={error.secondary_category}
        />

        <FormTextInput
          title="Nazwa produktu *"
          tooltip="Skrótowa nazwa produktu w bazie. Bardziej szczegółowe informacje należy umieścic w polu z opisem."
          type="text"
          name="product_short_name"
          value={product.product_short_name}
          placeholder="Mydlica lekarska"
          onChange={handleInput}
          error={error.product_short_name}
        />

        <FormTextInput
          title="Opis produktu"
          type="text"
          name="product_description"
          value={product.product_description}
          placeholder="Do włosów przetłuszczających się."
          onChange={handleInput}
          error={error.product_description}
        />
        <Select
          title="Jednostka"
          tooltip="Pojemność/waga danego produktu, w przypadku produktów jednorazowych zaznaczyć 'sztuki'"
          options={product_capacity_options}
          error={error.unit_of_capacity}
          name="unit_of_capacity"
          value={product.unit_of_capacity}
          onChange={handleInput}
        />
        <FormTextInput
          title="Ilość"
          tooltip="Liczebność podanej jednostki"
          type="number"
          name="product_capacity"
          value={product.product_capacity}
          placeholder="120"
          onChange={handleInput}
          error={error.product_capacity}
        />

        <FormTextInput
          title="Data otwarcia produktu"
          type="date"
          name="starting_date"
          value={product.starting_date}
          onChange={handleInput}
        />
        <FormTextInput
          title="Data zużycia produktu"
          type="date"
          name="ending_date"
          value={product.ending_date}
          onChange={handleInput}
        />

        <FormTextInput
          title="PAO"
          tooltip="Liczba miesięcy na zużycie kosmetyku liczona od momentu otwarcia. W razie braku - pozostawić pole puste."
          type="number"
          name="period_after_opening"
          value={product.period_after_opening}
          placeholder="6"
          onChange={handleInput}
          error={error.period_after_opening}
        />
        <FormTextInput
          title="Data ważności produktu"
          type="date"
          name="expiration_date"
          value={product.expiration_date}
          onChange={handleInput}
        />
        <FormTextInput
          title="Cena produktu"
          type="number"
          name="product_price"
          value={product.product_price}
          placeholder="19.99"
          onChange={handleInput}
          error={error.product_price}
        />

        <FormButton
          title="Zatwierdź produkt"
          handleForm={handleForm}
          disabled={isDisabledButton}
        />
      </div>
    </div>
  );
}
export default EditProduct;
