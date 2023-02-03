import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Marble from './marble';
import DisplayAllMarble from './DisplayAllMarble';
import SubCategory from './subCategory';
import DisplaysubCategory from './DisplaysubCategory';
import DisplayBrand from './DisplayBrand';
import Brand from './Brand';
import Model from './Model';
import DisplayModel from './DisplayModel';
import Size from './Size';
import DisplaySize from './DisplaySize';
import Product from './Product';
import DisplayProduct from './DisplayProduct';
import AdminLogin from './AdminLogin';
import Productphoto from './Productphoto'

import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import { propsToClassKey } from '@mui/styles';
export default function DashBoard() {
  return (
    <div>
      <TopBar />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Routes>


          <Route element={<Marble />} path={"/marble"} />
          <Route element={<DisplayAllMarble />} path={"/displayall"} />
          <Route element={<SubCategory />} path={"/subcategory"} />
          <Route element={<DisplaysubCategory />} path={"/displaysubcategory"} />
          <Route element={<Brand />} path={"/brand"} />
          <Route element={<DisplayBrand />} path={"/displaybrand"} />
          <Route element={<Model />} path={"/model"} />
          <Route element={<DisplayModel />} path={"/displaymodel"} />
          <Route element={<Size />} path={"/Size"} />
          <Route element={<DisplaySize />} path={"/displaysize"} />
          <Route element={<Product />} path={"/product"} />
          <Route element={<DisplayProduct />} path={"/displayproduct"} />
          <Route element={<Productphoto />} path={"/productphoto"} />

        </Routes>
      </div>



    </div>

  )



}