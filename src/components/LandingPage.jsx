import { useState } from "react";
import "../css/LandingPage.css";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
function LandingPage({ setParentProp }) {
  const [login, setLogin] = useState(true);
  const [loginClicked, setLoginClicked] = useState("#43766C");
  const [registerClicked, setRegisterClicked] = useState("#092635");

  return (
    <>
      <div className="grid home-page-div w-screen h-screen place-content-center ">
        <div className="home-main-div rounded-3xl p-8">
          <div className="grid place-content-center">
            <div className="flex">
              <div>
                <div
                  className="login px-6 text-3xl font-semibold   py-1"
                  onClick={() => {
                    setLogin(true);
                    setLoginClicked("#43766C");
                    setRegisterClicked("#092635");
                  }}
                >
                  <h1 className="text login" style={{ color: loginClicked }}>
                    Login
                  </h1>
                </div>

                {login ? (
                  <div className="hr w-full rounded-full mt-2"></div>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <div
                  className="signup px-6 text-3xl font-semibold text-slate-800 py-1"
                  onClick={() => {
                    setLogin(false);
                    setLoginClicked("#092635");
                    setRegisterClicked("#43766C");
                  }}
                >
                  <h1 className="text" style={{ color: registerClicked }}>
                    Sign Up
                  </h1>
                </div>
                {!login ? (
                  <div className="hr w-full rounded-full mt-2"></div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div>
            {login ? (
              <Login setParentProp={setParentProp} />
            ) : (
              <Register setParentProp={setParentProp} />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
