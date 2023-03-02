import React, { useState } from "react";
import styles from "./CreateInvoice.module.css";
// import settings from "../../../../images/settings.png";
// import print from "../../../../images/print.png";
// import download from "../../../../images/download.png";
// import sent from "../../../../images/sent.png";
// import Preview from "../../../../images/eye.png";
import save from "../../../../images/save.png";
import { useNavigate, useParams } from "react-router-dom";
// import { NumbersTwoTone, Paid } from "@mui/icons-material";
import uuid from "react-uuid";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../../services/api";
import { useAuthContext } from "../../../../hooks/useAuthContext";

// import InvoiceA4 from "../../InvoiceA4";

const CreateInvoice = ({ clientId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  const handleOpen = () => {
    setOpen(!open);
  };

  // const componentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => <InvoiceA4 ref={componentRef}/>,
  // });

  // if(handlePrint()){
  //   return(
  //     <InvoiceA4 ref={componentRef}/>
  //   )
  // }
  // const handlePrint=()=>{
  //   window.print()
  // }

  // const [tax, setTax] = useState(0);
  // const [discount, setDiscount] = useState(0);
  // const [amountPaid, setAmoundPaid] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  const { id } = useParams();
  console.log("job id", id);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

  let _subTotal;
  let _totalDue;

  const [createInvoice, setCreateInvoice] = useState({
    job: id,
    status: undefined,
    dateOfIssue: Date.now(),
    dueDate: Date.now(),
    invoiceNumber: uuid(),
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    addressLine2: "",
    tax: 0,
    discount: 0,
    amountPaid: 0,
    addAPredefinedLineItem: "",
    quantity: 1,
    itemTitle: "",
    price: 0,
    description: "",
    termsAndCondition: "",
    notes: "",
    order: uuid(),
    companyNumber: null,
    subTotal: 0,
    totalDue: 0,
  });

  _subTotal =
    Number(createInvoice.quantity * createInvoice.price) -
    Number(createInvoice.discount) +
    Number(createInvoice.tax);
  _totalDue = Number(_subTotal) - Number(createInvoice.amountPaid);

  console.log("totaldue==>", _totalDue);

  const handleInvoice = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post(
        "/api/v1/invoices",
        {
          ...createInvoice,
          subTotal: _subTotal,
          totalDue: _totalDue,
          client: clientId,
        },
        {
          headers: { Authorization: `Bearer ${user?.data?.token}` },
        }
      );

      if (data) {
        setError(null);
        setIsLoading(false);
        console.log("Jobs Data>>>", data);
        showToastMessage(data.message);
      }

      // resetForm();
      setTimeout(() => {
        navigate(`/dashboard/invoices/${id}`);
      }, 3000);
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const resetForm = () => {
    setCreateInvoice({
      status: undefined,
      dateOfIssue: "",
      dueDate: "",
      invoiceNumber: "",
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      addressLine2: "",
      tax: 0,
      discount: 0,
      amountPaid: 0,
      addAPredefinedLineItem: "",
      quantity: 1,
      itemTitle: "",
      price: 0,
      description: "",
      termsAndCondition: "",
      notes: "",
      order: "",
      companyNumber: null,
      subTotal: 0,
      totalDue: 0,
    });
  };

  // console.log("createInvoice:::::", createInvoice);
  return (
    <div className={styles.create__invoices}>
      <h1>Create Invoices</h1>
      {error && <p className={styles.error}>{error}</p>}
      {/* Buttons Container */}
      <div className={styles.invoices__btns}>
        {/* = <button onClick={() => navigate("/dashboard/invoices/slicedinvoice")}>
          <img src={settings} alt="" />
          <span>Sliced Invoices</span>
        </button>
        <button onClick={() => navigate("/dashboard/invoiceprint")}>
          <img src={print} alt="" />
          <span>Print</span>
        </button>
        <button>
          <img src={download} alt="" />
          <span>Download</span>
        </button>
        <button>
          <img src={sent} alt="" />
          <span>Sent</span>
        </button>
        <button>
          <img src={Preview} alt="" />
          <span>Preview</span>
        </button> */}
        {loading ? (
          <button
            disabled={loading}
            styles={{ opacity: "0.7" }}
            onClick={handleInvoice}
          >
            <img src={save} alt="" />
            <span>Saving...</span>
          </button>
        ) : (
          <button onClick={handleInvoice}>
            <img src={save} alt="" />
            <span>Save</span>
          </button>
        )}
      </div>

      {/* create invoices form */}
      <div className={styles.createInvoices__forms}>
        <div className={styles.forms__left}>
          <div className={styles.left__top}>
            <div className={styles.inputContainer}>
              {/* <label>
                <span>Client</span>
                <input type="text" placeholder="albert" />
              </label> */}
              <label>
                <span>Status</span>
                {/* <input
                  type="text"
                  placeholder="Drafts"
                  value={createInvoice.status}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      status: e.target.value,
                    })
                  }
                /> */}
                <select
                  value={createInvoice.status}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>

                {/* <div className={styles.dropdown} >
                  <button  onClick={handleOpen}>Draft </button>
                  {open ? (
                    <ul className="menu">
                      <li className="menu-item">
                        <button>Paid</button>
                      </li>
                      <li className="menu-item">
                        <button>Unpaid</button>
                      </li>
                    </ul>
                  ) : null}
                </div> */}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Date of issue </span>
                <input
                  type="date"
                  placeholder="March 2, 2021"
                  value={createInvoice.dateOfIssue}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      dateOfIssue: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Due Date</span>
                <input
                  type="date"
                  placeholder="March 2, 2021"
                  value={createInvoice.dueDate}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      dueDate: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Invoice Number</span>
                <input
                  type="text"
                  placeholder="INV-001-123"
                  value={createInvoice.invoiceNumber}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      invoiceNumber: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className={styles.left__bottom}>
            <h2>Company Details</h2>
            <div className={styles.inputContainer}>
              <label>
                <span>Company Name </span>
                <input
                  type="text"
                  placeholder="Torrel Alexis Inc"
                  value={createInvoice.companyName}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      companyName: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Company Email</span>
                <input
                  type="text"
                  placeholder="torell@gmail.com"
                  value={createInvoice.companyEmail}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      companyEmail: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Company Address</span>
                <input
                  type="text"
                  placeholder="4605 SHASTA CIR "
                  value={createInvoice.companyAddress}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      companyAddress: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Company Number</span>
                <input
                  type="Number"
                  placeholder="12345678"
                  value={createInvoice.companyNumber}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      companyNumber: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Address Line 2</span>
                <input
                  type="text"
                  placeholder="CYPRESS, California 90630, United States"
                  value={createInvoice.addressLine2}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      addressLine2: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className={styles.left__bottom}>
            <h2>Pricing Details</h2>
            <div className={styles.inputContainer}>
              <label>
                <span>Tax </span>
                <input
                  type="text"
                  placeholder="$10"
                  value={createInvoice.tax}
                  onChange={(e) =>
                    setCreateInvoice({ ...createInvoice, tax: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Discount</span>
                <input
                  type="text"
                  placeholder="$10"
                  value={createInvoice.discount}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      discount: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Amount Paid</span>
                <input
                  type="text"
                  placeholder="$200"
                  value={createInvoice.amountPaid}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      amountPaid: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            {/* <div className={styles.inputContainer}>
              <label>
                <span>Amount Due</span>
                <input
                  type="text"
                  placeholder="CYPRESS, California 90630, United States"
                />
              </label>
            </div> */}
          </div>
        </div>

        <div className={styles.forms__right}>
          <div className={styles.right__top}>
            <div className={styles.inputContainer}>
              <label>
                <span>Add a pre-defined line item</span>
                <input
                  type="text"
                  placeholder="Audio Book"
                  value={createInvoice.addAPredefinedLineItem}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      addAPredefinedLineItem: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Quantity</span>
                <input
                  type="text"
                  placeholder="1"
                  value={createInvoice.quantity}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      quantity: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Item Title</span>
                <input
                  type="text"
                  placeholder="Audio Books"
                  value={createInvoice.itemTitle}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      itemTitle: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Price</span>
                <input
                  type="text"
                  placeholder="00.0"
                  value={createInvoice.price}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      price: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span>Description </span>
                <input
                  type="text"
                  placeholder="Audio Books Details"
                  rows="7"
                  value={createInvoice.description}
                  onChange={(e) =>
                    setCreateInvoice({
                      ...createInvoice,
                      description: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className={styles.left__bottom}>
              {/* <h2>Pricing Details</h2> */}
              <div className={styles.inputContainer}>
                <label>
                  <span>Order/Reference#</span>
                  <input
                    type="text"
                    placeholder="Enter notes"
                    value={createInvoice.order}
                    onChange={(e) =>
                      setCreateInvoice({
                        ...createInvoice,
                        order: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span>Notes</span>
                  <input
                    type="text"
                    placeholder="Enter notes"
                    value={createInvoice.notes}
                    onChange={(e) =>
                      setCreateInvoice({
                        ...createInvoice,
                        notes: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label>
                  <span>Terms and Conditions</span>
                  <input
                    type="text"
                    placeholder="Terms and Conditions"
                    value={createInvoice.termsAndCondition}
                    onChange={(e) =>
                      setCreateInvoice({
                        ...createInvoice,
                        termsAndCondition: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              {/* <div className={styles.inputContainer}>
              <label>
                <span>Amount Due</span>
                <input
                  type="text"
                  placeholder="CYPRESS, California 90630, United States"
                />
              </label>
            </div> */}
            </div>
          </div>
          <div className={styles.right__bottom}>
            <h4>Invoice Total</h4>
            <div className={styles.invoice__totals}>
              <div className={styles.amount}>
                <span>Sub Total</span>
                <strong>${_subTotal}</strong>
              </div>
              <div className={styles.amount}>
                <span>Tax</span>
                <strong>${createInvoice.tax}</strong>
              </div>
              <div className={styles.amount}>
                <span>Discount</span>
                <strong>-${createInvoice.discount} </strong>
              </div>
              <div className={styles.amount}>
                <span>Paid</span>
                <strong>-${createInvoice.amountPaid}</strong>
              </div>
            </div>
            <div className={styles.total__due}>
              <span style={{ color: "#6BDB65" }}>Total Due</span>
              <strong style={{ color: "#6BDB65" }}>${_totalDue}</strong>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateInvoice;
