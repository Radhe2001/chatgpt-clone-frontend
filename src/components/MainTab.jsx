import { useEffect, useState } from "react";
import "../css/MainTab.css";
import Chat from "./Chat.jsx";
import Cookies from "js-cookie";
import mypic from "../assets/profile_pic.png";
import logo from "../assets/chatgpt_logo.png";

function MainTab({
  loading,
  setLoading,
  setParentQuestion,
  setParentAnswer,
  question,
  answer,
}) {
  const [input, setInput] = useState("");
  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    const id = Cookies.get("id");
    fetch(
      `https://code-whisperer-chatgpt-clone.onrender.com/api/request/chat/${id}`,
      {
        method: "post",
        body: JSON.stringify({ input }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setInput("");
        Cookies.set("message_id", response._id, { expires: 15 });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const check = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      submit(event);
    }
  };

  useEffect(() => {
    function fetchChatData() {
      const id = Cookies.get("message_id");
      fetch(
        `https://code-whisperer-chatgpt-clone.onrender.com/api/messages/${id}`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setParentQuestion(response.question);
          setParentAnswer(response.answer);
        })
        .catch((err) => console.log(err));
    }
    fetchChatData();
  }, [setLoading, loading]);

  return (
    <>
      <div className="main h-screen">
        <div className="text-2xl font-bold text-cyan-200 p-6">
          ChatGPT-clone <span className="text-cyan-500">1.0</span>
        </div>
        {loading ? (
          <div className="chat-tab">
            <Chat />
          </div>
        ) : (
          <div className="message-tab">
            <div className="flex place-items-center text-cyan-300 text-2xl font-semibold gap-4 py-4">
              <div className="h-10 w-10 rounded-full bg-white">
                <img className="h-10 w-10 rounded-full" src={mypic} />
              </div>
              <div className="">{question}</div>
            </div>
            <div className="hr">
              <hr />
            </div>
            <div className="h-10 w-10 rounded-full bg-white">
              <img className="h-10 w-10 rounded-full" src={logo} />
            </div>
            <div className="flex place-items-center text-cyan-200 text-2xl font-normal gap-4 py-6">
              <div className="text-field">{answer}</div>
            </div>
            <div className="hr">
              <hr />
            </div>
          </div>
        )}
        <div className="main-form-div pb-8">
          <form
            className="form-div flex border-2 border-white rounded-2xl "
            onKeyUp={check}
          >
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field text-2xl text-cyan-300 py-6 px-6"
              placeholder="Message ChatGPT..."
            />
            <button
              className="submit-button h-12 w-12 rounded-lg bg-cyan-500 mt-4 ml-2"
              onClick={submit}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default MainTab;
