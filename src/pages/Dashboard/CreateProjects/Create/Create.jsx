import React, { useState } from "react";
import styles from "./Create.module.css";
import plusIcon from "../../../../images/plusIcon.png";
// import backArrow from "../../../../images/arrowBack.png";
// import imageIcon from "../../../../images/imgUpload.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useFetch } from "../../../../hooks/useFetch";
import { api } from "../../../../services/api";
// import { useFetch } from "../../../../hooks/useFetch";
// import axios from "axios";

const Create = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // const url = `http://localhost:5000/api/v1/jobs`;
  // const { data, apiData, isLoading, error } = useFetch(url, "POST");
  // const location = useLocation();
  // const { clientId } = location.state;
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("clientId>>>>", clientId);

  const [createJob, setCreateJob] = useState({
    projectName: "",
    client: id,
    jobLocation: "",
    projectBudget: null,
    projectTeamAndResourceRequirement: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // apiData(createJob);

    // if (error) {
    //   return;
    // }
    // if (data) {
    //   console.log("Jobs_created_custom_hook_data", data);
    //   showToastMessage("Job Created Sucessfully.");
    //   resetForm();
    //   setTimeout(() => {
    //     navigate(`/dashboard/projects/${id}`);
    //   }, 2000);
    // }
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/api/v1/jobs", createJob, {
        headers: { Authorization: `Bearer ${user?.data?.token}` },
      });

      if (data) {
        setError(null);
        setIsLoading(false);
        console.log("Jobs Data>>>", data);
        showToastMessage("Job Created Sucessfully.");
      }

      resetForm();
      // setTimeout(() => {
      //   navigate(`/dashboard/projects/${id}`);
      // }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log(error.response.data);
    }
  };

  // console.log("checked>>>>", checked);

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const resetForm = () => {
    setCreateJob({
      projectName: "",
      jobLocation: "",
      projectBudget: "",
      projectTeamAndResourceRequirement: "",
    });
  };

  return (
    <div className={styles.createProject}>
      <h1>Project</h1>

      {/* <div className={styles.top}>
        <div className={styles.back}>
          <img src={backArrow} alt="backArrow" />
          <span>Back</span>
        </div>
        <div className={styles.btn} onClick={handlePost}>
          <img src={plusIcon} alt="" />
          <span>Create</span>
        </div>
      </div> */}

      {/************* Create Projects Form *********************/}
      <div className={styles.formContainer}>
        <h1>Create Project</h1>
        {error && <p className={styles.error}>{error?.message}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.left}>
              <div className={styles.inputContainer}>
                <label>
                  <span>Project Name</span>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={createJob.projectName}
                    onChange={(e) =>
                      setCreateJob({
                        ...createJob,
                        projectName: e.target.value,
                      })
                    }
                  />
                </label>
                {/* <label>
                  <span>Project Leader</span>
                  <input
                    type="text"
                    placeholder="Project Leader"
                    value={createJob.projectLeader}
                    onChange={(e) =>
                      setCreateJob({
                        ...createJob,
                        projectLeader: e.target.value,
                      })
                    }
                  />
                </label> */}
              </div>
              {/* <div className={styles.inputContainer}>
              <label>
                <span>EST. Start Date</span>
                <input
                  type="date"
                  placeholder="March 2, 2021"
                  value={createJob.startDate}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, startDate: e.target.value })
                  }
                />
              </label>
              <label>
                <span>EST. Finish Date</span>
                <input
                  type="date"
                  placeholder="March 2, 2021"
                  value={createJob.finishDate}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, finishDate: e.target.value })
                  }
                />
              </label>
            </div> */}
              <div className={styles.jobLocation}>
                <label>
                  <span>Job Location</span>
                  <input
                    type="text"
                    placeholder="Location"
                    value={createJob.jobLocation}
                    onChange={(e) =>
                      setCreateJob({
                        ...createJob,
                        jobLocation: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              {/* <div className={styles.inputContainer}>
              <label>
                <span>Company </span>
                <input
                  type="text"
                  placeholder="Company"
                  value={createJob.company}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, company: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Address</span>
                <input
                  type="text"
                  placeholder="Address"
                  value={createJob.address}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, address: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                <span> Phone</span>
                <input
                  type="text"
                  placeholder="+1-000-000"
                  value={createJob.phone}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, phone: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="text"
                  placeholder="@"
                  value={createJob.email}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, email: e.target.value })
                  }
                />
              </label>
            </div> */}
              {/* <div className={styles.Summary}>
              <label>
                <span>Summary</span>
                <textarea
                  rows="8"
                  placeholder="Summary"
                  value={createJob.summary}
                  onChange={(e) =>
                    setCreateJob({ ...createJob, summary: e.target.value })
                  }
                />
              </label>
            </div> */}
            </div>

            <div className={styles.right}>
              {/* <div className={styles.inputContainer}>
              <label>
                <span>Desired Outcome </span>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={createJob.desiredOutcome}
                  onChange={(e) =>
                    setCreateJob({
                      ...createJob,
                      desiredOutcome: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Project Schedule</span>
                <input
                  type="text"
                  placeholder="Project Leader"
                  value={createJob.projectSchedule}
                  onChange={(e) =>
                    setCreateJob({
                      ...createJob,
                      projectSchedule: e.target.value,
                    })
                  }
                />
              </label>
            </div> */}
              <div className={styles.inputContainer}>
                <label>
                  <span>Project Budget</span>
                  <input
                    type="number"
                    placeholder="Project Budget"
                    value={createJob.projectBudget}
                    onChange={(e) =>
                      setCreateJob({
                        ...createJob,
                        projectBudget: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span>Projected Team And Resource Requirement </span>
                  <input
                    type="text"
                    placeholder="Project Leader"
                    value={createJob.projectTeamAndResourceRequirement}
                    onChange={(e) =>
                      setCreateJob({
                        ...createJob,
                        projectTeamAndResourceRequirement: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className={styles.checkBox}>
                <input type="checkbox" onChange={() => setChecked(!checked)} />
                <p>Want to create a sub projects?</p>
              </div>

              {/* <div className={styles.uploadImage}>
              <span style={{ fontSize: "13px", marginBottom: "10px" }}>
                Athurized Client Signature
              </span>
              <div className={styles.imageInput}>
                <img src={imageIcon} alt="" />
                <span className={styles.signatureSpan}>Signature Image</span>
                <span className={styles.sizeSpan}>
                  Recommend Size (1920 x 1080) example{" "}
                </span>
                <label for="inputTag">
                  <span>Browse</span>
                  <input
                    id="inputTag"
                    type="file"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div> */}
              {/* <div className={styles.inputContainer}>
              <label>
                <span>Date of Acceptance</span>
                <input
                  type="Date"
                  placeholder="March 2, 2021"
                  style={{ background: "#351B60" }}
                  value={createJob.dateOfAcceptance}
                  onChange={(e) =>
                    setCreateJob({
                      ...createJob,
                      dateOfAcceptance: e.target.value,
                    })
                  }
                />
              </label>
            </div> */}
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

          <button
            disabled={checked ? false : true}
            style={{ marginTop: "20px", opacity: checked ? 1 : 0.5 }}
            className={styles.btn}
            onClick={() => navigate(`/dashboard/subprojects/create/${id}`)}
          >
            {" "}
            <img src={plusIcon} alt="" />
            <span> Create SubProjects</span>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;
