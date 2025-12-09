import { createContext, useContext, useState } from "react";

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiryItems, setEnquiryItems] = useState([]);

  const addToEnquiry = (product) => {
    setEnquiryItems((prev) => {
      const alreadyAdded = prev.find((p) => p.id === product.id);
      if (alreadyAdded) return prev; // avoid duplicates
      return [...prev, product];
    });
  };

  const removeFromEnquiry = (id) => {
    setEnquiryItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearEnquiry = () => setEnquiryItems([]);

  return (
    <EnquiryContext.Provider
      value={{ enquiryItems, addToEnquiry, removeFromEnquiry, clearEnquiry }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => useContext(EnquiryContext);
