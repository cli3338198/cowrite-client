import { CSSProperties, MouseEvent, useState } from "react";
import { User } from "../types/interfaces";

function makeDivStyle() {
  return {
    width: "30px",
    height: "30px",
    margin: "5px",
    padding: "5px",
    borderRadius: "50%",
    border: "2px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    // position: "relative",
  } as CSSProperties;
}

function makeHoverTipStyle(left: number, top: number) {
  return {
    position: "absolute",
    backgroundColor: "#333",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
    zIndex: "1",
    left: `${left + 10}px`,
    top: `${top + 20}px`,
  } as CSSProperties;
}

export default function UserAvatar({
  user: { id, name, avatar },
}: {
  user: User;
}) {
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter(evt: MouseEvent<HTMLDivElement>) {
    setClientX(evt.clientX);
    setClientY(evt.clientY);
    setIsHovered(true);
  }

  function handleMouseLeave(evt: MouseEvent<HTMLDivElement>) {
    setClientX(0);
    setClientY(0);
    setIsHovered(false);
  }

  return (
    <>
      <div
        key={id}
        style={makeDivStyle()}
        onMouseMove={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {avatar}

        {isHovered && (
          <div style={makeHoverTipStyle(clientX, clientY)}>{name}</div>
        )}
      </div>
    </>
  );
}
