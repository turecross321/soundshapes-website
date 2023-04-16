import { FC } from "react";

interface StepperProps {
  steps: string[];
  completedSteps: number;
}

function GetStepClassName(index: number, completedSteps: number) {
  if (index < completedSteps) {
    return "bg-green-600 h-1";
  } else {
    return "bg-gray-700 h-1";
  }
}

const Stepper: FC<StepperProps> = ({ steps, completedSteps }) => {
  return (
    <div className="w-full bg-black rounded bg-opacity-30 stepper">
      <div className="flex justify-evenly">
        {steps.map((step, index) => (
          <div className="w-5/12" key={index}>
            <div className={GetStepClassName(index, completedSteps)}></div>

            <h1 className="text-center mt-2">{step}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
