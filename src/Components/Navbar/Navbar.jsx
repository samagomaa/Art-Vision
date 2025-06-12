import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("login");
  }

  return (
    <>
      <nav
        style={{ backgroundColor: "#3b5323" }}
        className="navbar navbar-expand-lg z-3 pb-0 border-bottom border-white border-2"
      >
        <div className="container">
          <Link className="navbar-brand text-white fs-6" to="/">
            <span className="h5 fw-bold d-flex justify-content-center mb-0">
              ART
            </span>
            VISION
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              {userToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="styleswap">
                      Style Swap
                    </Link>
                  </li>
                  <li className="nav-item dropdown ">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Critique
                    </Link>
                    <ul className="dropdown-menu bg-secondary-subtle">
                      <li>
                        <Link className="dropdown-item" to="Artidentity">
                          Art Identity
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="artcaption">
                          Art caption
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="analysis">
                          Art Visual Score
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="history">
                      History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="help">
                      Help
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link text-white fw-bold fa-lg ms-3"
                      onClick={() => logOut()}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="text-white fw-bold btn btn-warning me-2"
                      to="register"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="text-white fw-bold btn btn-warning"
                      to="login"
                    >
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
