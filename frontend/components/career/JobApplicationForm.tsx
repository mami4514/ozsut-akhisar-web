"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import ApplicationDetailsStep, {
  type EducationLevel,
  type EmploymentType,
  type Gender,
  type MilitaryStatus,
} from "@/components/career/ApplicationDetailsStep";
import JobApplicationStepIndicator from "@/components/career/JobApplicationStepIndicator";
import PersonalInformationStep from "@/components/career/PersonalInformationStep";

import {
  createJobApplication,
  type CreatedJobApplication,
} from "@/services/job-application.service";
import {
  getPositions,
  type Position,
} from "@/services/position.service";

type FormStep = 1 | 2;

interface ValidationErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export default function JobApplicationForm() {
  const [step, setStep] = useState<FormStep>(1);

  /*
   * Birinci adım
   */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [positionId, setPositionId] = useState<number | "">("");

  /*
   * Pozisyonlar
   */
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] =
    useState(true);
  const [positionError, setPositionError] =
    useState<string | null>(null);

  /*
   * İkinci adım
   */
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [birthDate, setBirthDate] = useState("");
  const [experience, setExperience] = useState<number | "">("");
  const [educationLevel, setEducationLevel] =
    useState<EducationLevel>("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("");
  const [militaryStatus, setMilitaryStatus] =
    useState<MilitaryStatus>("");
  const [driverLicense, setDriverLicense] = useState("");
  const [smoker, setSmoker] = useState<boolean | null>(null);
  const [shiftAvailable, setShiftAvailable] =
    useState<boolean | null>(null);
  const [about, setAbout] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [kvkkApproved, setKvkkApproved] = useState(false);

  /*
   * Form durumları
   */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>(
    []
  );
  const [createdApplication, setCreatedApplication] =
    useState<CreatedJobApplication | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadPositions() {
      try {
        setIsLoadingPositions(true);

        const data = await getPositions();

        if (!isCancelled) {
          setPositions(data);
          setPositionError(null);
        }
      } catch (error) {
        console.error("Pozisyonlar alınamadı:", error);

        if (!isCancelled) {
          setPositionError(
            "Pozisyonlar yüklenirken bir hata oluştu."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingPositions(false);
        }
      }
    }

    void loadPositions();

    return () => {
      isCancelled = true;
    };
  }, []);

  function clearMessages() {
    setFormError(null);
    setValidationErrors([]);
  }

  function handleNextStep() {
    clearMessages();

    if (
      firstName.trim().length < 2 ||
      lastName.trim().length < 2 ||
      phone.trim() === "" ||
      email.trim() === "" ||
      positionId === ""
    ) {
      setFormError(
        "Devam etmek için ad, soyad, telefon, e-posta ve pozisyon alanlarını eksiksiz doldurun."
      );

      return;
    }

    setStep(2);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handlePreviousStep() {
    clearMessages();
    setStep(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function validateSecondStep(): boolean {
    if (city.trim() === "") {
      setFormError("Şehir alanını doldurmalısınız.");
      return false;
    }

    if (experience === "") {
      setFormError("Deneyim süresini seçmelisiniz.");
      return false;
    }

    if (educationLevel === "") {
      setFormError("Eğitim durumunu seçmelisiniz.");
      return false;
    }

    if (employmentType === "") {
      setFormError("Çalışma şeklini seçmelisiniz.");
      return false;
    }

    if (shiftAvailable === null) {
      setFormError(
        "Vardiyalı çalışma durumunu belirtmelisiniz."
      );
      return false;
    }

    if (!cv) {
      setFormError("CV dosyası yüklemelisiniz.");
      return false;
    }

    if (cv.size > 5 * 1024 * 1024) {
      setFormError("CV dosyası en fazla 5 MB olabilir.");
      return false;
    }

    const allowedCvTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedCvTypes.includes(cv.type)) {
      setFormError(
        "CV yalnızca PDF, DOC veya DOCX formatında olabilir."
      );
      return false;
    }

    if (!kvkkApproved) {
      setFormError("KVKK onayını kabul etmelisiniz.");
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    clearMessages();

    if (
      positionId === "" ||
      experience === "" ||
      educationLevel === "" ||
      employmentType === "" ||
      shiftAvailable === null ||
      !cv
    ) {
      setFormError(
        "Lütfen zorunlu alanları eksiksiz doldurun."
      );
      return;
    }

    if (!validateSecondStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const application = await createJobApplication({
        position_id: positionId,
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        city,
        experience,
        education_level: educationLevel,
        employment_type: employmentType,
        shift_available: shiftAvailable,
        cv,
        kvkk_approved: kvkkApproved,

        ...(district.trim() !== "" && {
          district,
        }),

        ...(gender !== "" && {
          gender,
        }),

        ...(birthDate !== "" && {
          birth_date: birthDate,
        }),

        ...(militaryStatus !== "" && {
          military_status: militaryStatus,
        }),

        ...(driverLicense.trim() !== "" && {
          driver_license: driverLicense,
        }),

        ...(smoker !== null && {
          smoker,
        }),

        ...(about.trim() !== "" && {
          about,
        }),
      });

      setCreatedApplication(application);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Başvuru gönderilemedi:", error);

      if (axios.isAxiosError<ValidationErrorResponse>(error)) {
        const responseErrors = error.response?.data?.errors;

        if (responseErrors) {
          const messages = Object.values(responseErrors).flat();

          setValidationErrors(messages);
          setFormError(
            "Formdaki bazı alanları kontrol etmelisiniz."
          );

          return;
        }

        setFormError(
          error.response?.data?.message ??
            "Başvuru gönderilirken bir hata oluştu."
        );

        return;
      }

      setFormError(
        "Başvuru gönderilirken beklenmeyen bir hata oluştu."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (createdApplication) {
    return (
      <section className="rounded-xl border bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
          ✓
        </div>

        <h2 className="mt-6 text-2xl font-bold">
          Başvurunuz Alındı
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Sayın {createdApplication.full_name}, başvurunuz başarıyla
          alınmıştır. Yönetim ekibimiz başvurunuzu değerlendirdikten
          sonra sizinle iletişime geçecektir.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-lg border bg-muted/20 p-5 text-left">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Başvuru numarası
            </span>

            <span className="text-sm font-semibold">
              #{createdApplication.id}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Pozisyon
            </span>

            <span className="text-right text-sm font-semibold">
              {createdApplication.position?.name ?? "Pozisyon bilgisi alınamadı"}
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Başvuru Bilgileri
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Lütfen aşağıdaki bilgileri eksiksiz doldurunuz.
        </p>
      </div>

      <JobApplicationStepIndicator currentStep={step} />

      {positionError && (
        <div
          role="alert"
          className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {positionError}
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p className="font-medium">{formError}</p>

          {validationErrors.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {validationErrors.map((message, index) => (
                <li key={`${message}-${index}`}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        {step === 1 && (
          <PersonalInformationStep
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            positionId={positionId}
            positions={positions}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
            onPositionChange={setPositionId}
          />
        )}

        {step === 2 && (
          <ApplicationDetailsStep
            city={city}
            district={district}
            gender={gender}
            birthDate={birthDate}
            experience={experience}
            educationLevel={educationLevel}
            employmentType={employmentType}
            militaryStatus={militaryStatus}
            driverLicense={driverLicense}
            smoker={smoker}
            shiftAvailable={shiftAvailable}
            about={about}
            cv={cv}
            kvkkApproved={kvkkApproved}
            onCityChange={setCity}
            onDistrictChange={setDistrict}
            onGenderChange={setGender}
            onBirthDateChange={setBirthDate}
            onExperienceChange={setExperience}
            onEducationLevelChange={setEducationLevel}
            onEmploymentTypeChange={setEmploymentType}
            onMilitaryStatusChange={setMilitaryStatus}
            onDriverLicenseChange={setDriverLicense}
            onSmokerChange={setSmoker}
            onShiftAvailableChange={setShiftAvailable}
            onAboutChange={setAbout}
            onCvChange={setCv}
            onKvkkApprovedChange={setKvkkApproved}
          />
        )}

        <div
          className={`flex flex-col gap-3 border-t pt-6 sm:flex-row ${
            step === 1
              ? "sm:justify-end"
              : "sm:justify-between"
          }`}
        >
          {step === 2 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-md border bg-white px-6 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              ← Geri
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isLoadingPositions}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingPositions
                ? "Pozisyonlar Yükleniyor..."
                : "Devam Et →"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Başvuru Gönderiliyor..."
                : "Başvuruyu Gönder"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}