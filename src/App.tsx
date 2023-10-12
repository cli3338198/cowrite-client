import { useEffect, useContext, useState } from "react";
import { socketConnectionContext } from "./context/SocketConnectionManager";
import { EEventStrings } from "./types/enums";

function App() {
  const { socket } = useContext(socketConnectionContext);
  const [textareaValue, setTextareaValue] = useState("");

  // connect to server
  useEffect(() => {
    socket.emit(EEventStrings.clientConnects);

    return () => {
      socket.emit(EEventStrings.clientDisconnects);
    };
  }, [socket]);

  // // receive the test string
  // useEffect(() => {
  //   socket.on("TEST", (msg: string) => {
  //     setTextareaValue(msg);
  //   });
  // }, [socket, setTextareaValue]);

  return (
    <div>
      <textarea value={textareaValue} />
    </div>
  );
}

export default App;
