import React from "react";
import styles from "./SlicedInvoice.module.css";
import cross from "../../../../images/cross.png";
import save from "../../../../images/save.png";
import imageIcon from "../../../../images/imgUpload.png";
import { useNavigate } from "react-router-dom";

const SlicedInvoice = () => {

  const navigate=useNavigate()

  return (
    <div className={styles.sliceInvoice}>
      <h1>Sliced Invoices</h1>

      <div className={styles.sliced_btns}>
        <button>
          <img src={cross} alt="" />
          <span>Cancel</span>
        </button>
        <button onClick={()=>navigate("/dashboard/invoice/createinvoice2")}>
          <img src={save} alt="" />
          <span>Save</span>
        </button>
      </div>

      <div className={styles.sliced_invoice_form}>
        <div className={styles.slice_left}>
          <div className={styles.uploadImage}>
            <div className={styles.imageInput}>
              <img src={imageIcon} alt="" />
              <span className={styles.signatureSpan}>Logo Image</span>
              <span className={styles.sizeSpan}>Drag or add image</span>
              <label for="inputTag">
                <span>Browse</span>
                <input id="inputTag" type="file" style={{ display: "none" }} />
              </label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span>Business Name</span>
              <input type="text" placeholder="Torrel Alexis " />
            </label>
            <label>
              <span>Website</span>
              <input type="text" placeholder="www.torrelalexis.com" />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span>Company Address</span>
              <input type="text" placeholder="4605 SHASTA CIR " />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span> Address Line 2 </span>
              <input
                type="text"
                placeholder="CYPRESS, California 90630, United States"
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span>Prefix </span>
              <input type="text" placeholder="INV-" />
            </label>
            <label>
              <span>Next Inovice Number</span>
              <input type="text" placeholder="001-123" />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span> Terms & Condition</span>
              <textarea type="text" rows="7" />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span> Footer</span>
              <textarea type="text" rows="4" />
            </label>
          </div>
        </div>
        <div className={styles.slice_right}>
          <div className={styles.inputContainer}>
            <label>
              <span>Add a pre-defined line item</span>
              <textarea
                type="text"
                rows="4"
                placeholder="add a pre-defined line item"
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span>Year Start </span>
              <input type="date" placeholder="Torrel Alexis " />
            </label>
            <label>
              <span>Year End </span>
              <input type="date" placeholder="www.torrelalexis.com" />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label>
              <span>SSL Varify</span>
              <input type="boolean" placeholder="TRUE" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlicedInvoice;
