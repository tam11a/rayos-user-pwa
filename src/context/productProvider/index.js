import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductDialog from "../../components/ProductBox/ProductDialog";

import { useGetProductByID } from "../../query/product";

const Index = ({ children }) => {
  // get search params
  let [searchParams] = useSearchParams();
  // Category State
  const [productInfo, setProductInfo] = React.useState();

  // Fetch Category Data
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductByID(searchParams.get("product"));

  // Set Category List to State
  React.useEffect(() => {
    if (isLoading || isError) return;
    if (!productData?.data.status) return;
    setProductInfo(productData.data.value);
  }, [isLoading]);

  return (
    <>
      {productInfo && (
        <ProductDialog
          open={!!productInfo}
          product={productInfo}
          handleClose={() => setProductInfo()}
        />
      )}

      {children}
    </>
  );
};

export default Index;
