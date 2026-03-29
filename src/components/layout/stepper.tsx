interface StepperProps {
  currentStep: number;
  totalSteps: number;
  isFinished?: boolean;
}

export function Stepper({
  currentStep,
  totalSteps = 3,
  isFinished = false,
}: StepperProps) {
  return (
    <div className="flex items-center justify-center px-6 py-4 bg-(--color-surface) border-b border-(--color-border)">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const step = i + 1;
          const isCompleted =
            currentStep > step ||
            (isFinished && currentStep === totalSteps && step === totalSteps);
          const isActive = currentStep === step && !isFinished;

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                  transition-all duration-200
                  ${isCompleted ? "bg-(--color-primary) text-white" : ""}
                  ${
                    isActive
                      ? "bg-(--color-primary) text-white ring-4 ring-(--color-primary-ring)"
                      : ""
                  }
                  ${
                    !isActive && !isCompleted
                      ? "bg-(--color-border) text-(--color-text-secondary)"
                      : ""
                  }
                `}
              >
                {isCompleted ? "✓" : step}
              </div>

              {i < totalSteps - 1 && (
                <div
                  className={`w-8 h-0.5 transition-all duration-200 ${
                    currentStep > step
                      ? "bg-(--color-primary)"
                      : "bg-(--color-border)"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
