
import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateStudent() {
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
    CountryCode:"",
  });

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);

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
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setUserForm({ ...userForm, Country: selectedCountry });

    axios.get(`'https://countriesnow.space/api/v0.1/countries`)
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

  const inputsHandler = (e) => {
    setUserForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/students/create-student", userForm)
      .then((res) => {
        console.log(res.data);
        setUserForm({
          FirstName: "",
          LastName: "",
          Emailid: "",
          Mobileno: "",
          Address1: "",
          Address2: "",
          State: "",
          Country: "",
          Zipcode: "",
          CountryCode:"",
        });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

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
            <h2 className="text-center mb-4">Create Student</h2>
            <form onSubmit={onSubmit}>
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
  <option value="+44">+44 (UK)</option>
  <option value="+86">+86 (China)</option>
  <option value="+33">+33 (France)</option>
  <option value="+49">+49 (Germany)</option>
  <option value="+81">+81 (Japan)</option>
  <option value="+7">+7 (Russia)</option>
  <option value="+61">+61 (Australia)</option>
  <option value="+971">+971 (United Arab Emirates)</option>
  <option value="+55">+55 (Brazil)</option>
  <option value="+34">+34 (Spain)</option>
  <option value="+39">+39 (Italy)</option>
  <option value="+82">+82 (South Korea)</option>
  <option value="+92">+92 (Pakistan)</option>
  <option value="+31">+31 (Netherlands)</option>
  <option value="+52">+52 (Mexico)</option>
  <option value="+966">+966 (Saudi Arabia)</option>
  <option value="+27">+27 (South Africa)</option>
  <option value="+1">+1 (Canada)</option>
             
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
                    Submit
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

export default CreateStudent;