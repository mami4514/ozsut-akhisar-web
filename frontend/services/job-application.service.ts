import { api } from "./api";

export interface JobApplicationPosition {
  id: number;
  name: string;
}

export interface JobApplicationLocation {
  city: string | null;
  district: string | null;
}

export interface JobApplicationCv {
  path: string | null;
  url: string | null;
}

export interface JobApplicationDetail {
  id: number;

  first_name: string;
  last_name: string;
  full_name: string;

  position: JobApplicationPosition | null;

  phone: string;
  email: string;
  gender: string | null;
  birth_date: string | null;

  location: JobApplicationLocation;

  experience: string | null;
  education_level: string | null;
  employment_type: string | null;
  military_status: string | null;
  driver_license: string | null;

  smoker: boolean | null;
  shift_available: boolean | null;

  about: string | null;

  cv: JobApplicationCv;

  kvkk_approved: boolean;

  status: string;
  admin_note: string | null;

  ip_address: string | null;
  applied_at: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateJobApplicationStatusPayload {
  status: string;
  admin_note: string | null;
}


interface JobApplicationDetailResponse {
  success: boolean;
  data: JobApplicationDetail;
}

interface UpdateJobApplicationStatusResponse {
  success: boolean;
  message: string;
  data: JobApplicationDetail;
}

export async function getJobApplication(
  id: number
): Promise<JobApplicationDetail> {
  const token = localStorage.getItem("access_token");

  const response = await api.get<JobApplicationDetailResponse>(
    `/job-applications/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}
export async function updateJobApplicationStatus(
  id: number,
  payload: UpdateJobApplicationStatusPayload
): Promise<JobApplicationDetail> {
  const token = localStorage.getItem("access_token");

  const response = await api.patch<UpdateJobApplicationStatusResponse>(
    `/job-applications/${id}/status`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}