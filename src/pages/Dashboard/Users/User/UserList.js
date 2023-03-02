import React from "react";
import styled from "./superAdmin.module.css";
import styles from "../../Projects/Project/Project.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import { useEffect } from "react";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import { useState } from "react";

const UserList = () => {
  const allUsersUrl = "/api/v1/superadmin/users";
  const [url, setUrl] = useState("");
  const { data: allUsersData, isLoading, error } = useFetch(allUsersUrl, "GET");
  const { data: deletedUser } = useFetch(url, "DELETE");

  const { dispatch, allUsers } = useInvoiceContext();

  // console.log("allUsers:::", allUsers);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_USERS",
      payload: allUsersData?.data,
    });
  }, [dispatch, allUsersData]);

  const handleDelete = (userId) => {
    setUrl(`/api/v1/superadmin/users/${userId}`);
    if (deletedUser) {
      dispatch({
        type: "DELETE_USERS",
        payload: userId,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>User List</h1>

      {/********* Tables *************/}

      <div className={styles.project_dashboard_table}>
        <table>
          <thead>
            <tr className={styles.table__header}>
              <th>S.No</th>
              <th>User Name</th>
              <th>User Email</th>
              {/* <th>Company Name</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className={styles.gfg}>
            {allUsers &&
              allUsers?.map((user, id) => (
                <tr key={user?._id} className={styles.table__row}>
                  <td> {id + 1} </td>
                  <td>
                    {" "}
                    <Link
                      className={styled.details}
                      to={`/dashboard/superAdmin/userDetails/${user?._id}`}
                      state={{ name: user?.name }}
                    >
                      {user?.name}
                    </Link>{" "}
                  </td>
                  <td>{user?.email} </td>
                  {/* <td>abcd Company</td> */}
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      <EditIcon className={styled.icon} />
                    </button>
                  </td>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
