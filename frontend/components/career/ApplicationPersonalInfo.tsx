interface ApplicationPersonalInfoProps {
  phone: string | null;
  email: string | null;
  gender: string | null;
  birthDate: string | null;
  city: string | null;
  district: string | null;
}

function formatGender(gender: string | null) {
  if (!gender) {
    return "Belirtilmemiş";
  }

  const genderLabels: Record<string, string> = {
    male: "Erkek",
    female: "Kadın",
    erkek: "Erkek",
    kadın: "Kadın",
    kadin: "Kadın",
  };

  return genderLabels[gender.toLowerCase()] ?? gender;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Belirtilmemiş";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function displayValue(value: string | null) {
  return value?.trim() || "Belirtilmemiş";
}

export default function ApplicationPersonalInfo({
  phone,
  email,
  gender,
  birthDate,
  city,
  district,
}: ApplicationPersonalInfoProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Kişisel Bilgiler
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Başvuru sahibinin iletişim ve kimlik bilgileri
        </p>
      </div>

      <dl className="grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            Telefon
          </dt>

          <dd className="mt-1 text-sm font-medium text-foreground">
            {displayValue(phone)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            E-posta
          </dt>

          <dd className="mt-1 break-all text-sm font-medium text-foreground">
            {displayValue(email)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            Cinsiyet
          </dt>

          <dd className="mt-1 text-sm font-medium text-foreground">
            {formatGender(gender)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            Doğum Tarihi
          </dt>

          <dd className="mt-1 text-sm font-medium text-foreground">
            {formatDate(birthDate)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            Şehir
          </dt>

          <dd className="mt-1 text-sm font-medium text-foreground">
            {displayValue(city)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            İlçe
          </dt>

          <dd className="mt-1 text-sm font-medium text-foreground">
            {displayValue(district)}
          </dd>
        </div>
      </dl>
    </section>
  );
}