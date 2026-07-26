import { api } from "./api";

export interface Position {
  id: number;
  name: string;
}

interface PositionListResponse {
  success: boolean;
  data: Position[];
}

export async function getPositions(): Promise<Position[]> {
  const response = await api.get<PositionListResponse>("/positions");

  return response.data.data;
}