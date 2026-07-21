"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    }

    return () => {
      isCancelled = true;
    };
  }, [id]);

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
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        {application.full_name}
      </h1>

      <p>{application.position?.name}</p>

      <p>{application.email}</p>
    </div>
  );
}