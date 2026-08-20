"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/* =========================================================
   VALIDATION HELPERS
========================================================= */

function isValidTurkishMobilePhone(phone: string) {
  return /^05\d{9}$/.test(phone);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAtLeast16YearsOld(birthDate: string) {
  if (!birthDate) {
    return false;
  }

  const birth = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(birth.getTime())) {
    return false;
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  const birthdayHasNotOccurredYet =
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birth.getDate());

  if (birthdayHasNotOccurredYet) {
    age--;
  }

  return age >= 16;
}

export default function JobApplicationForm() {
  /*
   * Step değiştiğinde formun başlangıcına
   * dönmek için kullanıyoruz.
   */
  const formTopRef =
    useRef<HTMLDivElement>(null);

  const [step, setStep] =
    useState<FormStep>(1);

  /* =========================================================
     1. ADIM
  ========================================================= */

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [positionId, setPositionId] =
    useState<number | "">("");

  const [positions, setPositions] =
    useState<Position[]>([]);

  const [
    isLoadingPositions,
    setIsLoadingPositions,
  ] = useState(true);

  const [
    positionError,
    setPositionError,
  ] = useState<string | null>(null);

  /* =========================================================
     2. ADIM
  ========================================================= */

  const [city, setCity] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [gender, setGender] =
    useState<Gender>("");

  const [birthDate, setBirthDate] =
    useState("");

  const [experience, setExperience] =
    useState<number | "">("");

  const [
    educationLevel,
    setEducationLevel,
  ] =
    useState<EducationLevel>("");

  const [
    employmentType,
    setEmploymentType,
  ] =
    useState<EmploymentType>("");

  const [
    militaryStatus,
    setMilitaryStatus,
  ] =
    useState<MilitaryStatus>("");

  const [
    driverLicense,
    setDriverLicense,
  ] = useState("");

  const [smoker, setSmoker] =
    useState<boolean | null>(null);

  const [
    shiftAvailable,
    setShiftAvailable,
  ] =
    useState<boolean | null>(null);

  const [about, setAbout] =
    useState("");

  const [cv, setCv] =
    useState<File | null>(null);

  const [
    kvkkApproved,
    setKvkkApproved,
  ] = useState(false);

  /* =========================================================
     TURNSTILE
  ========================================================= */

  const [
    turnstileToken,
    setTurnstileToken,
  ] = useState("");

  const [
    turnstileKey,
    setTurnstileKey,
  ] = useState(0);

  const [
    turnstileError,
    setTurnstileError,
  ] = useState<string | null>(null);

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    formError,
    setFormError,
  ] = useState<string | null>(null);

  const [
    rateLimitError,
    setRateLimitError,
  ] = useState<string | null>(null);

  const [
    recentApplicationError,
    setRecentApplicationError,
  ] = useState<string | null>(null);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState<string[]>([]);

  const [
    createdApplication,
    setCreatedApplication,
  ] =
    useState<CreatedJobApplication | null>(
      null
    );

  /* =========================================================
     POZİSYONLARI YÜKLE
  ========================================================= */

  useEffect(() => {
    let isCancelled = false;

    async function loadPositions() {
      try {
        setIsLoadingPositions(true);

        const data =
          await getPositions();

        if (!isCancelled) {
          setPositions(data);
          setPositionError(null);
        }
      } catch (error) {
        console.error(
          "Pozisyonlar alınamadı:",
          error
        );

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

  /* =========================================================
     STEP DEĞİŞİNCE FORMUN BAŞINA GİT
  ========================================================= */

  useEffect(() => {
    /*
     * İlk render sırasında sayfayı oynatmayalım.
     */
    if (step === 1) {
      return;
    }

    /*
     * React'in yeni step'i DOM'a basmasını bekliyoruz.
     */
    const frameId =
      requestAnimationFrame(() => {
        formTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [step]);

  /* =========================================================
     YARDIMCI FONKSİYONLAR
  ========================================================= */

  function clearMessages() {
    setFormError(null);
    setRateLimitError(null);
    setRecentApplicationError(null);
    setValidationErrors([]);
  }

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileError(null);

    setTurnstileKey(
      (currentKey) =>
        currentKey + 1
    );
  }

  function scrollToFormTop() {
    requestAnimationFrame(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  /* =========================================================
     1. ADIM VALIDATION
  ========================================================= */

  function handleNextStep() {
    clearMessages();

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    const normalizedPhone =
      phone.trim();

    const normalizedEmail =
      email.trim();

    if (
      normalizedFirstName.length < 2
    ) {
      setFormError(
        "Ad alanı en az 2 karakter olmalıdır."
      );

      return;
    }

    if (
      normalizedLastName.length < 2
    ) {
      setFormError(
        "Soyad alanı en az 2 karakter olmalıdır."
      );

      return;
    }

    if (
      !isValidTurkishMobilePhone(
        normalizedPhone
      )
    ) {
      setFormError(
        "Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır."
      );

      return;
    }

    if (
      !isValidEmail(
        normalizedEmail
      )
    ) {
      setFormError(
        "Lütfen geçerli bir e-posta adresi giriniz."
      );

      return;
    }

    if (positionId === "") {
      setFormError(
        "Başvurmak istediğiniz pozisyonu seçmelisiniz."
      );

      return;
    }

    setFirstName(
      normalizedFirstName
    );

    setLastName(
      normalizedLastName
    );

    setPhone(
      normalizedPhone
    );

    setEmail(
      normalizedEmail
    );

    /*
     * Burada ayrıca window.scrollTo kullanmıyoruz.
     * Yukarıdaki useEffect, step DOM'a basıldıktan
     * sonra scroll işlemini yapacak.
     */
    setStep(2);
  }

  function handlePreviousStep() {
    clearMessages();

    setStep(1);

    /*
     * useEffect ilk step için bilinçli olarak
     * çalışmadığından geri dönüşte manuel scroll.
     */
    scrollToFormTop();
  }

  /* =========================================================
     2. ADIM VALIDATION
  ========================================================= */

  function validateSecondStep(): boolean {
    if (
      gender !== "male" &&
      gender !== "female"
    ) {
      setFormError(
        "Cinsiyet alanında Kadın veya Erkek seçeneklerinden birini seçmelisiniz."
      );

      return false;
    }

    if (!birthDate) {
      setFormError(
        "Doğum tarihi alanını doldurmalısınız."
      );

      return false;
    }

    if (
      !isAtLeast16YearsOld(
        birthDate
      )
    ) {
      setFormError(
        "Başvuru yapabilmek için en az 16 yaşında olmalısınız."
      );

      return false;
    }

    if (
      city.trim() === ""
    ) {
      setFormError(
        "Şehir alanını doldurmalısınız."
      );

      return false;
    }

    if (
      experience === ""
    ) {
      setFormError(
        "Deneyim süresini seçmelisiniz."
      );

      return false;
    }

    if (
      educationLevel === ""
    ) {
      setFormError(
        "Eğitim durumunu seçmelisiniz."
      );

      return false;
    }

    if (
      employmentType === ""
    ) {
      setFormError(
        "Çalışma şeklini seçmelisiniz."
      );

      return false;
    }

    if (
      shiftAvailable === null
    ) {
      setFormError(
        "Vardiyalı çalışma durumunu belirtmelisiniz."
      );

      return false;
    }

    if (!cv) {
      setFormError(
        "CV dosyası yüklemelisiniz."
      );

      return false;
    }

    if (
      cv.size >
      5 * 1024 * 1024
    ) {
      setFormError(
        "CV dosyası en fazla 5 MB olabilir."
      );

      return false;
    }

    const allowedCvTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedCvTypes.includes(
        cv.type
      )
    ) {
      setFormError(
        "CV yalnızca PDF, DOC veya DOCX formatında olabilir."
      );

      return false;
    }

    if (!kvkkApproved) {
      setFormError(
        "KVKK onayını kabul etmelisiniz."
      );

      return false;
    }

    if (!turnstileToken) {
      setFormError(
        "Lütfen robot doğrulamasını tamamlayınız."
      );

      return false;
    }

    return true;
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit() {
    clearMessages();

    if (
      firstName.trim().length < 2
    ) {
      setFormError(
        "Ad alanını kontrol ediniz."
      );

      return;
    }

    if (
      lastName.trim().length < 2
    ) {
      setFormError(
        "Soyad alanını kontrol ediniz."
      );

      return;
    }

    if (
      !isValidTurkishMobilePhone(
        phone.trim()
      )
    ) {
      setFormError(
        "Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır."
      );

      return;
    }

    if (
      !isValidEmail(
        email.trim()
      )
    ) {
      setFormError(
        "Lütfen geçerli bir e-posta adresi giriniz."
      );

      return;
    }

    if (
      positionId === "" ||
      gender === "" ||
      birthDate === "" ||
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

    if (
      !validateSecondStep()
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const application =
        await createJobApplication({
          position_id:
            positionId,

          first_name:
            firstName.trim(),

          last_name:
            lastName.trim(),

          phone:
            phone.trim(),

          email:
            email.trim(),

          city:
            city.trim(),

          experience,

          education_level:
            educationLevel,

          employment_type:
            employmentType,

          shift_available:
            shiftAvailable,

          cv,

          kvkk_approved:
            kvkkApproved,

          turnstile_token:
            turnstileToken,

          ...(district.trim() !== "" && {
            district:
              district.trim(),
          }),

          gender,

          birth_date:
            birthDate,

          ...(militaryStatus !== "" && {
            military_status:
              militaryStatus,
          }),

          ...(driverLicense.trim() !== "" && {
            driver_license:
              driverLicense.trim(),
          }),

          ...(smoker !== null && {
            smoker,
          }),

          ...(about.trim() !== "" && {
            about:
              about.trim(),
          }),
        });

      setCreatedApplication(
        application
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Başvuru gönderilemedi:",
        error
      );

      resetTurnstile();

      if (
        axios.isAxiosError<ValidationErrorResponse>(
          error
        )
      ) {
        if (
          error.response?.status === 429
        ) {
          setRateLimitError(
            error.response?.data
              ?.message ??
              "Çok fazla başvuru gönderdiniz. Lütfen 10 dakika sonra tekrar deneyiniz."
          );

          return;
        }

        if (
          error.response?.status === 409
        ) {
          setRecentApplicationError(
            error.response?.data
              ?.message ??
              "Bu bilgilerle yakın zamanda bir başvuru yapılmıştır."
          );

          return;
        }

        const responseErrors =
          error.response?.data
            ?.errors;

        if (
          responseErrors
        ) {
          setValidationErrors(
            Object.values(
              responseErrors
            ).flat()
          );

          setFormError(
            "Formdaki bazı alanları kontrol etmelisiniz."
          );

          return;
        }

        setFormError(
          error.response?.data
            ?.message ??
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

  /* =========================================================
     FORM RESET
  ========================================================= */

  function resetForm() {
    setStep(1);

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPositionId("");

    setCity("");
    setDistrict("");
    setGender("");
    setBirthDate("");

    setExperience("");

    setEducationLevel("");
    setEmploymentType("");
    setMilitaryStatus("");

    setDriverLicense("");

    setSmoker(null);
    setShiftAvailable(null);

    setAbout("");

    setCv(null);

    setKvkkApproved(false);

    setTurnstileToken("");
    setTurnstileError(null);

    setTurnstileKey(
      (currentKey) =>
        currentKey + 1
    );

    setFormError(null);
    setRateLimitError(null);
    setRecentApplicationError(null);
    setValidationErrors([]);

    setCreatedApplication(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (createdApplication) {
    return (
      <section
        className="
          rounded-[1.8rem]
          border
          border-[#DED2C5]
          bg-white
          p-6
          text-center
          shadow-[0_24px_70px_rgba(66,49,34,0.08)]
          sm:p-10
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-emerald-100
            text-3xl
            text-emerald-700
          "
        >
          ✓
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-[#2B241E]">
          Başvurunuz Alındı
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#71655B] sm:text-base">
          Sayın{" "}
          {createdApplication.full_name},
          başvurunuz başarıyla alınmıştır.
          Yönetim ekibimiz başvurunuzu
          değerlendirdikten sonra sizinle
          iletişime geçecektir.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-[1rem] border border-[#DED2C5] bg-[#F8F4EF] p-5 text-left">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#817367]">
              Başvuru numarası
            </span>

            <span className="text-sm font-semibold text-[#2B241E]">
              #{createdApplication.id}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-[#817367]">
              Pozisyon
            </span>

            <span className="text-right text-sm font-semibold text-[#2B241E]">
              {createdApplication.position?.name ??
                "Pozisyon bilgisi alınamadı"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={resetForm}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-full
              bg-[#A87339]
              px-7
              text-sm
              font-semibold
              text-white
              transition
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#91602F]
            "
          >
            Yeni Başvuru Yap
          </button>
        </div>
      </section>
    );
  }

  /* =========================================================
     FORM
  ========================================================= */

  return (
    <section>
      {/* SCROLL TARGET */}
      <div
        ref={formTopRef}
        className="scroll-mt-6"
      />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#2B241E]">
          Başvuru Bilgileri
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#75695E]">
          Lütfen aşağıdaki bilgileri eksiksiz doldurunuz.
        </p>
      </div>

      <JobApplicationStepIndicator
        currentStep={step}
      />

      {positionError && (
        <div
          role="alert"
          className="mb-6 rounded-[0.9rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {positionError}
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="mb-6 rounded-[0.9rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p className="font-medium">
            {formError}
          </p>

          {validationErrors.length >
            0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {validationErrors.map(
                (
                  message,
                  index
                ) => (
                  <li
                    key={`${message}-${index}`}
                  >
                    {message}
                  </li>
                )
              )}
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
        {/* STEP 1 */}

        {step === 1 && (
          <PersonalInformationStep
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            positionId={positionId}
            positions={positions}
            onFirstNameChange={
              setFirstName
            }
            onLastNameChange={
              setLastName
            }
            onPhoneChange={
              setPhone
            }
            onEmailChange={
              setEmail
            }
            onPositionChange={
              setPositionId
            }
          />
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <ApplicationDetailsStep
              city={city}
              district={district}
              gender={gender}
              birthDate={birthDate}
              experience={experience}
              educationLevel={
                educationLevel
              }
              employmentType={
                employmentType
              }
              militaryStatus={
                militaryStatus
              }
              driverLicense={
                driverLicense
              }
              smoker={smoker}
              shiftAvailable={
                shiftAvailable
              }
              about={about}
              cv={cv}
              kvkkApproved={
                kvkkApproved
              }
              onCityChange={setCity}
              onDistrictChange={
                setDistrict
              }
              onGenderChange={
                setGender
              }
              onBirthDateChange={
                setBirthDate
              }
              onExperienceChange={
                setExperience
              }
              onEducationLevelChange={
                setEducationLevel
              }
              onEmploymentTypeChange={
                setEmploymentType
              }
              onMilitaryStatusChange={
                setMilitaryStatus
              }
              onDriverLicenseChange={
                setDriverLicense
              }
              onSmokerChange={
                setSmoker
              }
              onShiftAvailableChange={
                setShiftAvailable
              }
              onAboutChange={
                setAbout
              }
              onCvChange={setCv}
              onKvkkApprovedChange={
                setKvkkApproved
              }
            />

            {/* TURNSTILE */}

            <div className="rounded-[1rem] border border-[#DED2C5] bg-[#F8F4EF] p-4 sm:p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="size-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#2B241E]">
                    Güvenlik doğrulaması
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#817367]">
                    Başvuruyu göndermeden önce
                    robot olmadığınızı doğrulayın.
                  </p>
                </div>
              </div>

              {!turnstileSiteKey ? (
                <div
                  role="alert"
                  className="rounded-[0.8rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  Turnstile site anahtarı
                  tanımlanmamış.{" "}

                  <code>
                    NEXT_PUBLIC_TURNSTILE_SITE_KEY
                  </code>{" "}
                  değerini kontrol edin.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Turnstile
                    key={turnstileKey}
                    siteKey={
                      turnstileSiteKey
                    }
                    onSuccess={(token) => {
                      setTurnstileToken(
                        token
                      );

                      setTurnstileError(
                        null
                      );
                    }}
                    onExpire={() => {
                      setTurnstileToken(
                        ""
                      );

                      setTurnstileError(
                        "Robot doğrulamasının süresi doldu. Lütfen tekrar doğrulayın."
                      );
                    }}
                    onError={() => {
                      setTurnstileToken(
                        ""
                      );

                      setTurnstileError(
                        "Robot doğrulaması yüklenemedi. Lütfen tekrar deneyin."
                      );
                    }}
                    options={{
                      theme: "light",
                      size: "normal",
                      language: "tr",
                    }}
                  />
                </div>
              )}

              {turnstileError && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-red-600"
                >
                  {turnstileError}
                </p>
              )}

              {turnstileToken && (
                <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
                  <ShieldCheck className="size-4" />
                  Robot doğrulaması tamamlandı.
                </p>
              )}
            </div>

            {/* RATE LIMIT */}

            {rateLimitError && (
              <div
                role="alert"
                className="rounded-xl border border-amber-300 bg-amber-50 p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">
                    🛡️
                  </div>

                  <div>
                    <h3 className="font-semibold text-amber-900">
                      Güvenlik Koruması Aktif
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-amber-800">
                      {rateLimitError}
                    </p>

                    <p className="mt-3 text-xs leading-5 text-amber-700">
                      Spam ve otomatik başvuruları
                      önlemek amacıyla aynı IP
                      adresinden kısa süre içerisinde
                      sınırlı sayıda başvuru kabul
                      edilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* RECENT APPLICATION */}

            {recentApplicationError && (
              <div
                role="alert"
                className="rounded-xl border border-sky-300 bg-sky-50 p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xl">
                    📋
                  </div>

                  <div>
                    <h3 className="font-semibold text-sky-900">
                      Yakın Zamanda Başvuru Yapılmış
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-sky-800">
                      {recentApplicationError}
                    </p>

                    <p className="mt-3 text-xs leading-5 text-sky-700">
                      Başvurunuz sistemimizde
                      kayıtlıdır. Aynı bilgilerle
                      tekrar başvuru yapmanıza gerek
                      yoktur. Başvurunuz
                      değerlendirildikten sonra
                      sizinle iletişime geçilecektir.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* BUTTONS */}

        <div
          className={`flex flex-col gap-3 border-t border-[#E2D8CD] pt-6 sm:flex-row ${
            step === 1
              ? "sm:justify-end"
              : "sm:justify-between"
          }`}
        >
          {step === 2 && (
            <button
              type="button"
              onClick={
                handlePreviousStep
              }
              disabled={
                isSubmitting
              }
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                border
                border-[#D8CCBE]
                bg-white
                px-6
                text-sm
                font-semibold
                text-[#51463D]
                transition
                duration-300
                hover:border-[#A87339]
                hover:text-[#A87339]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              ← Geri
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={
                handleNextStep
              }
              disabled={
                isLoadingPositions
              }
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                bg-[#A87339]
                px-7
                text-sm
                font-semibold
                text-white
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#91602F]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoadingPositions
                ? "Pozisyonlar Yükleniyor..."
                : "Devam Et →"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !turnstileToken ||
                !turnstileSiteKey
              }
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                bg-[#A87339]
                px-7
                text-sm
                font-semibold
                text-white
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#91602F]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Başvuru Gönderiliyor...
                </>
              ) : !turnstileToken ? (
                "Önce Robot Doğrulamasını Tamamlayın"
              ) : (
                "Başvuruyu Gönder"
              )}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}