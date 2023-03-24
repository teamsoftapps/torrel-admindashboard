import styled from "./superAdmin.module.css";
import styles from "../../Projects/Project/Project.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import { Link } from "react-router-dom";
// import { useFetch } from "../../../../hooks/useFetch";
import { api } from "../../../../services/api";
import { useEffect, useState } from "react";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [url, setUrl] = useState("");
  // const { data: allUsersData, isLoading, error } = useFetch(_url);
  // const { data: deletedUser } = useFetch(url, "DELETE");
  const navigate = useNavigate();
  const { dispatch, allUsers } = useInvoiceContext();
  const { user } = useAuthContext();
  console.log("token>>", user?.data?.token);

  console.log("allUsers>>>", allUsers);

  const fetchAllUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users", {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        dispatch({
          type: "GET_ALL_USERS",
          payload: data?.data,
        });
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error==>       ", error);
      setError(error.response.data.message);
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const blockUser = async (url) => {
    setIsLoading(true);
    setError(null);
    console.log("token: ", user?.data?.token)
    try {
      const { data } = await api.patch(url, {}, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("user_blocked>>>", data);
        fetchAllUser();
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      // setError(error);
    }
  };

  const handleDelete = async (id) => {
    // console.log("Bearer__token>>>", user?.data?.token);
    try {
      const { data } = await api.delete(`/api/v1/superadmin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("User_Deleted_Data>>", data);
        dispatch({
          type: "DELETE_USERS",
          payload: data?.data,
        });
        showToastMessage(data?.message);
      }
    } catch (err) {
      console.log("Error_while_deleting_user", err);
    }
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-success-message",
    });
  };

  return (
    <div className={styles.container}>
      <h1>Users List</h1>

      {/********* Tables *************/}

      <div className={styles.project_dashboard_table}>
        {isLoading && <div style={{ fontSize: "25px" }}>Loading...</div>}
        {error && <div>{error.message}</div>}
        {allUsers?.length === 0 && (
          <div style={{ fontSize: "1.4rem" }}>No users in the List yet.</div>
        )}
        {!isLoading && !error && (
          <table>
            {allUsers?.length !== 0 && (
              <thead>
                <tr className={styles.table__header}>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  {/* <th>Company Name</th> */}
                  {/* <th>Edit</th> */}
                  <th>Delete</th>
                  <th>View Details</th>
                  <th>Block/Unblock</th>
                </tr>
              </thead>
            )}

            <tbody className={styles.gfg}>
              {allUsers &&
                allUsers?.map((user, id) => (
                  <tr key={user?._id} className={styles.table__row}>
                    <td> {id + 1} </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={user?.userImage}
                        alt=""
                        className={styled.userImg}
                      />
                      <span>{user?.name}</span>
                    </td>
                    <td>{user?.email} </td>
                    {/* <td>abcd Company</td> */}
                    {/* <td>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <EditIcon className={styled.icon} />
                      </button>
                    </td> */}
                    <td>
                      <button
                        onClick={() => handleDelete(user?._id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon className={styled.icon} />
                      </button>
                    </td>
                    <td>
                      <VisibilityIcon
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          cursor: "pointer",
                          borderRadius: "20px",
                        }}
                        onClick={() =>
                          navigate(`/dashboard/superadmin/users/${user._id}`)
                        }
                      />
                    </td>
                    {/* {user?.active ? (
                      <td>
                        <LockOpenOutlinedIcon />
                      </td>
                    ) : (
                      <td>
                        <LockOutlinedIcon />
                      </td>
                    )} */}
                    <td className={styled.block_unblock}>
                      {user.active ? (
                        <Button
                          onClick={() =>
                            blockUser(
                              `/api/v1/superadmin/users/${user._id}?lock=false`
                            )
                          }
                        >
                          <span>Block</span>
                          <LockOpenOutlinedIcon className={styled.mt_icon} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            blockUser(
                              `/api/v1/superadmin/users/${user._id}?lock=true`
                            )
                          }
                        >
                          <span>Unblock</span>
                          <NoEncryptionOutlinedIcon
                            className={styled.mt_icon}
                          />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserList;
