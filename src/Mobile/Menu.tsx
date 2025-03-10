import React, { FC, useEffect, useState } from "react";

type Props = {
  menuMobile?: boolean;
  handleChangeItem: (value: any) => void;
  handleShowMenuMobile: () => void;
};

const Menu: FC<Props> = ({
  menuMobile,
  handleChangeItem,
  handleShowMenuMobile,
}) => {
  return (
    <div style={{ height: "auto", width: "300px", padding: "7px" }}>
      <div className="row">
        <h3
          className="text-center"
          onClick={() => {handleChangeItem("MAINHOME"); handleShowMenuMobile()}}
          style={{cursor:'pointer'}}
        >
          MENU
        </h3>
        <ul>
          <li
            className="menu-mobile mt-3"
            style={{ textTransform: "uppercase" }}
            onClick={() => {handleChangeItem("MALEFORM"); handleShowMenuMobile()}}
          >
            nam
          </li>
          <li
            className="menu-mobile mt-3"
            style={{ textTransform: "uppercase" }}
            onClick={() => {handleChangeItem("FEMALEFORM"); handleShowMenuMobile()}}
          >
            nữ
          </li>
          <li
            className="menu-mobile mt-3"
            style={{ textTransform: "uppercase" }}
          >
            phụ kiện
          </li>
          <li
            className="menu-mobile mt-3"
            style={{ textTransform: "uppercase" }}
          >
            khuyến mãi
          </li>
          <li
            className="menu-mobile mt-3"
            style={{ textTransform: "uppercase" }}
          >
            liên hệ
          </li>
          {/* <li className="menu-mobile" style={{textTransform:'uppercase'}}>nam</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
