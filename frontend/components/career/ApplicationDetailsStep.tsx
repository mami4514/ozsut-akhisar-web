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

const inputClassName = `
  h-12
  w-full
  rounded-[0.9rem]
  border
  border-[#D8CCBE]
  bg-white
  px-4
  text-[14px]
  text-[#2B241E]
  outline-none
  transition-all
  duration-300
  placeholder:text-[#A99B8D]
  focus:border-[#A87339]
  focus:ring-4
  focus:ring-[#A87339]/10
`;

const sectionTitleClassName =
  "text-xl font-semibold tracking-[-0.02em] text-[#2B241E] sm:text-2xl";

const sectionDescriptionClassName =
  "mt-2 max-w-2xl text-sm leading-6 text-[#75695E]";

const labelClassName =
  "text-sm font-semibold text-[#3A312A]";

function getMaxBirthDate() {
  const today = new Date();

  const year = today.getFullYear() - 16;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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
  const maxBirthDate = getMaxBirthDate();

  return (
    <div className="space-y-12">
      {/* =====================================================
          02 · BAŞVURU DETAYLARI
      ===================================================== */}

      <div className="border-b border-[#E2D8CD] pb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9A6B35]">
          02 · Başvuru Detayları
        </p>

        <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#2B241E] sm:text-2xl">
          Sizi biraz daha yakından tanıyalım.
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#75695E]">
          Başvurunuzun değerlendirilmesine yardımcı olacak ek bilgileri
          aşağıdan paylaşabilirsiniz.
        </p>
      </div>

      {/* =====================================================
          KONUM BİLGİLERİ
      ===================================================== */}

      <section>
        <div className="mb-6">
          <h3 className={sectionTitleClassName}>
            Konum Bilgileri
          </h3>

          <p className={sectionDescriptionClassName}>
            İkamet ettiğiniz şehir ve ilçe bilgilerini giriniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="city"
              className={labelClassName}
            >
              Şehir
            </label>

            <input
              id="city"
              type="text"
              value={city}
              onChange={(event) =>
                onCityChange(event.target.value)
              }
              placeholder="Örn. Manisa"
              autoComplete="address-level1"
              maxLength={100}
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="district"
              className={labelClassName}
            >
              İlçe
            </label>

            <input
              id="district"
              type="text"
              value={district}
              onChange={(event) =>
                onDistrictChange(event.target.value)
              }
              placeholder="Örn. Akhisar"
              autoComplete="address-level2"
              maxLength={100}
              className={inputClassName}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          KİŞİSEL DETAYLAR
      ===================================================== */}

      <section className="border-t border-[#E7DED5] pt-10">
        <div className="mb-6">
          <h3 className={sectionTitleClassName}>
            Kişisel Detaylar
          </h3>

          <p className={sectionDescriptionClassName}>
            Temel kişisel bilgilerinizi belirtiniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Cinsiyet */}

          <div className="space-y-2">
            <label
              htmlFor="gender"
              className={labelClassName}
            >
              Cinsiyet
              <span className="ml-1 text-[#A87339]">*</span>
            </label>

            <select
              id="gender"
              value={gender}
              onChange={(event) =>
                onGenderChange(
                  event.target.value as Gender
                )
              }
              required
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Cinsiyet seçiniz
              </option>

              <option value="female">
                Kadın
              </option>

              <option value="male">
                Erkek
              </option>
            </select>

            <p className="text-[11px] leading-5 text-[#988A7D]">
              Lütfen bir seçenek belirleyiniz.
            </p>
          </div>

          {/* Doğum tarihi */}

          <div className="space-y-2">
            <label
              htmlFor="birth_date"
              className={labelClassName}
            >
              Doğum Tarihi
              <span className="ml-1 text-[#A87339]">*</span>
            </label>

            <input
              id="birth_date"
              type="date"
              min="1940-01-01"
              max={maxBirthDate}
              value={birthDate}
              onChange={(event) =>
                onBirthDateChange(event.target.value)
              }
              required
              className={inputClassName}
            />

            <p className="text-[11px] leading-5 text-[#988A7D]">
              Başvuru yapabilmek için en az 16 yaşında olmalısınız.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ÇALIŞMA BİLGİLERİ
      ===================================================== */}

      <section className="border-t border-[#E7DED5] pt-10">
        <div className="mb-6">
          <h3 className={sectionTitleClassName}>
            Çalışma Bilgileri
          </h3>

          <p className={sectionDescriptionClassName}>
            Deneyim ve çalışma tercihlerinizi belirtiniz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Deneyim */}

          <div className="space-y-2">
            <label
              htmlFor="experience"
              className={labelClassName}
            >
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
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Deneyim seçiniz
              </option>

              {experienceOptions.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year === 0
                    ? "Deneyimim yok"
                    : year === 20
                      ? "20 yıl ve üzeri"
                      : `${year} yıl`}
                </option>
              ))}
            </select>
          </div>

          {/* Eğitim */}

          <div className="space-y-2">
            <label
              htmlFor="education_level"
              className={labelClassName}
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
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Eğitim durumu seçiniz
              </option>

              <option value="primary_school">
                İlkokul
              </option>

              <option value="middle_school">
                Ortaokul
              </option>

              <option value="high_school">
                Lise
              </option>

              <option value="associate_degree">
                Ön Lisans
              </option>

              <option value="bachelor_degree">
                Lisans
              </option>

              <option value="master_degree">
                Yüksek Lisans
              </option>

              <option value="doctorate">
                Doktora
              </option>
            </select>
          </div>

          {/* Çalışma şekli */}

          <div className="space-y-2">
            <label
              htmlFor="employment_type"
              className={labelClassName}
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
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Çalışma şekli seçiniz
              </option>

              <option value="full_time">
                Tam Zamanlı
              </option>

              <option value="part_time">
                Yarı Zamanlı
              </option>
            </select>
          </div>

          {/* Askerlik */}

          <div className="space-y-2">
            <label
              htmlFor="military_status"
              className={labelClassName}
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
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Belirtilmedi
              </option>

              <option value="completed">
                Tamamlandı
              </option>

              <option value="deferred">
                Tecilli
              </option>

              <option value="exempt">
                Muaf
              </option>

              <option value="not_completed">
                Tamamlanmadı
              </option>
            </select>
          </div>

          {/* Ehliyet */}

          <div className="space-y-2">
            <label
              htmlFor="driver_license"
              className={labelClassName}
            >
              Ehliyet
            </label>

            <input
              id="driver_license"
              type="text"
              maxLength={50}
              value={driverLicense}
              onChange={(event) =>
                onDriverLicenseChange(
                  event.target.value
                )
              }
              placeholder="Örn. B sınıfı veya Yok"
              className={inputClassName}
            />
          </div>

          {/* Sigara */}

          <div className="space-y-2">
            <label
              htmlFor="smoker"
              className={labelClassName}
            >
              Sigara Kullanıyor musunuz?
            </label>

            <select
              id="smoker"
              value={
                smoker === null
                  ? ""
                  : smoker
                    ? "true"
                    : "false"
              }
              onChange={(event) =>
                onSmokerChange(
                  event.target.value === ""
                    ? null
                    : event.target.value === "true"
                )
              }
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Belirtmek istemiyorum
              </option>

              <option value="false">
                Hayır
              </option>

              <option value="true">
                Evet
              </option>
            </select>
          </div>

          {/* Vardiya */}

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="shift_available"
              className={labelClassName}
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
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="">
                Seçiniz
              </option>

              <option value="true">
                Evet, çalışabilirim
              </option>

              <option value="false">
                Hayır, çalışamam
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* =====================================================
          BAŞVURU / CV
      ===================================================== */}

      <section className="border-t border-[#E7DED5] pt-10">
        <div className="mb-6">
          <h3 className={sectionTitleClassName}>
            Başvuru ve Belge Bilgileri
          </h3>

          <p className={sectionDescriptionClassName}>
            Kendinizi kısaca tanıtın ve güncel CV dosyanızı yükleyin.
          </p>
        </div>

        <div className="space-y-7">
          {/* Hakkında */}

          <div className="space-y-2">
            <label
              htmlFor="about"
              className={labelClassName}
            >
              Hakkınızda
            </label>

            <textarea
              id="about"
              rows={6}
              maxLength={2000}
              value={about}
              onChange={(event) =>
                onAboutChange(event.target.value)
              }
              placeholder="Kendinizden, deneyimlerinizden ve neden ekibimize katılmak istediğinizden bahsedebilirsiniz..."
              className="
                min-h-[160px]
                w-full
                resize-y
                rounded-[0.9rem]
                border
                border-[#D8CCBE]
                bg-white
                px-4
                py-3
                text-sm
                leading-6
                text-[#2B241E]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#A99B8D]
                focus:border-[#A87339]
                focus:ring-4
                focus:ring-[#A87339]/10
              "
            />

            <div className="flex justify-end">
              <span
                className={`text-[11px] ${
                  about.length > 1800
                    ? "text-red-500"
                    : "text-[#988A7D]"
                }`}
              >
                {about.length} / 2000
              </span>
            </div>
          </div>

          {/* CV */}

          <div className="space-y-3">
            <label
              htmlFor="cv"
              className={labelClassName}
            >
              CV Dosyası
            </label>

            <div
              className="
                rounded-[1rem]
                border
                border-dashed
                border-[#CDBBA8]
                bg-[#F8F4EF]
                p-4
                transition
                hover:border-[#A87339]
                sm:p-5
              "
            >
              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) =>
                  onCvChange(
                    event.target.files?.[0] ?? null
                  )
                }
                className="
                  block
                  w-full
                  text-sm
                  text-[#71655B]
                  file:mr-4
                  file:cursor-pointer
                  file:rounded-full
                  file:border-0
                  file:bg-[#A87339]
                  file:px-5
                  file:py-2.5
                  file:text-xs
                  file:font-semibold
                  file:text-white
                  file:transition
                  hover:file:bg-[#91602F]
                "
              />

              <p className="mt-3 text-[11px] leading-5 text-[#988A7D]">
                PDF, DOC veya DOCX formatında, en fazla 5 MB dosya
                yükleyebilirsiniz.
              </p>
            </div>

            {cv && (
              <div className="rounded-[0.9rem] border border-[#DED2C5] bg-[#F4EDE4] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6B35]">
                  Seçilen Dosya
                </p>

                <p className="mt-1.5 break-all text-sm text-[#62574E]">
                  {cv.name}
                </p>
              </div>
            )}
          </div>

          {/* KVKK */}

          <label
            className="
              flex
              cursor-pointer
              items-start
              gap-3
              rounded-[1rem]
              border
              border-[#DED2C5]
              bg-[#F8F4EF]
              p-4
              transition
              hover:border-[#C8B49E]
              sm:p-5
            "
          >
            <input
              type="checkbox"
              checked={kvkkApproved}
              onChange={(event) =>
                onKvkkApprovedChange(
                  event.target.checked
                )
              }
              className="
                mt-1
                h-4
                w-4
                shrink-0
                accent-[#A87339]
              "
            />

            <span className="text-[13px] leading-6 text-[#675C53] sm:text-sm">
              Kişisel verilerimin iş başvurusu sürecinin yürütülmesi
              amacıyla işlenmesini kabul ediyorum.
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}