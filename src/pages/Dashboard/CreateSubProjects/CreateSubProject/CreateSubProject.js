import React, { useState, useEffect } from "react";
import styles from "./CreateSubProject.module.css";
import plusIcon from "../../../../images/plusIcon.png";
// import backArrow from "../../../../images/arrowBack.png";
// import imageIcon from "../../../../images/imgUpload.png";
// import axios from "axios";
import { api } from "../../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetch } from "../../../../hooks/useFetch";
// import { light } from "@mui/material/styles/createPalette";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const CreateSubProject = ({ clientId }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobID, setSubJobID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const url = `http://localhost:5000/api/v1/subjobs`;
  // const { data, apiData, isLoading, error } = useFetch(url, "POST");
  const [selectValue, setSelectedValue] = useState(null);
  const getJobsUrl = `/api/v1/jobs/client/${id}`;
  const { data: getClientJobs } = useFetch(getJobsUrl, "GET");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // console.log("Get_client_jobs_fromFetchHooks", getClientJobs.data);

  const [createSubJob, setCreateSubJob] = useState({
    subJobName: "",
    subJobLocation: "",
    subJobBudget: null,
    subJobTeamAndResourceRequirement: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (data) {
    //   console.log("Jobs_created_custom_hook_data", data);
    //   showToastMessage("Job Created Sucessfully.");
    //   resetForm();
    //   setTimeout(() => {
    //     navigate(`/dashboard/subprojects/${jobID}`);
    //   }, 2000);
    // }

    if (!jobID) {
      // alert("Please select the job that subjob to be create");
      setError("Please select the job that subjob to be create");
      return;
    }

    const payload = { ...createSubJob, job: jobID, client: clientId };

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/api/v1/subjobs", payload, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        setIsLoading(false);
        setError(null);
        console.log("Sub__projects__Data>>>", data);
        showToastMessage(data.message);
      }
      resetForm();
      setTimeout(() => {
        navigate(`/dashboard/subprojects/${jobID}`);
      }, 3000);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setError(error.response.data.message);
      console.log(error.response.data);
    }
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const resetForm = () => {
    setCreateSubJob({
      subJobName: "",
      subJobLocation: "",
      subJobBudget: null,
      subJobTeamAndResourceRequirement: "",
    });
  };

  const handleDropDown = (id, projectName) => {
    setSubJobID(id);
    setIsOpen(false);
    setSelectedValue(projectName);
  };

  return (
    <div className={styles.createProject}>
      <h1>Sub Project</h1>

      {/************* Create Projects Form *********************/}
      <div className={styles.formContainer}>
        <h1>Create Sub Project</h1>
        {error && (
          <div style={{ color: "red", fontSize: "0.9rem", margin: "1rem 0" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.left}>
              <div className={styles.inputContainer}>
                <label>
                  <span>Project Name</span>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={createSubJob.subJobName}
                    onChange={(e) =>
                      setCreateSubJob({
                        ...createSubJob,
                        subJobName: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span>Sub Project Lists</span>
                  <div className={styles.dropdownContainer}>
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className={styles.dropdownHeader}
                    >
                      {selectValue ? selectValue : "Select Sub Project"}{" "}
                      <ArrowDropDownIcon />
                    </div>

                    {isOpen && (
                      <div className={styles.dropdownListContainer}>
                        <ul className={styles.dropdownList}>
                          {getClientJobs?.data?.map((job) => (
                            <li
                              onClick={() =>
                                handleDropDown(job._id, job.projectName)
                              }
                              className={styles.dropdownListItem}
                              key={job._id}
                            >
                              {job.projectName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className={styles.jobLocation}>
                <label>
                  <span>Job Location</span>
                  <input
                    type="text"
                    placeholder="Location"
                    value={createSubJob.subJobLocation}
                    onChange={(e) =>
                      setCreateSubJob({
                        ...createSubJob,
                        subJobLocation: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.inputContainer}>
                <label>
                  <span>Project Budget</span>
                  <input
                    type="number"
                    placeholder="Project Budget"
                    value={createSubJob.subJobBudget}
                    onChange={(e) =>
                      setCreateSubJob({
                        ...createSubJob,
                        subJobBudget: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span>Projected Team And Resource Requirement </span>
                  <input
                    type="text"
                    placeholder="Project Leader"
                    value={createSubJob.subJobTeamAndResourceRequirement}
                    onChange={(e) =>
                      setCreateSubJob({
                        ...createSubJob,
                        subJobTeamAndResourceRequirement: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className={styles.inputContainer}></div>
            </div>
          </div>
          {isLoading ? (
            <button
              className={styles.btn}
              disabled={isLoading}
              styles={{ opacity: "0.7" }}
            >
              <img src={plusIcon} alt="" />
              <span>Creating...</span>
            </button>
          ) : (
            <button className={styles.btn}>
              <img src={plusIcon} alt="" />
              <span>Create</span>
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateSubProject;
