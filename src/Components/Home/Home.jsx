import React from 'react'
import img1 from '../../assets/Рука Вермеера.jpeg'
import { Link } from 'react-router-dom'
import homeStyle from './Home.module.css'

export default function Home() {
  return <>
  <div className='d-flex justify-content-center align-items-center' >
    <div className="container">
      <div className="row g-3 py-4">
        <div className="col-md-12">
      <div className='d-flex justify-content-center py-5'>
        <div className=' d-flex justify-content-center position-relative'>
        <img className='w-50 rounded-pill' src={img1} alt="image" />
        <div className='position-absolute top-50 start-0 translate-middle-y'>
        <h1 className='text-white display-1'> <span className='fw-bold d-flex justify-content-center'>ART</span> VISION</h1>
      </div>
        </div>
      </div>
        </div>
        <div className="col-md-12">
          <div className='pt-5 text-center'>
          <p className='text-white fw-bold display-3'>Features</p>
          </div>
        </div>
        <div className="col-md-4">
          <Link className='text-decoration-none' to="artcaption">
      <div className={`card h-100 p-3 ${homeStyle.featureCard} border border-1 border-black`} >
  <div className="card-body d-flex flex-column justify-content-center align-items-center">
    <div className={`bg-secondary-subtle rounded-circle p-3 ${homeStyle.featureIcon}`}>
    <i className="fa-solid fa-palette fa-xl"></i>
    </div>
    <h5 className="card-title fw-bold pt-3 ">Art Description</h5>
    <p className="card-text text-center">Let AI analyze your artwork and generate a 
      brief description capturing its theme and visual style.</p>
  </div>
</div>
</Link>
        </div>
        <div className="col-md-4">
          <Link className='text-decoration-none' to="analysis">
      <div className={`card h-100 p-3 ${homeStyle.featureCard} border border-1 border-black`}>
  <div className="card-body  d-flex flex-column justify-content-center align-items-center">
    <div className={`bg-secondary-subtle rounded-circle p-3 ${homeStyle.featureIcon}`}>
    <i className="fa-solid fa-list-check fa-xl"></i>
    </div>
    <h5 className="card-title fw-bold pt-3 ">Artwork Scoring</h5>
    <p className="card-text text-center">
    Get smart feedback on your art, covering color harmony, texture, composition, and overall aesthetic.</p>
  </div>
</div>
</Link>
        </div>
        <div className="col-md-4">
          <Link className='text-decoration-none' to="artidentity">
      <div className={`card h-100 p-3 ${homeStyle.featureCard} border border-1 border-black`}>
  <div className="card-body  d-flex flex-column justify-content-center align-items-center">
    <div className={`bg-secondary-subtle rounded-circle p-3 ${homeStyle.featureIcon}`}>
    <i className="fa-solid fa-face-smile fa-xl"></i>
    </div>
    <h5 className="card-title fw-bold pt-3 ">Predict Style & Genre</h5>
    <p className="card-text text-center">
      Instantly identify the artistic style or genre of your artwork, from impressionism to abstract and more.
</p>
  </div>
</div>
</Link>
        </div>
      </div>
    </div>
  </div>
  </>
}
