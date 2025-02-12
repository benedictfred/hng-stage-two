import { useState } from "react";
import TicketSelection from "./TicketSelection";

function StepsContainer() {
  const [step, setStep] = useState(1);
  const steps = ["Ticket Selection", "Attendee Details", "Ready"];
  return (
    <div className="bg-[#041E23] border border-[#0E464F] rounded-4xl w-full mt-10 max-w-2xl p-10">
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl">{steps[step - 1]}</p>
          <p>Step {step}/3</p>
        </div>
        <progress value={(step / 3) * 100} max={100} />
      </div>
      <TicketSelection />
    </div>
  );
}

export default StepsContainer;
