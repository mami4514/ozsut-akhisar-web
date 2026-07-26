export type Gender = "" | "male" | "female";

export type EducationLevel =
  | ""
  | "primary_school"
  | "middle_school"
  | "high_school"
  | "associate_degree"
  | "bachelor_degree"
  | "master_degree"
  | "doctorate";

export type EmploymentType = "" | "full_time" | "part_time";

export type MilitaryStatus =
  | ""
  | "completed"
  | "deferred"
  | "exempt"
  | "not_completed";

interface ApplicationDetailsStepProps {
  city: string;
  district: string;
  gender: Gender;
  birthDate: string;
  experience: number | "";
  educationLevel: EducationLevel;
  employmentType: EmploymentType;
  militaryStatus: MilitaryStatus;
  driverLicense: string;
  smoker: boolean | null;
  shiftAvailable: boolean | null;
  about: string;
  cv: File | null;
  kvkkApproved: boolean;

  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onGenderChange: (value: Gender) => void;
  onBirthDateChange: (value: string) => void;
  onExperienceChange: (value: number | "") => void;
  onEducationLevelChange: (value: EducationLevel) => void;
  onEmploymentTypeChange: (value: EmploymentType) => void;
  onMilitaryStatusChange: (value: MilitaryStatus) => void;
  onDriverLicenseChange: (value: string) => void;
  onSmokerChange: (value: boolean | null) => void;
  onShiftAvailableChange: (value: boolean | null) => void;
  onAboutChange: (value: string) => void;
  onCvChange: (file: File | null) => void;
  onKvkkApprovedChange: (value: boolean) => void;
}

const experienceOptions = Array.from(
  { length: 21 },
  (_, index) => index
);

export default function ApplicationDetailsStep({
  city,
  district,
  gender,
  birthDate,
  experience,
  educationLevel,
  employmentType,
  militaryStatus,
  driverLicense,
  smoker,
  shiftAvailable,
  about,
  cv,
  kvkkApproved,
  onCityChange,
  onDistrictChange,
  onGenderChange,
  onBirthDateChange,
  onExperienceChange,
  onEducationLevelChange,
  onEmploymentTypeChange,
  onMilitaryStatusChange,
  onDriverLicenseChange,
  onSmokerChange,
  onShiftAvailableChange,
  onAboutChange,
  onCvChange,
  onKvkkApprovedChange,
}: ApplicationDetailsStepProps) {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Konum Bilgileri</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            İkamet ettiğiniz şehir ve ilçe bilgilerini giriniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              Şehir
            </label>

            <input
              id="city"
              type="text"
              value={city}
              onChange={(event) => onCityChange(event.target.value)}
              placeholder="Örn. Manisa"
              className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="district" className="text-sm font-medium">
              İlçe
            </label>

            <input
              id="district"
              type="text"
              value={district}
              onChange={(event) => onDistrictChange(event.target.value)}
              placeholder="Örn. Akhisar"
              className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Kişisel Detaylar</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Başvurunuzun değerlendirilmesi için temel bilgilerinizi belirtiniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Cinsiyet
            </label>

            <select
              id="gender"
              value={gender}
              onChange={(event) =>
                onGenderChange(event.target.value as Gender)
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Belirtmek istemiyorum</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="birth_date" className="text-sm font-medium">
              Doğum Tarihi
            </label>

            <input
              id="birth_date"
              type="date"
              min="1940-01-01"
              max={new Date().toISOString().split("T")[0]}
              value={birthDate}
              onChange={(event) =>
                onBirthDateChange(event.target.value)
              }
              className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Çalışma Bilgileri</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Deneyim ve çalışma tercihlerinizi belirtiniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">
              Deneyim Süresi
            </label>

            <select
              id="experience"
              value={experience}
              onChange={(event) =>
                onExperienceChange(
                  event.target.value === ""
                    ? ""
                    : Number(event.target.value)
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Deneyim seçiniz</option>

              {experienceOptions.map((year) => (
                <option key={year} value={year}>
                  {year === 0
                    ? "Deneyimim yok"
                    : year === 20
                      ? "20 yıl ve üzeri"
                      : `${year} yıl`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="education_level"
              className="text-sm font-medium"
            >
              Eğitim Durumu
            </label>

            <select
              id="education_level"
              value={educationLevel}
              onChange={(event) =>
                onEducationLevelChange(
                  event.target.value as EducationLevel
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Eğitim durumu seçiniz</option>
              <option value="primary_school">İlkokul</option>
              <option value="middle_school">Ortaokul</option>
              <option value="high_school">Lise</option>
              <option value="associate_degree">Ön Lisans</option>
              <option value="bachelor_degree">Lisans</option>
              <option value="master_degree">Yüksek Lisans</option>
              <option value="doctorate">Doktora</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="employment_type"
              className="text-sm font-medium"
            >
              Çalışma Şekli
            </label>

            <select
              id="employment_type"
              value={employmentType}
              onChange={(event) =>
                onEmploymentTypeChange(
                  event.target.value as EmploymentType
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Çalışma şekli seçiniz</option>
              <option value="full_time">Tam Zamanlı</option>
              <option value="part_time">Yarı Zamanlı</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="military_status"
              className="text-sm font-medium"
            >
              Askerlik Durumu
            </label>

            <select
              id="military_status"
              value={militaryStatus}
              onChange={(event) =>
                onMilitaryStatusChange(
                  event.target.value as MilitaryStatus
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Belirtilmedi</option>
              <option value="completed">Tamamlandı</option>
              <option value="deferred">Tecilli</option>
              <option value="exempt">Muaf</option>
              <option value="not_completed">Tamamlanmadı</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="driver_license"
              className="text-sm font-medium"
            >
              Ehliyet
            </label>

            <input
              id="driver_license"
              type="text"
              maxLength={50}
              value={driverLicense}
              onChange={(event) =>
                onDriverLicenseChange(event.target.value)
              }
              placeholder="Örn. B sınıfı veya Yok"
              className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="smoker" className="text-sm font-medium">
              Sigara Kullanıyor musunuz?
            </label>

            <select
              id="smoker"
              value={
                smoker === null ? "" : smoker ? "true" : "false"
              }
              onChange={(event) =>
                onSmokerChange(
                  event.target.value === ""
                    ? null
                    : event.target.value === "true"
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Belirtmek istemiyorum</option>
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="shift_available"
              className="text-sm font-medium"
            >
              Vardiyalı Çalışabilir misiniz?
            </label>

            <select
              id="shift_available"
              value={
                shiftAvailable === null
                  ? ""
                  : shiftAvailable
                    ? "true"
                    : "false"
              }
              onChange={(event) =>
                onShiftAvailableChange(
                  event.target.value === ""
                    ? null
                    : event.target.value === "true"
                )
              }
              className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Seçiniz</option>
              <option value="true">Evet, çalışabilirim</option>
              <option value="false">Hayır, çalışamam</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">
            Başvuru ve Belge Bilgileri
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Kendinizi kısaca tanıtın ve güncel CV dosyanızı yükleyin.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="about" className="text-sm font-medium">
              Hakkınızda
            </label>

            <textarea
              id="about"
              rows={6}
              maxLength={2000}
              value={about}
              onChange={(event) => onAboutChange(event.target.value)}
              placeholder="Kendinizden, deneyimlerinizden ve neden ekibimize katılmak istediğinizden bahsedebilirsiniz..."
              className="min-h-[160px] w-full resize-y rounded-md border px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />

            <div className="flex justify-end">
              <span
                className={`text-xs ${
                  about.length > 1800
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {about.length} / 2000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="cv" className="text-sm font-medium">
              CV Dosyası
            </label>

            <input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) =>
                onCvChange(event.target.files?.[0] ?? null)
              }
              className="block w-full rounded-md border bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
            />

            <p className="text-xs text-muted-foreground">
              PDF, DOC veya DOCX formatında, en fazla 5 MB dosya
              yükleyebilirsiniz.
            </p>

            {cv && (
              <div className="rounded-md border bg-muted/20 px-4 py-3">
                <p className="text-sm font-medium">
                  Seçilen dosya
                </p>

                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {cv.name}
                </p>
              </div>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-md border p-4">
            <input
              type="checkbox"
              checked={kvkkApproved}
              onChange={(event) =>
                onKvkkApprovedChange(event.target.checked)
              }
              className="mt-1 h-4 w-4 rounded border"
            />

            <span className="text-sm leading-6">
              Kişisel verilerimin iş başvurusu sürecinin yürütülmesi
              amacıyla işlenmesini kabul ediyorum.
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}