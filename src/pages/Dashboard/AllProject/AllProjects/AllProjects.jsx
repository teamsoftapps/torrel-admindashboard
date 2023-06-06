// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import styles from "../../Projects/Project/Project.module.css";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
// import { useFetch } from "../../../../hooks/useFetch";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
import { api } from "../../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AllProjects = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeBtn1, setActiveBtn1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(false);
  const [activeBtn3, setActiveBtn3] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // *****FETCHING ALL JOBS AND DISPATCHING IT********

  // const _url = "/api/v1/jobs";
  // const { data, isLoading, error } = useFetch(_url, "GET");
  const { dispatch, allJobs } = useInvoiceContext();

  // useEffect(() => {
  //   dispatch({
  //     type: "GET_ALL_JOBS",
  //     payload: data?.data,
  //   });
  // }, [dispatch, data]);

  // *****FETCHING ALL JOBS AND DISPATCHING IT******** //
  const fetchJob = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/v1/superadmin/users/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("all_clients_from_getApi", data);
        dispatch({
          type: "GET_ALL_JOBS",
          payload: data?.data,
        });
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [dispatch]);

  const fetchTypeViceJobs = async (url) => {
    const data = await fetchQueryJobs(url);
    console.log("Query__data>>>", data);
    dispatch({
      type: "GET_ALL_JOBS",
      payload: data?.data,
    });

    let newUrl = url.split("=")[1];
    if (newUrl == "incomplete") {
      setActiveBtn1(false);
      setActiveBtn2(true);
      setActiveBtn3(false);
    }
    if (newUrl == "complete") {
      setActiveBtn1(false);
      setActiveBtn2(false);
      setActiveBtn3(true);
    }
  };

  const fetchAllJobs = () => {
    console.log("clicked_All");
    setActiveBtn1(true);
    setActiveBtn2(false);
    setActiveBtn3(false);
    // dispatch({
    //   type: "GET_ALL_JOBS",
    //   payload: allJobs,
    // });
    fetchJob();
  };

  const fetchQueryJobs = async (url) => {
    try {
      const { data } = await api.get(url, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        // console.log("Query__Jobs>>>", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Projects</h1>
        <Link style={{ color: "#fff" }} onClick={() => navigate(-1)}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgb(126, 57, 202)",
            }}
          >
            <ArrowBackIcon style={{ fontSize: "1.8rem" }} />
            Back
          </h2>
        </Link>
      </div>

      <div className={styles.top}>
        <div className={styles.topLeft}>
          <button
            onClick={fetchAllJobs}
            style={{
              backgroundColor: activeBtn1 && "#52b94c",
              color: activeBtn1 && "#ffffff",
            }}
          >
            All
          </button>
          <button
            onClick={() =>
              fetchTypeViceJobs(`/api/v1/jobs?isCompleted=incomplete`)
            }
            style={{
              backgroundColor: activeBtn2 && "#52b94c",
              color: activeBtn2 && "#ffffff",
            }}
          >
            Ongoing
          </button>
          <button
            onClick={() =>
              fetchTypeViceJobs(`/api/v1/jobs?isCompleted=complete`)
            }
            style={{
              backgroundColor: activeBtn3 && "#52b94c",
              color: activeBtn3 && "#ffffff",
            }}
          >
            Finished
          </button>
        </div>

        {/* <div className={styles.topRight}>
          <select name="" id="">
            <option value="Today">Today</option>
          </select>
          <select name="" id="">
            <option value="Filter">Filter</option>
          </select>
          <Link to={`/dashboard/projects/create/${id}`} className={styles.btn}>
            <img src={plusIcon} alt="" />
            <span>Create</span>
          </Link>
        </div> */}
      </div>

      {/********* Tables *************/}

      <div className={styles.project_dashboard_table}>
        {isLoading && <h1 className={styles.isLoading}>Loading...</h1>}
        {error && <div className={styles.error}>{error?.message}</div>}
        {allJobs?.length === 0 && (
          <div
            style={{
              width: "100%",
              fontSize: "1.7rem",
              // textAlign: "center",
              marginTop: "3rem",
            }}
          >
            No jobs corresponding to this user.
          </div>
        )}
        {!error && !isLoading && allJobs?.length !== 0 && (
          <table>
            <thead>
              <tr className={styles.table__header}>
                <th>Project Name</th>
                <th>Project Budget</th>
                {/* <th>Job Location</th>
                <th>Project Team</th> */}
                {/* <th>Progress</th> */}
                <th>Job Status</th>
                {/* <th>
                  <SettingsIcon style={{ color: "#ffffff", height: "20px" }} />
                </th> */}
              </tr>
            </thead>

            <tbody className={styles.gfg}>
              {allJobs?.map((jobs, id) => (
                <tr key={jobs._id} className={styles.table__row}>
                  {/* MODAL_FOR_JOB_COMPLETETION */}
                  {/* {showModal && (
                    <div className={styles.modal__container}>
                      <div className={styles.modal__inner}>
                        <h2>Want to finish this job?</h2>
                        <button>Press to complete</button>
                        <button>Cancel</button>
                      </div>
                    </div>
                  )} */}

                  <td>{jobs?.projectName}</td>
                  <td style={{ color: "#6BDB65" }}>
                    <CurrencyFormatter amount={jobs?.projectBudget} />
                  </td>
                  {/* <td>{jobs?.jobLocation}</td>
                  <td style={{ color: "rgba(255, 255, 255, 0.55)" }}>
                    {jobs?.projectTeamAndResourceRequirement}
                  </td> */}
                  {/* <td>{jobs?.startDate.split("T")[0]}</td> */}
                  {/* <td style={{ textTransform: "capitalize" }}>
                    <ProgressBarLine
                      value={75}
                      min={0}
                      max={100}
                      strokeWidth={5}
                      trailWidth={5}
                      styles={{
                        path: {
                          stroke: "#6BDB65",
                        },
                        trail: {
                          stroke: "#a6e2a3",
                        },
                        text: {
                          fill: "#6BDB65",
                          textAlign: "center",
                          fontSize: "10px",
                          display: "none",
                        },
                      }}
                    />
                    {jobs?.isCompleted == "complete"
                      ? "Completed"
                      : "Incomplete"}
                  </td> */}
                  {/* {jobs?.isCompleted == "incomplete" ? (
                    <td className={styles.select_btn}>
                      <Button onClick={() => handleCompleteJob(jobs?._id)}>
                        Complete Job
                      </Button>
                    </td>
                  ) : (
                    <td className={styles.select_btn}>
                      <Button disabled style={{ opacity: "0.5" }}>
                        Complete Job
                      </Button>
                    </td>
                  )} */}
                  {/* <td>
                    <img
                      src={threeDots}
                      alt=""
                      style={{ cursor: "pointer", height: "28px" }}
                      onClick={() => handleShowPopup(jobs?._id)}
                    />

                    {jobs.isSelected && (
                      <div className={styles.popup}>
                        <div
                          onClick={() =>
                            navigate(`/dashboard/invoices/${jobs._id}`)
                          }
                        >
                          Invoice
                        </div>
                        <div onClick={() => handleDelete(jobs._id)}>Delete</div>
                        <div>
                          <Link
                            to="/dashboard/updateClients"
                            style={{ textDecoration: "none" }}
                            state={{ job: jobs }}
                          >
                            Update
                          </Link>
                        </div>
                      </div>
                    )}
                  </td> */}
                  <td>
                    {jobs?.isCompleted == "complete"
                      ? "Completed"
                      : "Incomplete"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <div className={styles.tableContainer}>
        <ul className={styles.tableHeader}>
          <div className={styles.firstList}>
            <li>
              <span>Project Name</span>
            </li>
          </div>

          <div className={styles.remainingList}>
            <li>
              <span>Project Budget</span>
            </li>
            <li>
              <span>Type</span>
            </li>
            <li>
              <span>Start Date</span>
            </li>
            <li>
              <span>End Date</span>
            </li>
            <li>
              <span>Task Progress</span>
            </li>
          </div>
        </ul>

        <ul className={styles.tableList}>
          <div className={styles.firstList}>
            <li>
              <span>Turbo - App Design</span>
            </li>
          </div>

          <div className={styles.remainingList}>
            <li>
              <span>$0.00</span>
            </li>
            <li>
              <span>Audio</span>
            </li>
            <li>
              <span>20/4/2022</span>
            </li>
            <li>
              <span>20/6/2022</span>
            </li>
            <li>
              <span>Task Progress</span>
            </li>
          </div>
        </ul>
      </div> */}
      <ToastContainer />
    </div>
  );
};

export default AllProjects;
