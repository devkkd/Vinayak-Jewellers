import React from "react";
import { silverProducts } from "../data/silverJewelleryProducts";
import RemProductDetail from "./RemProductDetail";

export default function SilverProductDetail() {
  return (
    <RemProductDetail
      dataSource={silverProducts}
      categoryName="Silver Jewellery"
      backPath="/silver"
    />
  );
}