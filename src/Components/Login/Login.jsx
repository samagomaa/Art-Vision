import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yub from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";
import { SyncLoader } from "react-spinners";

export default function Login() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [resMessage, setresMessage] = useState(null);
  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setisloading(true);
    let res = await axios
      .post(
        `https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/User/login`,
        values
      )
      .catch((err) => {
        setisloading(false);
        console.log(err);
        navigate("*");
      });
    if (res.status === 200) {
      console.log(res);
      
      setisloading(false);
      localStorage.setItem("userToken", res.data.data);
      setUserToken(res.data.data);
      setresMessage(res.data.status.message);

       if (values.email === "admin@gmail.com" && values.password === "P@$$w0rd") {
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.setItem("isAdmin", "false");
    }

      if (res.data.status.code === 0) {
        navigate("/");
      }
    }
  }

  let validateScheme = yub.object({
    email: yub.string().email("email is invalid").required("email is required"),
    password: yub.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="d-flex flex-column justify-content-center bg-body-tertiary bg-opacity-75 w-75 p-4 rounded-4">
          <div className="d-flex justify-content-center pb-4 w-100">
            <h1 className="fw-bold">Welcome Back</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="emailf">Email :</label>
            <input
              id="emailf"
              className="form-control mb-3"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger py-2 my-2">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="passwordf">Password :</label>
            <input
              id="passwordf"
              className="form-control mb-3"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger py-2 my-2">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
            <div>
              {resMessage ? (
                <p className="alert alert-warning py-2"> {resMessage} </p>
              ) : (
                ""
              )}
              <Link
                className="btn btnFocus fs-6 p-0 mb-2"
                to={"/Forgetpassword"}
              >
                {" "}
                <span className="textChange">forget your password ?</span>
              </Link>
            </div>
            <div>
              {isloading ? (
                <button
                  className="btn btn-success w-100 py-3 mt-3 d-flex justify-content-center"
                  type="submit"
                >
                  <SyncLoader color="#ffffff" />
                </button>
              ) : (
                <>
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    className="btn btn-outline-secondary fs-5 w-100"
                    type="submit"
                  >
                    Log IN
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
