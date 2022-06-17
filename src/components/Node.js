import React from "react";
import "./Node.css";
const Node = ({ isStart, isEnd, isWall, col, row }) => {
  let classes;
  if (isStart) classes = "node-start";
  else if (isEnd) classes = "node-end";
  else if (isWall) classes = "node-wall";
  else classes = "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
