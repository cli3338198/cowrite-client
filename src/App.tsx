import { useEffect, useContext, useState } from "react";
import { socketConnectionContext } from "./context/SocketConnectionManager";
import { EEventStrings } from "./types/enums";

function App() {
  const { socket } = useContext(socketConnectionContext);
  const [textareaValue, setTextareaValue] = useState("");

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
      // setTextareaValue(msg);

      alert(msg);
    });
  }, [socket]);

  return (
    <div>
      <textarea value={textareaValue} />
    </div>
  );
}

export default App;
