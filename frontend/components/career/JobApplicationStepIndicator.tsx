interface JobApplicationStepIndicatorProps {
  currentStep: 1 | 2;
}

export default function JobApplicationStepIndicator({
  currentStep,
}: JobApplicationStepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col items-center text-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
              currentStep === 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-green-500 bg-green-500 text-white"
            }`}
          >
            {currentStep === 1 ? "1" : "✓"}
          </div>

          <span className="mt-2 text-xs font-medium sm:text-sm">
            Kişisel Bilgiler
          </span>
        </div>

        <div
          className={`mt-5 h-1 flex-1 rounded-full transition ${
            currentStep === 2 ? "bg-primary" : "bg-gray-200"
          }`}
        />

        <div className="flex flex-1 flex-col items-center text-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
              currentStep === 2
                ? "border-primary bg-primary text-primary-foreground"
                : "border-gray-300 bg-white text-muted-foreground"
            }`}
          >
            2
          </div>

          <span className="mt-2 text-xs font-medium sm:text-sm">
            Başvuru Detayları
          </span>
        </div>
      </div>
    </div>
  );
}