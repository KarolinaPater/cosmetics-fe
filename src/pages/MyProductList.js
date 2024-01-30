import "../style/text.scss";
import "../style/my-product-list.scss";
import "../style/global/form-text-input.scss";
import { useNavigate, useParams } from "react-router";
import React, { useState, useEffect } from "react";
import FormButton from "../global/FormButton";
import axios from "axios";
import Confirm from "../global/Confirm";
import {
  mainCategoryHelper,
  productPricePerUnitHelper,
  secondaryCategoryHelper,
} from "../helpers";
import ProductListRow from "../components/ProductListRow";
import TableFilter from "../components/TableFilter";
import { handleCaltulateExpirationDate } from "../helpers/calculate";

function MyProductList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [stateConfirm, setStateConfirm] = useState(false);
  const [activeId, setActiveId] = useState(false);

  const handleGetFilteredData = (filter) => {
    const newFilter = {
      brand: filter?.brand ? filter.brand : undefined,
      main_category: filter?.main_category ? filter?.main_category : undefined,
      secondary_category: filter?.secondary_category
        ? filter?.secondary_category
        : undefined,
      product_short_name: filter?.product_short_name
        ? filter?.product_short_name
        : undefined,
      status: filter?.status ? filter?.status : undefined,
    };

    handleGetData(newFilter);
  };

  const handleGetData = (filters) => {
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
      params: filters ? filters : {},
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/get-product-list`, config)
      .then((response) => {
        const productGet = response?.data?.productList || [];
        setProduct(productGet);
      })
      .catch((error) => {
        alert(error?.response?.data?.message || "Błąd serwera");
      });
  };

  const handleRedirectToEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = () => {
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
    };
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/users/delete-product/${activeId}`,
        config
      )
      .then((response) => {
        handleCloseDeleteConfirm();
        handleGetData();
      })
      .catch((error) => {
        alert(error?.response?.data?.message || "Błąd serwera");
      });
  };

  const handleOpenDeleteConfirm = (id) => {
    setActiveId(id);
    setStateConfirm(true);
  };
  const handleCloseDeleteConfirm = () => {
    setStateConfirm(false);
  };
  const handleRedirectToUser = () => {
    navigate(-1);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const tableHeader = (
    <div className="my-product-header">
      <div className="my-product-cell"></div>
      <div className="my-product-cell">Marka</div>
      <div className="my-product-cell">Kategoria </div>
      <div className="my-product-cell">Podkategoria </div>
      <div className="my-product-cell">Nazwa</div>
      <div className="my-product-cell">Czas do zużycia</div>
      <div className="my-product-cell"></div>
    </div>
  );

  const tableBody = product.map((item) => (
    <ProductListRow
      key={item.id}
      brand={item.brand}
      mainCategory={mainCategoryHelper(item?.main_category)}
      secondaryCategory={secondaryCategoryHelper(item?.secondary_category)}
      shortName={item.product_short_name}
      expirationDate={item?.expiration_date}
      handleClickEdit={() => handleRedirectToEditProduct(item._id)}
      handleClickDelete={() => handleOpenDeleteConfirm(item._id)}
      //pola szczegółowe
      startingDate={item?.starting_date}
      endingDate={item?.ending_date} //
      pao={item?.period_after_opening}
      finalExpirationDate={handleCaltulateExpirationDate(
        item.starting_date,
        item.period_after_opening,
        item.expiration_date
      )}
      unitOfCapacity={item?.unit_of_capacity}
      productCapacity={item?.product_capacity}
      productPrice={item?.product_price}
      productPricePerUnit={productPricePerUnitHelper(
        item?.product_price,
        item?.product_capacity
      )}
      productDescription={item?.product_description}
    />
  ));

  return (
    <div className="page">
      <div className="my-product-list">
        {stateConfirm && (
          <Confirm
            tekst={"Czy na pewno chcesz usunąć ten produkt?"}
            confirm_tekst={"TAK"}
            cancel_tekst={"NIE"}
            handleConfirm={handleDeleteProduct}
            handleCancel={handleCloseDeleteConfirm}
          />
        )}
        <div className="filter-wrapper">
          <TableFilter handleClick={handleGetFilteredData} />
        </div>
        {product.length > 0 ? (
          <div className="my-product-table">
            <div className="text-area-table">
              {tableHeader}
              {tableBody}
            </div>
          </div>
        ) : (
          <div className="text">Brak artykułów</div>
        )}
        <FormButton title="Powrót" handleForm={handleRedirectToUser} />
      </div>
    </div>
  );
}

export default MyProductList;
