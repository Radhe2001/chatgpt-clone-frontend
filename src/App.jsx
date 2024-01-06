import { useState, useEffect } from "react";
import "./App.css";
import MainTab from "./components/MainTab.jsx";
import Sidebar from "./components/Sidebar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Cookies from "js-cookie";

function App() {
  const [id, setId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function setParentProp(value) {
    setIsLoggedIn(value);
  }
  function setParentQuestion(value) {
    setQuestion(value);
  }
  function setParentAnswer(value) {
    setAnswer(value);
  }
  useEffect(() => {
    function getCookie() {
      const cookieValue = Cookies.get("id");
      setId(cookieValue || "");
    }
    getCookie();
    function checkLoggedIn() {
      if (id) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, [isLoggedIn, id]);
  return (
    <>
      {isLoggedIn ? (
        <div className="w-screen flex">
          <div className="side-bar h-screen bg-black">
            <Sidebar
              setParentProp={setParentProp}
              loading={loading}
              setLoading={setLoading}
              setParentQuestion={setParentQuestion}
              setParentAnswer={setParentAnswer}
            />
          </div>
          <div className="chat w-full">
            <MainTab
              loading={loading}
              setLoading={setLoading}
              setParentQuestion={setParentQuestion}
              setParentAnswer={setParentAnswer}
              question={question}
              answer={answer}
            />
          </div>
        </div>
      ) : (
        <LandingPage setParentProp={setParentProp} />
      )}
    </>
  );
}

export default App;
