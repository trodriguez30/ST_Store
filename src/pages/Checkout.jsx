import React, { useState } from "react";
import { saveShippingAddress } from "../services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: ""
};

//Enum pattern
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED"
};

export default function Checkout({ cart, dispatch }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setAddress((address) => {
      return {
        ...address,
        [e.target.id]: e.target.value
      };
    });
  };

  const handleBlur = (event) => {
    setTouched((curr) => {
      return { ...curr, [event.target.id]: true };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: "CLEAR_CART" });
        setStatus(STATUS.COMPLETED);
        setAddress(emptyAddress);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  //It will be changed to React Hook Form later
  const getErrors = (address) => {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  };

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping!!!</h1>;
  }

  //derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.entries(errors).map(([key, value]) => {
              return <li key={key}>{value}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
