import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function History() {
  const [isloading, setisloading] = useState(false);
  let [result, setResult] = useState([]);
  let { userToken } = useContext(UserContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getUserHistory();
  }, []);

  async function getUserHistory() {
    setisloading(true);

    let queryParams = [];

    if (startDate) queryParams.push(`startDate=${startDate}`);
    if (endDate) queryParams.push(`endDate=${endDate}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    let response = await axios
      .get(
        `https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/History/user-history${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .catch((err) => {
        setisloading(false);
        console.log(err);
      });
    if (response.data.status.code === 0) {
      setisloading(false);
      setResult(response?.data.data);
      
    }
  }

  return (
    <>
      <div className="container">
        <div className="row g-3">
          <div className="col-md-12">
            <Link
              className="d-flex align-items-center text-decoration-none py-5"
              to="/"
            >
              <span>
                <i
                  className="fa-solid fa-angles-left fa-2xl"
                  style={{ color: "#ffffff" }}
                ></i>
              </span>
              <p className="fw-bold text-white mb-0 h3 ms-2">History</p>
            </Link>
          </div>
          {isloading ? (
            <div className="d-flex justify-content-center">
              <SyncLoader color="#ffffff" />{" "}
            </div>
          ) : (
            <>
              <div className="col-md-12">
                <form className="row g-4 w-75 mx-auto">
                  <div className="col-auto">
                    <label htmlFor="startDate" className="visually-hidden">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      placeholder="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="endDate" className="visually-hidden">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      placeholder="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary mb-3"
                      onClick={getUserHistory}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-auto">
                    <p className="fw-bold text-white">
                      Results : {result.length}
                    </p>
                  </div>
                </form>
              </div>
              <div className="col-md-12">
                <div
                  className="row w-75 mx-auto overflow-auto g-3"
                  style={{ maxHeight: "400px" }}
                >
                  {result?.length > 0
                    ? result.map((userHistory) => (
                        <div className="col-md-12" key={userHistory.id}>
                          <div className="d-flex align-items-center p-3 bg-body-secondary rounded-3">
                            <div>
                              <div className="w-75">
                                <img
                                  className="img-fluid"
                                  src={`data:image/jpeg;base64,${userHistory.imageContent}`}
                                  style={{
                                    width: "200px",
                                    height: "150px",
                                    objectFit: "contain",
                                  }}
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div>
                              <a
                                href={`data:image/jpeg;base64,${userHistory.imageContent}`}
                                download={userHistory.imageName || "image.jpg"}
                                className="btn btn-sm btn-outline-primary border-0"
                              >
                                <i
                                  className="fa-solid fa-cloud-arrow-down"
                                  style={{ color: "#c0cb87" }}
                                ></i>
                              </a>
                              <p className=" text-secondary">
                                {userHistory.uploadedAt.split("T")[0]}
                              </p>
                              <p>
                                {userHistory.email ? userHistory.email : ""}
                              </p>
                              <p>{userHistory.imageName}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
