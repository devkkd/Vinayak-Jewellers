import React from "react";
import { giftingProducts } from "../data/giftingJewelleryProducts";
import RemProductDetail from "./RemProductDetail";

export default function GiftingProductDetail() {
  return (
    <RemProductDetail
      dataSource={giftingProducts}
      categoryName="Gifting Collection"
      backPath="/gifting"
    />
  );
}