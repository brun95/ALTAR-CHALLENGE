import React from "react";

interface Props {
  onClick: () => void;
}

function Generator({ onClick }: Props) {
  return <button className="generator-button" onClick={onClick}>Generate 2D Grid</button>;
}

export default Generator;