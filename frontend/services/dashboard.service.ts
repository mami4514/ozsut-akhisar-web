import { api } from "./api";
export interface DashboardResponse {
  statistics: {
    totalApplications: number;
    newApplications: number;
    activePositions: number;
    totalUsers: number;
  };

  latestApplications: {
    id: number;
    full_name: string;
    position: string | null;
    status: string;
    applied_at: string;
  }[];
}

export async function getDashboard() {
  const token = localStorage.getItem("access_token");

  const response = await api.get<DashboardResponse>(
    "/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}