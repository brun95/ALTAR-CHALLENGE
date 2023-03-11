import React from "react";

interface Props {
  code: string;
}

function Display({ code }: Props) {
  return (
    <div className="display-container">
      <p className="display-label">YOUR CODE: <b>{code}</b></p>
    </div>
  );
}

export default Display;