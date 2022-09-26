import React from "react";
import { useGetCatScreenList } from "../../query/cat-subcat";

export const categoryContext = React.createContext();

const Index = ({ children }) => {
  // Category State
  const [categoryList, setCategoryList] = React.useState([]);

  // Fetch Category Data
  const { data: categoryData, isLoading, isError } = useGetCatScreenList();

  // Set Category List to State
  React.useEffect(() => {
    if (isLoading || isError) return;
    if (!categoryData.status) return;
    setCategoryList(categoryData.data.data);
  }, [isLoading]);

  console.log(categoryList);

  return (
    <categoryContext.Provider
      value={{
        categoryList,
        isLoading,
        isError,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};

export default Index;
