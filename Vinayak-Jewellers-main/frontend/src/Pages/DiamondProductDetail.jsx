import React from "react";
import { diamondProducts } from "../data/diamondJewelleryProducts";
import RemProductDetail from "./RemProductDetail";

export default function DiamondProductDetail() {
  return (
    <RemProductDetail
      dataSource={diamondProducts}
      categoryName="Diamond Jewellery"
      backPath="/diamond"
    />
  );
}