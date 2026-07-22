"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ApplicationStatusCard from "@/components/career/ApplicationStatusCard";
import ApplicationAbout from "@/components/career/ApplicationAbout";
import ApplicationExperience from "@/components/career/ApplicationExperience";
import ApplicationHeader from "@/components/career/ApplicationHeader";
import ApplicationInfoCard from "@/components/career/ApplicationInfoCard";
import ApplicationPersonalInfo from "@/components/career/ApplicationPersonalInfo";

import {
  getJobApplication,
  type JobApplicationDetail,
} from "@/services/job-application.service";

export default function CareerDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [application, setApplication] =
    useState<JobApplicationDetail | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadApplication() {
      setLoading(true);

      try {
        const data = await getJobApplication(id);

        if (!isCancelled) {
          setApplication(data);
          setError(null);
        }
      } catch {
        if (!isCancelled) {
          setError("Başvuru bilgileri alınamadı.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    if (!Number.isNaN(id)) {
      void loadApplication();
    } else {
      setError("Geçersiz başvuru numarası.");
      setLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [id]);

  function handleApplicationUpdated(
    updatedApplication: JobApplicationDetail
  ) {
    setApplication(updatedApplication);
  }

  if (loading) {
    return (
      <div className="py-12 text-center">
        Başvuru yükleniyor...
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="py-12 text-center text-destructive">
        {error ?? "Başvuru bulunamadı."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApplicationHeader
        fullName={application.full_name}
        position={application.position?.name ?? null}
        status={application.status}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationPersonalInfo
          phone={application.phone}
          email={application.email}
          gender={application.gender}
          birthDate={application.birth_date}
          city={application.location?.city ?? null}
          district={application.location?.district ?? null}
        />

        <ApplicationInfoCard
          status={application.status}
          appliedAt={application.applied_at}
          cvUrl={application.cv?.url ?? null}
          kvkkApproved={application.kvkk_approved}
        />
      </div>

      <ApplicationExperience
        experience={application.experience}
        educationLevel={application.education_level}
        employmentType={application.employment_type}
        militaryStatus={application.military_status}
        driverLicense={application.driver_license}
        smoker={application.smoker}
        shiftAvailable={application.shift_available}
      />

      <ApplicationAbout about={application.about} />

      <ApplicationStatusCard
        applicationId={application.id}
        initialStatus={application.status}
        initialAdminNote={application.admin_note}
        onUpdated={handleApplicationUpdated}
      />
    </div>
  );
}