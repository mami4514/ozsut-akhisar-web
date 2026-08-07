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

  experience: number | null;
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

export interface JobApplicationListItem {
  id: number;
  full_name: string;
  position: JobApplicationPosition | null;
  phone: string;
  email: string;
  status: string;
  applied_at: string;
}

export interface JobApplicationPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface JobApplicationListResult {
  applications: JobApplicationListItem[];
  meta: JobApplicationPaginationMeta;
}

export interface GetJobApplicationsParams {
  page?: number;
  search?: string;
  status?: string;
  positionId?: string;
}

export interface CreateJobApplicationPayload {
  position_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender?: "male" | "female";
  birth_date?: string;
  city: string;
  district?: string;
  experience: number;

  education_level:
    | "primary_school"
    | "middle_school"
    | "high_school"
    | "associate_degree"
    | "bachelor_degree"
    | "master_degree"
    | "doctorate";

  employment_type: "full_time" | "part_time";

  military_status?:
    | "completed"
    | "deferred"
    | "exempt"
    | "not_completed";

  driver_license?: string;
  smoker?: boolean;
  shift_available: boolean;
  about?: string;
  cv: File;
  kvkk_approved: boolean;
  turnstile_token: string;
}

export interface CreatedJobApplication {
  id: number;
  full_name: string;
  position: JobApplicationPosition;
  phone: string;
  email: string;
  status: string;
  applied_at: string;
}

export interface UpdateJobApplicationStatusPayload {
  status: string;
  admin_note: string | null;
}

interface JobApplicationDetailResponse {
  success: boolean;
  data: JobApplicationDetail;
}

interface JobApplicationListResponse {
  success: boolean;
  data: JobApplicationListItem[];
  meta: JobApplicationPaginationMeta;
}

interface CreateJobApplicationResponse {
  success: boolean;
  message: string;
  data: CreatedJobApplication;
}

interface UpdateJobApplicationStatusResponse {
  success: boolean;
  message: string;
  data: JobApplicationDetail;
}

interface JobApplicationActionResponse {
  success: boolean;
  message: string;
}

interface RestoreJobApplicationResponse {
  success: boolean;
  message: string;
  data: JobApplicationDetail;
}

function appendOptionalField(
  formData: FormData,
  key: string,
  value?: string
) {
  const normalizedValue = value?.trim();

  if (normalizedValue) {
    formData.append(key, normalizedValue);
  }
}

function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}

function getAuthHeaders() {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function createJobApplication(
  payload: CreateJobApplicationPayload
): Promise<CreatedJobApplication> {
  const formData = new FormData();

  formData.append("position_id", String(payload.position_id));
  formData.append("first_name", payload.first_name.trim());
  formData.append("last_name", payload.last_name.trim());
  formData.append("phone", payload.phone.trim());
  formData.append("email", payload.email.trim());
  formData.append("city", payload.city.trim());
  formData.append("experience", String(payload.experience));
  formData.append("education_level", payload.education_level);
  formData.append("employment_type", payload.employment_type);

  formData.append(
    "shift_available",
    payload.shift_available ? "1" : "0"
  );

  formData.append(
    "kvkk_approved",
    payload.kvkk_approved ? "1" : "0"
  );
  
  formData.append(
   "turnstile_token",
   payload.turnstile_token
 );
  formData.append("cv", payload.cv);

  appendOptionalField(formData, "gender", payload.gender);
  appendOptionalField(formData, "birth_date", payload.birth_date);
  appendOptionalField(formData, "district", payload.district);

  appendOptionalField(
    formData,
    "military_status",
    payload.military_status
  );

  appendOptionalField(
    formData,
    "driver_license",
    payload.driver_license
  );

  appendOptionalField(formData, "about", payload.about);

  if (payload.smoker !== undefined) {
    formData.append("smoker", payload.smoker ? "1" : "0");
  }

  const response = await api.post<CreateJobApplicationResponse>(
    "/job-applications",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
}

export async function getJobApplications(
  params: GetJobApplicationsParams = {}
): Promise<JobApplicationListResult> {
  const response = await api.get<JobApplicationListResponse>(
    "/job-applications",
    {
      params: {
        page: params.page ?? 1,
        search: params.search?.trim() || undefined,
        status: params.status || undefined,
        position_id: params.positionId || undefined,
      },
      headers: getAuthHeaders(),
    }
  );

  return {
    applications: response.data.data,
    meta: response.data.meta,
  };
}

export async function getArchivedJobApplications(
  params: GetJobApplicationsParams = {}
): Promise<JobApplicationListResult> {
  const response = await api.get<JobApplicationListResponse>(
    "/job-applications/archive",
    {
      params: {
        page: params.page ?? 1,
        search: params.search?.trim() || undefined,
        status: params.status || undefined,
        position_id: params.positionId || undefined,
      },
      headers: getAuthHeaders(),
    }
  );

  return {
    applications: response.data.data,
    meta: response.data.meta,
  };
}

export async function getJobApplication(
  id: number
): Promise<JobApplicationDetail> {
  const response = await api.get<JobApplicationDetailResponse>(
    `/job-applications/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.data;
}

export async function updateJobApplicationStatus(
  id: number,
  payload: UpdateJobApplicationStatusPayload
): Promise<JobApplicationDetail> {
  const response =
    await api.patch<UpdateJobApplicationStatusResponse>(
      `/job-applications/${id}/status`,
      payload,
      {
        headers: getAuthHeaders(),
      }
    );

  return response.data.data;
}

export async function archiveJobApplication(
  id: number
): Promise<string> {
  const response = await api.patch<JobApplicationActionResponse>(
    `/job-applications/${id}/archive`,
    undefined,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.message;
}

export async function restoreJobApplication(
  id: number
): Promise<JobApplicationDetail> {
  const response = await api.patch<RestoreJobApplicationResponse>(
    `/job-applications/${id}/restore`,
    undefined,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.data;
}

export async function forceDeleteJobApplication(
  id: number
): Promise<string> {
  const response = await api.delete<JobApplicationActionResponse>(
    `/job-applications/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.message;
}