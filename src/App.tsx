import { useEffect, useContext, useState, ChangeEvent, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { socketConnectionContext } from "./context/SocketConnectionManager";

function App() {
  const { socket } = useContext(socketConnectionContext);
  const [textareaValue, setTextareaValue] = useState("");
  const [value, setValue] = useState("");

  // quill stuff
  const { quill, quillRef } = useQuill();

  const [isReceiving, setIsReceiving] = useState(false);
  const userChanged = useRef(false);

  // emit
  useEffect(() => {
    if (quill && !isReceiving && !userChanged.current) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        if (source === "user") {
          userChanged.current = true;
          // Send the delta/quill contents
          socket.emit("textChange", JSON.stringify(quill.getContents()));
        }
      });
    }
  }, [quill, socket, isReceiving]);

  // update quill using socket
  useEffect(() => {
    if (quill) {
      socket.on("textChange", (delta: string) => {
        setIsReceiving(true);
        // clear
        quill.setText("");
        // replace with new delta
        quill.updateContents(JSON.parse(delta));
        setIsReceiving(false);
        // Reset the userChanged flag after processing the server change
        userChanged.current = false;
      });
    }
  }, [quill, socket]);

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
        style={{ width: "500px", height: "300px", border: "3px dotted red" }}
      />
      <input value={value} onChange={handleChange} />
      {/* quill here */}

      <div
        style={{
          width: "500px",
          height: "500px",
          border: "2px double green",
        }}
      >
        <div ref={quillRef}></div>
      </div>
    </div>
  );
}

export default App;
