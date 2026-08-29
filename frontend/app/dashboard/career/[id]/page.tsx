"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Phone, UserRound } from "lucide-react";

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

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(id)) {
      return;
    }

    let isCancelled = false;

    async function loadApplication() {
      try {
        const data =
          await getJobApplication(id);

        if (!isCancelled) {
          setApplication(data);
          setError(null);
        }
      } catch {
        if (!isCancelled) {
          setError(
            "Başvuru bilgileri alınamadı."
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void loadApplication();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  function handleApplicationUpdated(
    updatedApplication: JobApplicationDetail
  ) {
    setApplication(
      updatedApplication
    );
  }

  if (Number.isNaN(id)) {
    return (
      <div className="py-12 text-center text-destructive">
        Geçersiz başvuru numarası.
      </div>
    );
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
        {error ??
          "Başvuru bulunamadı."}
      </div>
    );
  }

  const referenceName =
    application.reference?.name?.trim() ??
    "";

  const referencePhone =
    application.reference?.phone?.trim() ??
    "";

  const hasReference =
    referenceName !== "" ||
    referencePhone !== "";

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <ApplicationHeader
        fullName={
          application.full_name
        }
        position={
          application.position?.name ??
          null
        }
        status={
          application.status
        }
      />

      {/* =====================================================
          KİŞİSEL + BAŞVURU BİLGİLERİ
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationPersonalInfo
          phone={
            application.phone
          }
          email={
            application.email
          }
          gender={
            application.gender
          }
          birthDate={
            application.birth_date
          }
          city={
            application.location
              ?.city ?? null
          }
          district={
            application.location
              ?.district ?? null
          }
        />

        <ApplicationInfoCard
          status={
            application.status
          }
          appliedAt={
            application.applied_at
          }
          cvUrl={
            application.cv?.url ??
            null
          }
          kvkkApproved={
            application.kvkk_approved
          }
        />
      </div>

      {/* =====================================================
          DENEYİM / ÇALIŞMA BİLGİLERİ
      ===================================================== */}

      <ApplicationExperience
        experience={
          application.experience
        }
        educationLevel={
          application.education_level
        }
        employmentType={
          application.employment_type
        }
        militaryStatus={
          application.military_status
        }
        driverLicense={
          application.driver_license
        }
        smoker={
          application.smoker
        }
        shiftAvailable={
          application.shift_available
        }
      />

      {/* =====================================================
          REFERANS BİLGİLERİ
      ===================================================== */}

      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-5 w-5 text-muted-foreground" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Referans Bilgileri
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Adayın başvuru sırasında
                paylaştığı referans bilgileri.
              </p>
            </div>
          </div>
        </div>

        {hasReference ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* REFERANS AD SOYAD */}

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Ad Soyad
              </p>

              <p className="mt-2 font-medium">
                {referenceName ||
                  "Belirtilmemiş"}
              </p>
            </div>

            {/* REFERANS TELEFON */}

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Telefon
              </p>

              {referencePhone ? (
                <a
                  href={`tel:${referencePhone}`}
                  className="mt-2 flex w-fit items-center gap-2 font-medium transition hover:text-primary"
                >
                  <Phone className="h-4 w-4" />

                  {referencePhone}
                </a>
              ) : (
                <p className="mt-2 font-medium">
                  Belirtilmemiş
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/20 px-5 py-6 text-center">
            <UserRound className="mx-auto h-7 w-7 text-muted-foreground/60" />

            <p className="mt-3 text-sm font-medium">
              Referans bilgisi
              belirtilmemiş.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Bu alan başvuru sırasında
              isteğe bağlıdır.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          HAKKINDA
      ===================================================== */}

      <ApplicationAbout
        about={
          application.about
        }
      />

      {/* =====================================================
          DURUM / YÖNETİCİ NOTU
      ===================================================== */}

      <ApplicationStatusCard
        applicationId={
          application.id
        }
        initialStatus={
          application.status
        }
        initialAdminNote={
          application.admin_note
        }
        initialUpdatedAt={
          application.updated_at
        }
        onUpdated={
          handleApplicationUpdated
        }
      />
    </div>
  );
}