import { useEffect, useContext, useState, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { socketConnectionContext } from "../context/SocketConnectionManager";

export default function TextEditor() {
  const { socket } = useContext(socketConnectionContext);
  const { quill, quillRef } = useQuill();
  const [isReceiving, setIsReceiving] = useState(false);
  const userChanged = useRef(false);

  useEffect(() => {
    if (quill && !isReceiving && !userChanged.current) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        // TODO: fix typing
        if (source === "user") {
          userChanged.current = true;
          socket.emit("textChange", JSON.stringify(quill.getContents()));
        }
      });
    }
  }, [quill, socket, isReceiving]);

  useEffect(() => {
    if (quill) {
      socket.on("textChange", (delta: string) => {
        setIsReceiving(true);
        quill.setText("");
        quill.updateContents(JSON.parse(delta));
        setIsReceiving(false);
        userChanged.current = false;
      });
    }
  }, [quill, socket]);

  return (
    <>
      {/* If no user selected, don't show a document or deactivate/grey out the document */}
      <div
        style={{
          width: "500px",
          height: "500px",
          border: "2px double green",
          // TODO: fix this
        }}
      >
        <div ref={quillRef}></div>
      </div>
    </>
  );
}
