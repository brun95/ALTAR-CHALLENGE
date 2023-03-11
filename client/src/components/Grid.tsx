import React from "react";

interface Props {
  data: string[][];
}

function Grid({ data }: Props) {
  return (
    <div className="grid-container">
      {data.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          
          (rowIndex < 10 && colIndex < 10) &&
          <div className="grid-cell" key={`${rowIndex}-${colIndex}`}>
            {cell}
          </div>
        ))
      )}
    </div>
  );
}

export default Grid;