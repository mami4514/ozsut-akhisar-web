interface ApplicationAboutProps {
  about: string | null;
}

function displayValue(value: string | null) {
  const normalizedValue = value?.trim();

  return normalizedValue || "Aday kendisi hakkında bilgi paylaşmamış.";
}

export default function ApplicationAbout({
  about,
}: ApplicationAboutProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Hakkında
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Adayın başvuru sırasında paylaştığı bilgiler
        </p>
      </div>

      <div className="rounded-lg border bg-muted/20 p-4 min-h-[120px]">
       <p className="whitespace-pre-wrap leading-7 text-sm text-foreground">
            {displayValue(about)}
       </p>
      </div>
    </section>
  );
}