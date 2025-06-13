import { useState } from 'react';
import { useFormik } from 'formik';
import * as yub from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SyncLoader} from 'react-spinners'
import { Helmet } from 'react-helmet';



let validateScheme = yub.object({
  firstName: yub.string().min(3 , "name minimum length is 3").max(10 , "name maximum length is 10").required("name is required"),
  lastName: yub.string().min(3 , "name minimum length is 3").max(10 , "name maximum length is 10").required("name is required"),
  email: yub.string().email("email is invalid").required("email is required"),
  password: yub.string().required("password is required"),
})

export default function Register() {
  
  let navigate = useNavigate()
  const [error , seterror] = useState(null)
  const [ isloading , setisloading] = useState(false)
  const [ resMessage , setresMessage] = useState(null)
  
  async function submitRegister(values){
    setisloading(true);
    let response = await axios.post(`https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/User/register` , values )
    .catch(
    (err) => { 
      setisloading(false)
      seterror(err.response.data.message)
      console.log(response);
    }
    )
    if(response.status === 200){
      setisloading(false);
      setresMessage(response.data.status.message)
      if(response.data.status.code === 0){
        navigate("/login");
      }
    }
  }
  
  let formik = useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",
    },
    validationSchema:validateScheme,
    onSubmit:submitRegister
  })
  return <>
    <Helmet><title>Register</title></Helmet>
  
    <div className='d-flex align-items-center justify-content-center py-5'>
    <div className='d-flex flex-column justify-content-center bg-body-tertiary bg-opacity-75 w-75 p-4 rounded-4'>
      <div className='d-flex justify-content-center pb-4'>
      <h2 className='fw-bold'>Sign up</h2>
      </div>

  <form onSubmit={formik.handleSubmit}>
    {error?<div className='alert alert-dange'>{error}</div>:""}
    <label htmlFor="namef">FirstName :</label>
    <input id='namef' className='form-control mb-3' type="text" name='firstName' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.firstName && formik.touched.firstName ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.firstName}</div> : ''}
    <label htmlFor="nameL">LastName :</label>
    <input id='nameL' className='form-control mb-3' type="text" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.lastName && formik.touched.lastName ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.lastName}</div> : ''}
    <label htmlFor="emailf">email :</label>
    <input id='emailf' className='form-control mb-3' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.email}</div> : ''}
    <label htmlFor="passwordf">password :</label>
    <input id='passwordf' className='form-control mb-3' type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.password}</div>: ''}
    {isloading?<button className='btn btn-success w-100 my-3 fs-4 float-end mb-5' type='submit'>
  <SyncLoader color="#ffffff"/>
    </button>:<> { resMessage ? <p className="alert alert-warning"> {resMessage} </p> : "" }
    <button disabled = {!(formik.isValid && formik.dirty)} className='btn btn-outline-secondary fs-5 w-100' type='submit'>Sign up</button>
     </>} 
  </form>
  </div>
  </div>
  
  </>
}
