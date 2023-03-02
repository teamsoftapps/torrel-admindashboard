import { useState } from "react";
import { createContext, useReducer, useEffect } from "react";

export const InvoiceContext = createContext();

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_CLIENTS":
      return { ...state, allClients: action.payload };
    case "CREATE__CLIENTS":
      return { allClients: [action.payload, ...state.allClients] };
    case "DELETE__CLIENTS":
      return {
        allClients: state.allClients.filter(
          (client) => client._id !== action.payload
        ),
      };

    case "REMOVE_ALL_CLIENTS":
      return { allClients: [] };

    case "GET_ALL_JOBS":
      return { ...state, allJobs: action.payload };
    case "CREATE__JOBS":
      return { allJobs: [action.payload, ...state.allJobs] };
    case "DELETE__JOBS":
      return {
        allJobs: state.allJobs.filter((job) => job._id !== action.payload),
      };
    case "GET_BY_DATE":
      return { ...state, allJobs: action.payload };

    case "REMOVE_ALL_JOBS":
      return { allJobs: [] };
    // case "GET_CLIENT_ID":
    //   return { clientID: action.payload };
    case "GET_ALL_INVOICE":
      return { ...state, allInvoice: action.payload };
    case "DELETE__INVOICES":
      console.log("action.payload", action.payload);
      return {
        allInvoice: state.allInvoice.filter(
          (invoice) => invoice._id !== action.payload
        ),
      };

    case "REMOVE_ALL_INVOICE":
      return { allInvoice: [] };

    case "GET_ALL_SUB_JOBS":
      // console.log("action.payload", action.payload);
      return { ...state, allSubJobs: action.payload };
    case "DELETE__SUB_JOBS":
      console.log("action.payload", action.payload);
      return {
        allSubJobs: state.allSubJobs.filter(
          (subjob) => subjob._id !== action.payload
        ),
      };
    case "GET_SUBJOB_BY_DATE":
      return { ...state, allSubJobs: action.payload };

    case "REMOVE_ALL_SUB_JOBS":
      return { allSubJobs: [] };

    case "GET_ALL_SUB_INVOICE":
      return { ...state, allSubInvoice: action.payload };
    case "DELETE_SUB_INVOICES":
      console.log("action.payload", action.payload);
      return {
        allSubInvoice: state.allSubInvoice.filter(
          (invoice) => invoice._id !== action.payload
        ),
      };

    case "REMOVE_ALL_SUBINVOICE":
      return { allSubInvoice: [] };

    default:
      return state;
  }
};

export const InvoiceContextProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(invoiceReducer, {
    allClients: [],
    allJobs: [],
    allInvoice: [],
    allSubJobs: [],
    allSubInvoice: [],
  });

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        dispatch,
        isMobile,
        setIsMobile,
        clientId,
        setClientId,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
