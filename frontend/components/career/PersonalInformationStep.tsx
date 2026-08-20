interface Position {
  id: number;
  name: string;
}

interface PersonalInformationStepProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  positionId: number | "";

  positions: Position[];

  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPositionChange: (value: number | "") => void;
}

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

export default function PersonalInformationStep({
  firstName,
  lastName,
  phone,
  email,
  positionId,
  positions,
  onFirstNameChange,
  onLastNameChange,
  onPhoneChange,
  onEmailChange,
  onPositionChange,
}: PersonalInformationStepProps) {
  const handlePhoneChange = (value: string) => {
    // Sadece rakamları al
    const digitsOnly = value.replace(/\D/g, "");

    // Türkiye cep telefonu için maksimum 11 hane
    const limitedValue = digitsOnly.slice(0, 11);

    onPhoneChange(limitedValue);
  };

  const handleEmailChange = (value: string) => {
    // Kullanıcının yanlışlıkla boşluk girmesini engelle
    onEmailChange(value.replace(/\s/g, ""));
  };

  return (
    <div className="space-y-8">
      {/* =====================================================
          BÖLÜM BAŞLIĞI
      ===================================================== */}

      <div className="border-b border-[#E2D8CD] pb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9A6B35]">
          01 · Kişisel Bilgiler
        </p>

        <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#2B241E] sm:text-2xl">
          Önce sizi tanıyalım.
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#75695E]">
          İletişim ve başvuru bilgilerinizi eksiksiz doldurun.
        </p>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* AD */}

        <div className="space-y-2">
          <label
            htmlFor="first_name"
            className="text-sm font-semibold text-[#3A312A]"
          >
            Ad
            <span className="ml-1 text-[#A87339]">*</span>
          </label>

          <input
            id="first_name"
            type="text"
            value={firstName}
            onChange={(event) =>
              onFirstNameChange(event.target.value)
            }
            placeholder="Adınızı giriniz"
            autoComplete="given-name"
            required
            minLength={2}
            maxLength={50}
            className={inputClassName}
          />

          <p className="text-[11px] leading-5 text-[#988A7D]">
            En az 2 karakter giriniz.
          </p>
        </div>

        {/* SOYAD */}

        <div className="space-y-2">
          <label
            htmlFor="last_name"
            className="text-sm font-semibold text-[#3A312A]"
          >
            Soyad
            <span className="ml-1 text-[#A87339]">*</span>
          </label>

          <input
            id="last_name"
            type="text"
            value={lastName}
            onChange={(event) =>
              onLastNameChange(event.target.value)
            }
            placeholder="Soyadınızı giriniz"
            autoComplete="family-name"
            required
            minLength={2}
            maxLength={50}
            className={inputClassName}
          />

          <p className="text-[11px] leading-5 text-[#988A7D]">
            En az 2 karakter giriniz.
          </p>
        </div>

        {/* TELEFON */}

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-[#3A312A]"
          >
            Telefon
            <span className="ml-1 text-[#A87339]">*</span>
          </label>

          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(event) =>
              handlePhoneChange(event.target.value)
            }
            placeholder="05xxxxxxxxx"
            autoComplete="tel"
            required
            maxLength={11}
            pattern="05[0-9]{9}"
            title="Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır."
            className={inputClassName}
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] leading-5 text-[#988A7D]">
              05 ile başlayan 11 haneli cep telefonu numarası.
            </p>

            <span
              className={`
                shrink-0
                text-[10px]
                font-semibold
                ${
                  phone.length === 11
                    ? "text-emerald-600"
                    : "text-[#A99B8D]"
                }
              `}
            >
              {phone.length}/11
            </span>
          </div>
        </div>

        {/* EMAIL */}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-[#3A312A]"
          >
            E-posta
            <span className="ml-1 text-[#A87339]">*</span>
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              handleEmailChange(event.target.value)
            }
            placeholder="ornek@mail.com"
            autoComplete="email"
            required
            maxLength={120}
            className={inputClassName}
          />

          <p className="text-[11px] leading-5 text-[#988A7D]">
            Geçerli ve aktif olarak kullandığınız e-posta adresini giriniz.
          </p>
        </div>

        {/* POZİSYON */}

        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="position"
            className="text-sm font-semibold text-[#3A312A]"
          >
            Başvurulan Pozisyon
            <span className="ml-1 text-[#A87339]">*</span>
          </label>

          <select
            id="position"
            value={positionId}
            onChange={(event) =>
              onPositionChange(
                event.target.value === ""
                  ? ""
                  : Number(event.target.value)
              )
            }
            required
            className={`
              ${inputClassName}
              cursor-pointer
              appearance-none
            `}
          >
            <option value="">
              Pozisyon seçiniz
            </option>

            {positions.map((position) => (
              <option
                key={position.id}
                value={position.id}
              >
                {position.name}
              </option>
            ))}
          </select>

          <p className="text-[11px] leading-5 text-[#988A7D]">
            Başvurmak istediğiniz pozisyonu seçiniz.
          </p>
        </div>
      </div>
    </div>
  );
}