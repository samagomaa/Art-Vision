import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { SyncLoader } from "react-spinners";
import * as yub from "yup";

let validateScheme = yub.object({
  email: yub.string().required("Email is required").email("enter valid email"),
});

export default function ForgetPassword() {
  let [isLoading, setIsLoading] = useState(false);
  let [resMessage, setResMessage] = useState("");

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateScheme,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(value) {
    setIsLoading(true);
    let response = await axios
      .post(
        `https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/User/forgot-password`,
        value
      )
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    if (response?.data.status.code === 0) {
      setIsLoading(false);
      setResMessage(response.data.status.message);
    }
  }

  return (
    <>
      <Helmet>
        <title> Forgetpassword</title>
      </Helmet>
      <div
        id="forgetPassword"
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <form onSubmit={formik.handleSubmit} className="w-75">
          <div className="my-3">
            <h4 className="text-white">
              Please enter your verification Email :
            </h4>
          </div>
          <div className="form-floating mb-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="email"
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email </label>
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger py-2 my-2">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {resMessage ? (
              <p className="alert alert-info my-2 fw-bold">
                {resMessage}. Please check your email.
              </p>
            ) : (
              ""
            )}
            {isLoading ? (
              <button
                className="btn btn-warning p-3 mt-3 d-flex justify-content-center"
                type="submit"
              >
                <SyncLoader color="#ffffff" />
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-warning my-3 fs-5 fw-bold text-white"
              >
                verify
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
