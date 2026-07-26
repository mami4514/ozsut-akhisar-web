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
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label
          htmlFor="first_name"
          className="text-sm font-medium"
        >
          Ad
        </label>

        <input
          id="first_name"
          type="text"
          value={firstName}
          onChange={(event) =>
            onFirstNameChange(event.target.value)
          }
          placeholder="Adınızı giriniz"
          className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="last_name"
          className="text-sm font-medium"
        >
          Soyad
        </label>

        <input
          id="last_name"
          type="text"
          value={lastName}
          onChange={(event) =>
            onLastNameChange(event.target.value)
          }
          placeholder="Soyadınızı giriniz"
          className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium"
        >
          Telefon
        </label>

        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) =>
            onPhoneChange(event.target.value)
          }
          placeholder="05xx xxx xx xx"
          className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          E-posta
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) =>
            onEmailChange(event.target.value)
          }
          placeholder="ornek@mail.com"
          className="h-11 w-full rounded-md border px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="position"
          className="text-sm font-medium"
        >
          Başvurulan Pozisyon
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
          className="h-11 w-full rounded-md border bg-white px-3 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
      </div>
    </div>
  );
}