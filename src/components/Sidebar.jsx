import "../css/Sidebar.css";
import mypic from "../assets/profile_pic.png";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
function Sidebar({
  setParentProp,
  setLoading,
  setParentQuestion,
  setParentAnswer,
}) {
  const [userName, setUserName] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [data, setData] = useState([]);
  const newChatClick = () => {
    setNewChat(true);
  };

  const showLogout = () => {
    setTimeout(() => {
      document.querySelector(".logout-div").style.visibility = "visible";
    }, 0);
    setTimeout(() => {
      document.querySelector(".logout-div").style.visibility = "hidden";
    }, 5000);
  };

  const logout = () => {
    Cookies.remove("id");
    setParentProp(false);
  };

  useEffect(() => {
    function getChats() {
      const id = Cookies.get("id");
      fetch(
        `https://code-whisperer-chatgpt-clone.onrender.com/api/messages/profile/${id}`
      )
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((err) => console.log(err));
    }
    function getUserProfile() {
      const id = Cookies.get("id");
      fetch(
        `https://code-whisperer-chatgpt-clone.onrender.com/api/profile/${id}`
      )
        .then((response) => response.json())
        .then((response) => setUserName(response.name))
        .catch((err) => console.log(err));
    }
    getUserProfile();
    getChats();
  }, []);
  return (
    <>
      <div
        className="main-edit-div flex text-cyan-300 my-6 py-3 px-4 gap-2 place-content-center mx-5 rounded-lg"
        onClick={newChatClick}
      >
        <div className="new-chat-logo h-8 w-8 rounded-full" />
        <div className="text-lg">New chat</div>
        <div className="new-chat-edit h-6 w-6 ml-24" />
      </div>
      <div className="mes-name-div text-cyan-300 text-xl px-8 py-4">
        {data.map((value,index) => {
          return (
            <div key={index}
              className="p-2 each-mes-div rounded-xl"
              onClick={() => {
                Cookies.set("message_id", value._id, { expires: 15 });
                setParentQuestion(value.question);
                setParentAnswer(value.answer);
                setLoading(false);
              }}
            >
              {value.question.length < 25
                ? value.question
                : value.question.slice(0, 23) + "..."}
            </div>
          );
        })}
      </div>
      <div
        className="logout-div text-cyan-300 text-xl gap-4 font-semibold mb-20"
        onClick={logout}
      >
        <center>
          <div className="bg-slate-900 px-4 py-1">Logout</div>
        </center>
      </div>
      <div
        className="profile-div flex text-cyan-300 text-xl gap-4 font-semibold place-items-center mb-5 px-4 py-2 rounded-lg"
        onClick={showLogout}
      >
        <div className="h-10 w-10 rounded-full bg-white">
          <img className="h-10 w-10 rounded-full" src={mypic} />
        </div>
        <div>{userName}</div>
      </div>
    </>
  );
}

export default Sidebar;
