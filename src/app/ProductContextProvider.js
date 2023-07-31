// import { createContext, useState } from "react";

// // Create the context
// const MyContext = createContext();

// // Create a provider component
// const MyContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [homepageItems, setHomepageItems] = useState([]);
//   const [detail, setDetail] = useState({});
//   // Provide the states and update functions through the context
//   const contextValues = {
//     products,
//     setProducts,
//     homepageItems,
//     setHomepageItems,
//     detail,
//     setDetail,
//   };

//   return (
//     <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
//   );
// };

// export { MyContext, MyContextProvider };
