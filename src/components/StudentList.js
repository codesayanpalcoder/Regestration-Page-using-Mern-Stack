import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentList() {
  const [userForm, setUserForm] = useState([]);

  const deleteStudent = (_id) => {
    axios
      .delete("http://localhost:4000/students/delete-student/" + _id)
      .then(() => {
        console.log("Data successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then((res) => {
        setUserForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userForm]);
  return(

  <div className="container">
  <h2 className="text-center mb-4">Student List</h2>
  <div className="table-responsive">
    <table className="table table-bordered table-striped text-center">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Emailid</th>
          <th scope="col">CountryCode</th>
          <th scope="col">Mobileno</th>
          <th scope="col">Address1</th>
          <th scope="col">Address2</th>
          <th scope="col">Country</th>
          <th scope="col">State</th>
          <th scope="col">Zipcode</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userForm.map((user, index) => (
          <tr key={index}>
            <th scope="row">{user._id}</th>
            <td>{user.Firstname}</td>
            <td>{user.Lastname}</td>
            <td>{user.Emailid}</td>
            <td>+{user.CountryCode}</td>
            <td>{user.Mobileno}</td>
            <td>{user.Address1}</td>
            <td>{user.Address2}</td>
            <td>{user.Country}</td>
            <td>{user.State}</td>
            <td>{user.Zipcode}</td>
            <td>
            <Link
        className="btn btn-primary btn-sm me-2 mb-2"
        to={"/edit-student/" + user._id}
      >
        Edit
      </Link>
      <button
        className="btn btn-danger btn-sm mb-2"
        onClick={() => deleteStudent(user._id)}
      >
        Delete
      </button>
    </td>
  </tr>
))}
      </tbody>
    </table>
  </div>
</div>
);
}

export default StudentList;