import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const [userForm, setUserForm] = useState({
    FirstName: "",
    LastName: "",
    Emailid: "",
    Mobileno: "",
    Address1: "",
    Address2: "",
    State: "",
    Country: "",
    Zipcode: "",
    CountryCode: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let params = useParams();
  let navigate = useNavigate();

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    setUserForm({ ...userForm, Country: selectedCountry });

    axios.get(`https://countriesnow.space/api/v0.1/countries/states/${selectedCountry}`)
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setStates(response.data.data);
        } else {
          setStates([]);
        }
      })
      .catch(error => {
        console.error('Error fetching states:', error);
        setStates([]);
      });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/students/update-student/${params.id}`, userForm)
      .then((res) => {
        console.log({ status: res.status });
        navigate("/student-list");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setCountries(response.data.data);
          setLoading(false);
        } else {
          setCountries([]);
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get(`http://localhost:4000/students/get-student/${params.id}`)
      .then((res) => {
        setUserForm({
          FirstName: res.data.data.FirstName,
          LastName: res.data.data.LastName,
          Emailid: res.data.data.Emailid,
          Mobileno: res.data.data.Mobileno,
          Address1: res.data.data.Address1,
          Address2: res.data.data.Address2,
          State: res.data.data.State,
          Country: res.data.data.Country,
          Zipcode: res.data.data.Zipcode,
          CountryCode: res.data.data.CountryCode
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#e9ecef", minHeight: "100vh" }}>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4" style={{ backgroundColor: "#f5f5f5" }}>
            <h2 className="text-center mb-4">Update Student</h2>
            <form onSubmit={onUpdate}>
        <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              name="FirstName"
              value={userForm.FirstName}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              name="LastName"
              value={userForm.LastName}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="Emailid"
              value={userForm.Emailid}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Country Code</label>
            <select
              className="form-select"
              name="CountryCode"
              value={userForm.CountryCode}
              onChange={inputsHandler}
            >
              <option value="">Select country code</option>
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              {/* Add more country codes as needed */}
            </select>
          </div>
          {/* Mobile number input */}
          <div className="mb-3 d-flex">
            <div style={{ width: "30%" }}>
              <label className="form-label">Mobile no.</label>
              <input
                type="text"
                className="form-control"
                name="Mobileno"
                value={userForm.Mobileno}
                onChange={inputsHandler}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Address 1</label>
            <input
              type="text"
              className="form-control"
              name="Address1"
              value={userForm.Address1}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address 2</label>
            <input
              type="text"
              className="form-control"
              name="Address2"
              value={userForm.Address2}
              onChange={inputsHandler}
            />
          </div>
          {/* Other form inputs... */}
     
          <div className="mb-3">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              name="Country"
              value={userForm.Country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <select
              className="form-select"
              name="State"
              value={userForm.State}
              onChange={inputsHandler}
            >
              <option value="">Select a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {/* Other form inputs... */}
          <div className="mb-3">
            <label className="form-label">ZipCode</label>
            <input
              type="text"
              className="form-control"
              name="Zipcode"
              value={userForm.Zipcode}
              onChange={inputsHandler}
            />
          </div>
          {/* Submit button */}
          <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EditStudent;
