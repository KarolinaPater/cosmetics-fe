import "../style/text.scss";
import "../style/my-product-list.scss";
import "../style/global/form-text-input.scss";

import React, { useState } from "react";

import DeleteButton from "../global/DeleteButton";
import EditButton from "../global/EditButton";
import ExpandButton from "../global/ExpandButton";
import { dateFormatter } from "../helpers";

function ProductListRow(props) {
  const [open, setOpen] = useState(false);

  const additionalRow = (
    <div className="additional-row">
      <div className="additional-cell">
        Data otwarcia: {dateFormatter(props.startingDate)}
      </div>
      <div className="additional-cell">
        Data zużycia: {dateFormatter(props.endingDate)}
      </div>

      {props?.pao ? (
        <div className="additional-cell">PAO: {props.pao}</div>
      ) : (
        ""
      )}
      <div className="additional-cell">
        Data ważności: {dateFormatter(props.expirationDate)}
      </div>

      {props.productCapacity ? (
        <div className="additional-cell">
          Pojemność: {props.productCapacity}
          {props.unitOfCapacity}
        </div>
      ) : (
        ""
      )}

      {props.unitOfCapacity &&
      props.productPrice &&
      props.productPricePerUnit ? (
        <div className="additional-cell">
          Cena: {props.productPrice}zł ({props.productPricePerUnit}zł /
          {props.unitOfCapacity})
        </div>
      ) : (
        <div className="additional-cell">{""}</div>
      )}
      <div className="additional-cell">{props.productDescription}</div>
    </div>
  );

  const changeAdditionalRowState = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <div className="my-product-row">
        <div className="my-product-cell">
          <ExpandButton
            tooltip="Rozwiń po więcej szczegółów"
            handleClick={changeAdditionalRowState}
          />
        </div>
        <div className="my-product-cell">{props.brand}</div>
        <div className="my-product-cell">{props.mainCategory}</div>
        <div className="my-product-cell">{props.secondaryCategory}</div>
        <div className="my-product-cell">{props.shortName}</div>
        <div className="my-product-cell">{props.finalExpirationDate}</div>
        <div className="my-product-cell">
          <EditButton
            tooltip="Edytuj produkty"
            handleClick={props.handleClickEdit}
          />
          <DeleteButton
            tooltip="Usuń produkt"
            handleClick={props.handleClickDelete}
          />
        </div>
      </div>
      {open ? additionalRow : null}
    </>
  );
}
export default ProductListRow;
