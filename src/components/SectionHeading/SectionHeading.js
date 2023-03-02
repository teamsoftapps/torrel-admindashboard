import btnArrow from "./../../images/btnArrow.png";
import classes from "./SectionHeading.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const SectionHeading = ({ headingText, headingPara }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.heading}>
      <h1>{headingText}</h1>
      <p>{headingPara}</p>
      <Button onClick={() => navigate("/signup")}>
        Signup Now <img src={btnArrow} alt="" />
      </Button>
    </div>
  );
};

export default SectionHeading;
