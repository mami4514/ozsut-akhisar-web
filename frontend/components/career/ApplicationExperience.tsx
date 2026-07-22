interface ApplicationExperienceProps {
  experience: string | null;
  educationLevel: string | null;
  employmentType: string | null;
  militaryStatus: string | null;
  driverLicense: string | null;
  smoker: boolean | null;
  shiftAvailable: boolean | null;
}

function displayValue(value: unknown) {
  if (value === null || value === undefined) {
    return "Belirtilmemiş";
  }

  const normalizedValue = String(value).trim();

  return normalizedValue || "Belirtilmemiş";
}

function formatEducationLevel(value: string | null) {
  if (!value) {
    return "Belirtilmemiş";
  }

  const educationLevels: Record<string, string> = {
    primary_school: "İlkokul",
    middle_school: "Ortaokul",
    high_school: "Lise",
    associate_degree: "Ön Lisans",
    bachelor_degree: "Lisans",
    master_degree: "Yüksek Lisans",
    doctorate: "Doktora",
  };

  return educationLevels[value] ?? value;
}

function formatEmploymentType(value: string | null) {
  if (!value) {
    return "Belirtilmemiş";
  }

  const employmentTypes: Record<string, string> = {
    full_time: "Tam Zamanlı",
    part_time: "Yarı Zamanlı",
    seasonal: "Sezonluk",
    internship: "Staj",
  };

  return employmentTypes[value] ?? value;
}

function formatMilitaryStatus(value: string | null) {
  if (!value) {
    return "Belirtilmemiş";
  }

  const militaryStatuses: Record<string, string> = {
    completed: "Yapıldı",
    exempt: "Muaf",
    postponed: "Tecilli",
    not_applicable: "Uygulanamaz",
  };

  return militaryStatuses[value] ?? value;
}

function formatBoolean(value: boolean | null) {
  if (value === null) {
    return "Belirtilmemiş";
  }

  return value ? "Evet" : "Hayır";
}

export default function ApplicationExperience({
  experience,
  educationLevel,
  employmentType,
  militaryStatus,
  driverLicense,
  smoker,
  shiftAvailable,
}: ApplicationExperienceProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Deneyim ve Çalışma Bilgileri</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Adayın mesleki geçmişi ve çalışma uygunluğu
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Eğitim Seviyesi</p>

          <p className="mt-1 font-medium">
            {formatEducationLevel(educationLevel)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Çalışma Tercihi</p>

          <p className="mt-1 font-medium">
            {formatEmploymentType(employmentType)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Askerlik Durumu</p>

          <p className="mt-1 font-medium">
            {formatMilitaryStatus(militaryStatus)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Ehliyet</p>

          <p className="mt-1 font-medium">{displayValue(driverLicense)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Sigara Kullanımı</p>

          <p className="mt-1 font-medium">{formatBoolean(smoker)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Vardiyalı Çalışmaya Uygunluk
          </p>

          <p className="mt-1 font-medium">
            {formatBoolean(shiftAvailable)}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <p className="text-sm text-muted-foreground">İş Deneyimi</p>

        <p className="mt-2 whitespace-pre-wrap leading-7">
          {displayValue(experience)}
        </p>
      </div>
    </section>
  );
}