import { useState } from "react";
import Cookies from "js-cookie";
function Register({ setParentProp }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInUser = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch("https://code-whisperer-chatgpt-clone.onrender.com/api/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        Cookies.set("id", response._id, { expires: 15 });
        setParentProp(true);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <>
      <form className="grid  place-items-center gap-6 mt-24">
        <input
          type="text"
          className="py-2 rounded-xl text-xl px-4"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="username"
          style={{ backgroundColor: "#F2F1EB" }}
        />
        <input
          type="email"
          className="py-2 rounded-xl text-xl px-4"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          style={{ backgroundColor: "#F2F1EB" }}
        />
        <input
          type="password"
          className="py-2 rounded-xl text-xl px-4"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ backgroundColor: "#F2F1EB" }}
        />
        <span className="h-6" />
        <button
          className="py-1  rounded-xl font-bold text-2xl text-cyan-400 "
          onClick={signInUser}
          style={{ backgroundColor: "#2D3250" }}
        >
          {loading ? (
            <center>
              <div className="progress-bar">
                <progress
                  value="75"
                  min="0"
                  max="100"
                  style={{ visibility: "hidden", height: 0, width: 0 }}
                />
              </div>
            </center>
          ) : (
            <h1>Sign Up</h1>
          )}
        </button>
      </form>
    </>
  );
}

export default Register;
