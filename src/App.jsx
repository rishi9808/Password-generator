import { useCallback, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);

  //notification
  const notify = () => toast("password copied successfully");

  //useref hook
  const passwordRef = useRef(null);

  const generateRandomPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const createCopy = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    notify();
  };

  useEffect(() => {
    generateRandomPassword();
  }, [length, numberAllowed, charAllowed]);
  return (
    <>
      <div className="bg-gray-700 w-full h-100vh px-8 py-4 m-6 rounded-lg text-center ">
        <h1 className="text-green-500">Password Generator</h1>
        <div className="bg-gray-900 m-3 px-5 py-5">
          <div className="flex justify-center mb-3">
            <input
              type="text"
              value={password}
              placeholder="password"
              className="bg-white rounded-sm text-red-600 font-semibold font-mono px-2 py-3"
              ref={passwordRef}
              readOnly
            />
            <button className="bg-blue-300 " onClick={createCopy}>
              copy
            </button>
            <ToastContainer
              position="top-center"
              autoClose={4003}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition:Bounce
            />
          </div>
          <div className="flex justify-center">
            <label htmlFor="" className="text-white font-semibold">
              Length : {length}
            </label>
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />

            <label htmlFor="" className="text-white mx-2 font-semibold">
              Number
            </label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="" className="text-white mx-2 font-semibold">
              Special character
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
