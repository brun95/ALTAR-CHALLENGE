interface Grid {
    data: string[][];
  }
  
  export function generateGrid(biasChar: string): Grid {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const biasRatio = 0.2;
    const grid: string[][] = [];
  
    for (let i = 0; i < 10; i++) {
      const row: string[] = [];
      for (let j = 0; j < 10; j++) {
        if (biasChar && Math.random() < biasRatio) {
          row.push(biasChar);
        } else {
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          row.push(alphabet[randomIndex]);
        }
      }
      grid.push(row);
    }
    return { data: grid };
  }
  
  export function countCharacters(grid: string[][], firstChar: string, secondChar: string): [number, number] {
    const counts: { [key: string]: number } = {};
  
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
  
        if (cell === firstChar) {
          counts[firstChar] = (counts[firstChar] || 0) + 1;
        } else if (cell === secondChar) {
          counts[secondChar] = (counts[secondChar] || 0) + 1;
        }
      }
    }
  
    return [counts[firstChar], counts[secondChar]];
  }
  
  export function generateCode(grid: string[][]) {
    // Get the current system time
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Get the characters from the grid
    const firstChar   = grid[Number(seconds[0])][Number(seconds[1])];
    const secondChar  = grid[Number(seconds[1])][Number(seconds[0])];
  
    // Count the occurrences of the characters
    let [countFirstChar, countSecondChar] = countCharacters(grid, firstChar, secondChar);
  
    // Exception for counts larger than 9
    if (countFirstChar > 9) {
      const divisor = Math.ceil(countFirstChar / 9);
      countFirstChar = Math.floor(countFirstChar / divisor);
    }
    if (countSecondChar > 9) {
      const divisor = Math.ceil(countSecondChar / 9);
      countSecondChar = Math.floor(countSecondChar / divisor);
    }
  
    // Concatenate the counts as the code
    const code = countFirstChar.toString() + countSecondChar.toString();
  
    return code;
  }