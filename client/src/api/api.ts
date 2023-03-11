import axios from "axios";

interface GridData {
  grid: string[][];
  code: string;
}

const API_GET_CHARACTERS_AND_CODE = "http://localhost:3002/api/charactersAndCode";

export async function fetchGridData(bias: string): Promise<GridData> {
  try {
    const response = await axios.get(API_GET_CHARACTERS_AND_CODE, {
      params: { bias: bias },
    });
    
    return response.data as GridData;
  } catch (error) {
    console.error("Error fetching grid data", error);
    return { grid: [], code: "" };
  }
}