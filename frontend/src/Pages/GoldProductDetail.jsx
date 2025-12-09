import React from "react";
import { goldProducts } from "../data/goldJewelleryProducts";
import RemProductDetail from "./RemProductDetail";

export default function GoldProductDetail() {
  return (
    <RemProductDetail
      dataSource={goldProducts}
      categoryName="Gold Jewellery"
      backPath="/gold"
    />
  );
}