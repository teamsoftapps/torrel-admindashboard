import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Navbar from "./../../components/Navbar/Navbar";
import arrow from "./../../images/arrow.png";
import bottomLogo from "./../../images/bottomLogo.png";
import check from "./../../images/check.png";
import desktop1 from "./../../images/desktop.png";
import icon1 from "./../../images/icon1.png";
import icon2 from "./../../images/icon2.png";
import icon3 from "./../../images/icon3.png";
import icon4 from "./../../images/icon4.png";
import icon5 from "./../../images/icon5.png";
import icon6 from "./../../images/icon6.png";
import invoice from "./../../images/invoice.png";
import mail from "./../../images/mail.png";
import notification from "./../../images/notification.png";
import desktop2 from "./../../images/Rectangle4.png";
import desktop3 from "./../../images/Rectangle5.png";
import desktop4 from "./../../images/Rectangle6.png";
import desktop5 from "./../../images/Rectangle7.png";
import section4Bg from "./../../images/section5Bg.png";
import torrelLogo from "./../../images/torrelLogo.png";
import Button from "@mui/material/Button";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Landingpage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleNavigation = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      {/* // *********LANDING PAGE SECTION 1 *********** */}
      <section className={classes.section1}>
        <div className={classes.mainContent}>
          <h1>Invoicing That Helps Small</h1>
          <h1>Businesses Get Paid Faster</h1>
          <p>
            Torrel Alexis Invoicing that helps you get paid faster.Torrel Alexis
            Invoicing that helps you get paid faster.Torrel Alexis Invoicing
            that helps you get paid faster.Torrel Alexis Invoicing that helps
            you get paid faster.
          </p>
          <div className={classes.contentBtns}>
            <Button onClick={handleNavigation}>Get Started</Button>
            <Button onClick={handleNavigation}>Try For Free</Button>
          </div>
        </div>
        <div className={classes.contentImg}>
          <img src={desktop1} alt="" />
        </div>
      </section>

      {/* // *********LANDING PAGE SECTION 2 ************/}
      <section className={classes.section2}>
        <div className={classes.heading}>
          <p>Explore Small Business Invoicing </p>
          <h2>Enjoy Our Invoicing Features</h2>
        </div>
        <div className={classes.featureFlex}>
          <div>
            <img src={icon1} alt="" />
            <span>Send Invoices</span>
          </div>
          <div>
            <img src={icon2} alt="" />
            <span>Track Expenses </span>
          </div>
          <div>
            <img src={icon3} alt="" />
            <span>create reports </span>
          </div>
          <div>
            <img src={icon4} alt="" />
            <span> manage clients</span>
          </div>
          <div>
            <img src={icon5} alt="" />
            <span>track payments</span>
          </div>
          <div>
            <img src={icon6} alt="" />
            <span>multi currency</span>
          </div>
        </div>
      </section>

      {/* // *********LANDING PAGE SECTION 3 *********** */}

      <section className={classes.section3}>
        <div className={classes.section3_first}>
          <SectionHeading
            headingText="Create professional invoices in seconds"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>
            <img src={desktop2} alt="" />
          </div>
        </div>
        <div className={classes.section3_second}>
          <SectionHeading
            headingText=" Send Invoices by email"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>
            <img src={desktop3} alt="" />
          </div>
        </div>
        <div className={classes.section3_third}>
          <SectionHeading
            headingText=" Keep track of who’s paid (and who hasn’t)"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>
            <img src={desktop4} alt="" />
          </div>
        </div>
        <div className={classes.section3_fourth}>
          <SectionHeading
            headingText="Accept payments online"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>
            <img src={desktop5} alt="" />
          </div>
        </div>
      </section>

      {/* // *********LANDING PAGE SECTION 4 *********** */}
      <section className={classes.section4}>
        <div className={classes.section4Inner}>
          <div className={classes.left}>
            <div className={classes.leftContent}>
              <h1>Smart Invoicing </h1>
              <h1>for small businesses</h1>
            </div>
            <img src={section4Bg} alt="" />
          </div>
          <div className={classes.right}>
            <div className={classes.icon__top}>
              <div>
                <img src={check} alt="" />
                <h5>Invoicing on autopilot</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <img src={mail} alt="" />
                <h5>Send invoices & qoutes</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div className={classes.icon__bottom}>
              <div>
                <img src={invoice} alt="" />
                <h5>Convert qoutes into invoices with 1 click</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <img src={notification} alt="" />
                <h5>Send Reminders for late-payers</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // *********LANDING PAGE SECTION 5 *********** */}
      <section className={classes.section5}>
        <div className={classes.heading}>
          <h2>
            Spend less time creating and <br />
            sending invoices
          </h2>
          <p>
            And more time on the things that matter. Sign up to our free trial.
            No credit card required.
          </p>
        </div>
        <center>
          <Button onClick={() => navigate("/login")}>Get Started</Button>
          <Button onClick={() => navigate("/login")}>Try For Free</Button>
        </center>
      </section>

      {/* // *********LANDING PAGE FAQ SECTION  *********** */}

      <section className={classes.faqSection}>
        {/* FAQ PART */}

        <div className={classes.faqInner}>
          <h1>Find all answers here</h1>

          <div className={classes.faqWrap}>
            <div className={classes.faqContainer}>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
            </div>
            <div className={classes.faqContainer}>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
            </div>
            <div className={classes.faqContainer}>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
            </div>
            <div className={classes.faqContainer}>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
              <div className={classes.question}>
                <h5>What is torrel invoice and why do i need it?</h5>
                <img src={arrow} alt="" />
              </div>
            </div>
          </div>
        </div>

        <center>
          <img src={bottomLogo} alt="" />
        </center>
      </section>

      {/* // ********* FOOTER SECTION *********** */}

      <footer className={classes.footerSection}>
        <div className={classes.footer}>
          <div className={classes.first}>
            <img src={torrelLogo} alt="" />
            <div className={classes.firstInner}>
              <span>hello@torrelalexis.com</span>
              <span>Contact Form</span>

              <div>
                <span>Torrel Limited </span>
                <span>2022 Wenlock Road</span>
              </div>
            </div>
          </div>
          <div className={classes.second}>
            <h2>QIUCK LINKS</h2>
            <div>
              <span>Torrel Blog</span>
              <span>Invoice Template</span>
              <span>Business Plan</span>
              <span>Credit Note</span>
              <span>Small Business</span>
            </div>
          </div>
          <div className={classes.third}>
            <div>
              <span>Help Center</span>
              <span>Integration</span>
              <span>Accounting </span>
              <span>Sample Invoice </span>
              <span>Find an accountant</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landingpage;
