import { useEffect, useContext, useState, ChangeEvent } from "react";
import { socketConnectionContext } from "./context/SocketConnectionManager";

function App() {
  const { socket } = useContext(socketConnectionContext);
  const [textareaValue, setTextareaValue] = useState("");
  const [value, setValue] = useState("");

  // connect to server
  useEffect(() => {
    // socket.emit("connect"); "connect" is reserved
    socket.connect();

    return () => {
      // socket.emit("disconnect"); "disconnect" is reserved
      socket.disconnect();
    };
  }, [socket]);

  // receive the test string
  useEffect(() => {
    socket.on("TEST", (msg: string) => {
      setTextareaValue((t) => t + "\n" + msg);
    });
  }, [socket]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    // socket.emit("TEST", e.target.value);
    // slows down messsages to server
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      socket.emit("TEST", e.target.value);
    }, 3000);
  }

  return (
    <div>
      <textarea
        value={textareaValue}
        style={{ width: "500px", height: "700px" }}
      />
      <input value={value} onChange={handleChange} />
    </div>
  );
}

export default App;
