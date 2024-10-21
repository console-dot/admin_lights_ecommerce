import React, { useState } from "react";
import AddContext from "./AddContext";

export const AddState = (props) => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const [bodyColor, setBodyColor] = useState(true);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [updateProductId, setUpdatedProductId] = useState();
  // adjust sidebar width state
  const [width, setWidth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const getIDInUpdatedProduct = (selectedComponent, id) => {
    setSelectedComponent(selectedComponent);
    setUpdatedProductId(id);
  };

  return (
    <AddContext.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        width,
        setWidth,
        isMobile,
        setIsMobile,
        bodyColor,
        getIDInUpdatedProduct,
        setBodyColor,
        updateProductId,
        setUpdatedProductId,
        addCategoryModal,
        setAddCategoryModal,
      }}
    >
      {props.children}
    </AddContext.Provider>
  );
};
