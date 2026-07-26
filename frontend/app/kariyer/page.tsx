import JobApplicationForm from "@/components/career/JobApplicationForm";

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-muted/20 py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Özsüt Akhisar
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            İş Başvuru Formu
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Ekibimize katılmak için aşağıdaki formu eksiksiz doldurun.
            Başvurunuz yönetim ekibimiz tarafından değerlendirilecektir.
          </p>
        </section>

        <JobApplicationForm />
      </div>
    </main>
  );
}