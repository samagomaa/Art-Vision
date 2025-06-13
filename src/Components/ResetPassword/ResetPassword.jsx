import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as yub from "yup";
import { useLocation } from "react-router-dom";


let validateScheme = yub.object({
  newPassword: yub.string().required("Password is required"),
  confirmPassword: yub
    .string()
    .oneOf(
      [yub.ref("newPassword")],
      "New password and Confirm password are not the same"
    )
    .required("Confirm password is required"),
});
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 


export default function ResetPassword() {
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false);
  let [resMessage, setResMessage] = useState("");

  let formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(value) {
  setIsLoading(true);
  try {
    const response = await axios.post(
      `https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/User/reset-password`,
      {
        email,
        token,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      }
    );
    if (response?.data.status.code === 0) {
      setResMessage(response.data.status.message);
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}



  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div
        id="forgetPassword"
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <form onSubmit={formik.handleSubmit} className="w-75">
          <div className="my-3">
            <h4 className="text-white">Reset Your Password</h4>
          </div>
          

          <label className="text-white fw-medium mb-2" htmlFor="newPassword">
            newPassword :
          </label>
          <input
            id="newPassword"
            className="form-control mb-3"
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Vision1234#"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger py-2 my-2 text-danger py-3">
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <label
            className="text-white fw-medium mb-2"
            htmlFor="confirmPassword"
          >
            confirmPassword :
          </label>
          <input
            id="confirmPassword"
            className="form-control mb-3"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Vision1234#"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div className="alert alert-danger py-2 my-2 text-danger py-3">
              {formik.errors.confirmPassword}
            </div>
          ) : (
            ""
          )}

          {resMessage ? (
            <p className="alert alert-info my-2 fw-bold">{resMessage}.</p>
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
              Reset Password
            </button>
          )}
        </form>
      </div>
    </>
  );
}
