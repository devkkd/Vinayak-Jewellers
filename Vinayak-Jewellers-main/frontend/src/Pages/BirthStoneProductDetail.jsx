import React from "react";
import { birthStoneProducts } from "../data/birthStoneProducts";
import RemProductDetail from "./RemProductDetail";

export default function BirthStoneProductDetail() {
  return (
    <RemProductDetail
      dataSource={birthStoneProducts}
      categoryName="Birth Stones"
      backPath="/birthstones"
    />
  );
}