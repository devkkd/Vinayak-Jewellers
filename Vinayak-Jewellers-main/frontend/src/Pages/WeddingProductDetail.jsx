import React from "react";
import { weddingProducts } from "../data/weddingJewelleryProducts";
import RemProductDetail from "./RemProductDetail";

export default function WeddingProductDetail() {
  return (
    <RemProductDetail
      dataSource={weddingProducts}
      categoryName="Wedding Collection"
      backPath="/wedding"
    />
  );
}