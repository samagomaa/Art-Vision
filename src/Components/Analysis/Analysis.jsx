import React, { useContext } from 'react'
import { useState } from 'react';
import { SyncLoader } from 'react-spinners'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';

export default function Analysis() {
    const [image, setImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [dataAnalysis, setdataAnalysis] = useState(null);
    let { userToken } = useContext(UserContext)

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e) => {
        console.log("uploading...");
        setloading(true);
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            const formData = new FormData();
            formData.append('Image', file);
            try {
                const res = await axios.post('https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/Prediction/predict-score', formData, {
                                                        headers: {
                                'Authorization': `Bearer ${userToken}`
                        }

                });
                setdataAnalysis(res.data.data?.predictions || null);
                console.log("response", res.data.data);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setloading(false);
    };

    const handleTryAgain = () => {
        setdataAnalysis(null);
        setImage(null);
    };

    return (
        <>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <SyncLoader color="#ffffff" />
                </div>
            ) : (
                <>
                    {image ? (
                        <div className='container'>
                            <div className="row g-1 pb-4 pt-5">
                                <div className="col-md-12">
                                    <Link className='d-flex align-items-center text-decoration-none py-4' to="/">
                                        <span><i className="fa-solid fa-angles-left fa-2xl" style={{ color: "#ffffff" }}></i></span>
                                        <p className='fw-bold text-white mb-0 h3 ms-1'>Visual Score</p>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <div className='d-flex h-100 justify-content-around align-items-center'>
                                        <div className='w-50'>
                                            <img className='w-100' src={image} alt="Uploaded" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex">
                                    <div className='h-100 w-100 d-flex flex-column justify-content-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='fw-bold text-white h4 py-3'>Visual Score:</p>
                                            <Link to="/help"><i className="fa-solid fa-circle-info" style={{ color: "#ffffff" }}></i></Link>
                                        </div>

                                        {dataAnalysis ? (
                                            <>
                                                <div className='border border-2 border-white rounded-2'>
                                                    <p className='p-2 mb-0 text-white d-flex justify-content-between fw-bold'>
                                                        <span>Aesthetic score :</span> {dataAnalysis.total < 0 ? 0 : dataAnalysis.total} /100
                                                    </p>
                                                </div>
                                                <div className='border border-2 border-white mt-3 rounded-2'>
                                                    <p className='p-2 mb-0 text-white d-flex justify-content-between fw-bold'>
                                                        <span>Color :</span> {dataAnalysis.color < 0 ? 0 : dataAnalysis.color} /10
                                                    </p>
                                                </div>
                                                <div className='border border-2 border-white mt-3 rounded-2'>
                                                    <p className='p-2 mb-0 text-white d-flex justify-content-between fw-bold'>
                                                        <span>Composition :</span> {dataAnalysis.composition < 0 ? 0 : dataAnalysis.composition} /10
                                                    </p>
                                                </div>
                                                <div className='border border-2 border-white mt-3 rounded-2'>
                                                    <p className='p-2 mb-0 text-white d-flex justify-content-between fw-bold'>
                                                        <span>Texture :</span> {dataAnalysis.texture < 0 ? 0 : dataAnalysis.texture} /10
                                                    </p>
                                                </div>
                                                <button className="btn btn-warning mt-4 text-white" onClick={handleTryAgain}>
                                                    Try Again with a New Image
                                                </button>
                                            </>
                                        ) : (
                                            <p className='text-white'>Waiting for analysis results...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='container'>
                            <div className="row pt-5">
                                <div className="col-md-12">
                                    <Link className='d-flex align-items-center text-decoration-none pb-5' to="/">
                                        <span><i className="fa-solid fa-angles-left fa-2xl" style={{ color: "#ffffff" }}></i></span>
                                        <p className='fw-bold text-white mb-0 h3 ms-1'>Visual Score</p>
                                    </Link>
                                </div>
                                <div className="col-md-12">
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div
                                            className="w-75 rounded d-flex justify-content-center align-items-center"
                                            style={{ height: '300px', color: '#6c757d', border: '5px dashed white' }}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                        >
                                            <p>Drop your image here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
