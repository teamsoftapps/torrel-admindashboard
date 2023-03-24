import React, { useEffect, useState } from "react";
import styles from "./Project.module.css";
import plusIcon from "../../../../images/plusIcon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
// import { ProgressBarLine } from "react-progressbar-line";
// import axios from "axios";
import { api } from "../../../../services/api";
import threeDots from "../../../../images/threeDots.png";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetch } from "../../../../hooks/useFetch";
import CurrencyFormatter from "../../../../utils/currencyFormatter";

const Project = () => {
  const { id } = useParams();

  const projectUrl = `/api/v1/jobs/client/${id}`;
  const [url, setUrl] = useState("");
  const { data: deletedData } = useFetch(url, "DELETE");

  const { data: allProjects, isLoading, error } = useFetch(projectUrl, "GET");
  const [activeBtn1, setActiveBtn1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(false);
  const [activeBtn3, setActiveBtn3] = useState(false);
  const { dispatch, allJobs } = useInvoiceContext();
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  console.log("All_Projects_from_custom_fetch_hook>>>", allProjects);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_JOBS",
      payload: allProjects?.data,
    });
  }, [dispatch, allProjects]);

  const handleShowPopup = (id) => {
    // console.log("_id>>>>>>", id);
    const newJobs = allJobs.map((job) => {
      if (job._id === id) {
        // console.log("ID==>", id);
        return { ...job, isSelected: !job.isSelected };
      } else {
        return job;
      }
    });

    dispatch({
      type: "GET_ALL_JOBS",
      payload: newJobs,
    });
  };

  const handleDelete = async (id) => {
    console.log("Jobs__Deleted__id>>>>", id);
    setUrl(`/api/v1/jobs/${id}`);
    if (deletedData) {
      dispatch({
        type: "DELETE__JOBS",
        payload: id,
      });
      console.log("Job_Deleted_Data>>>", deletedData);
      showToastMessage("Job Deleted Sucessfully.");
    }
  };

  const getByDate = async (value) => {
    const date = new Date().toJSON();
    console.log("date", date);
    console.log("value", value);
    setSelectedOption(value);
    try {
      const { data } = await api.get(
        `/api/v1/jobs/client/${id}?date=${date}&type=${value}`
      );

      if (data) {
        console.log("filteredProjects:::::::", data);
        dispatch({
          type: "GET_BY_DATE",
          payload: data?.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

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
    setActiveBtn1(true);
    setActiveBtn2(false);
    setActiveBtn3(false);
    dispatch({
      type: "GET_ALL_JOBS",
      payload: allProjects?.data,
    });
  };

  const fetchQueryJobs = async (url) => {
    try {
      const { data } = await api.get(url);
      if (data) {
        // console.log("Query__Jobs>>>", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteJob = async (id) => {
    console.log("Id>>>>", id);
    try {
      const { data } = await api.patch(`/api/v1/jobs/${id}`);
      if (data) {
        console.log("data.data", data);
        console.log(data?.message + ">>>>", data);
        // dispatch({
        //   type: "CREATE__JOBS",
        //   payload: data?.data,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Project</h1>
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
              fetchTypeViceJobs(
                `/api/v1/jobs/client/${id}?isCompleted=incomplete`
              )
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
              fetchTypeViceJobs(
                `/api/v1/jobs/client/${id}?isCompleted=complete`
              )
            }
            style={{
              backgroundColor: activeBtn3 && "#52b94c",
              color: activeBtn3 && "#ffffff",
            }}
          >
            Finished
          </button>
        </div>

        <div className={styles.topRight}>
          <select
            value={selectedOption}
            onChange={(e) => getByDate(e.target.value)}
            name=""
            id=""
          >
            <option value="today">Today</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {/* <select name="" id="">
            <option value="Filter">Filter</option>
          </select> */}
          <Link to={`/dashboard/projects/create/${id}`} className={styles.btn}>
            <img src={plusIcon} alt="" />
            <span>Create</span>
          </Link>
        </div>
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
            No jobs yet, Please Add One.
          </div>
        )}
        {!error && !isLoading && allJobs?.length !== 0 && (
          <table>
            <thead>
              <tr className={styles.table__header}>
                <th>Project Name</th>
                <th>Project Budget</th>
                <th>Job Location</th>
                <th>Project Team</th>
                <th>Progress</th>
                <th>Job Status</th>
                <th>Sub Jobs </th>
                <th>
                  <SettingsIcon style={{ color: "#ffffff", height: "20px" }} />
                </th>
              </tr>
            </thead>

            <tbody className={styles.gfg}>
              {
                allJobs?.map((jobs, id) => (
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
                    <td style={{ color: "#6BDB65" }}><CurrencyFormatter amount={jobs?.projectBudget}/></td>
                    <td>{jobs?.jobLocation}</td>
                    <td style={{ color: "rgba(255, 255, 255, 0.55)" }}>
                      {jobs?.projectTeamAndResourceRequirement}
                    </td>
                    {/* <td>{jobs?.startDate.split("T")[0]}</td> */}
                    <td style={{ textTransform: "capitalize" }}>
                      {/* <ProgressBarLine
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
                    /> */}
                      {jobs?.isCompleted == "complete"
                        ? "Completed"
                        : "Incomplete"}
                    </td>
                    {jobs?.isCompleted == "incomplete" ? (
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
                    )}
                    <Link
                      style={{ textDecoration: "none", marginBottom: "0" }}
                      to={`/dashboard/subprojects/${jobs._id}`}
                    >
                      <td className={styles.select_btn}>
                        <Button>View Sub Jobs</Button>
                      </td>
                    </Link>
                    <td>
                      <img
                        src={threeDots}
                        alt=""
                        style={{ cursor: "pointer", height: "28px" }}
                        onClick={() => handleShowPopup(jobs?._id)}
                      />

                      {jobs.isSelected && (
                        <div className={styles.popup}>
                          {/* <div
                          onClick={() =>
                            navigate(`/dashboard/subprojects/${jobs._id}`)
                          }
                        >
                          Sub Job
                        </div> */}
                          <div
                            onClick={() =>
                              navigate(`/dashboard/invoices/${jobs._id}`)
                            }
                          >
                            Invoice
                          </div>
                          <div onClick={() => handleDelete(jobs._id)}>
                            Delete
                          </div>
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

export default Project;
