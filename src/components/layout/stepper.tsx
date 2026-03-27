interface StepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function Stepper({ currentStep, totalSteps = 4 }: StepperProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <span className="text-sm font-medium text-gray-500">
        ნაბიჯი{" "}
        <span className="text-gray-900 font-semibold">{currentStep}</span>
        {" / "}
        {totalSteps}
      </span>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const step = i + 1;
          const isCompleted = currentStep > step;
          const isActive = currentStep === step;

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                  transition-all duration-200
                  ${isCompleted ? "bg-blue-600 text-white" : ""}
                  ${
                    isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : ""
                  }
                  ${
                    !isActive && !isCompleted ? "bg-gray-100 text-gray-400" : ""
                  }
                `}
              >
                {isCompleted ? "✓" : step}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`w-8 h-0.5 transition-all duration-200 ${
                    isCompleted ? "bg-blue-600" : "bg-gray-200"
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
