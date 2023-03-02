import classes from "./AuthHeading.module.css";

const AuthHeading = ({ headingTitle, headingText }) => {
  return (
    <div className={classes.heading}>
      <h1>{headingTitle}</h1>
      <p>{headingText}</p>
    </div>
  );
};

export default AuthHeading;
