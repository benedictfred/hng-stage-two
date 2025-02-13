import { useEffect, useState } from "react";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import TicketReady from "./TicketReady";

function StepsContainer() {
  const [step, setStep] = useState(
    () => Number(localStorage.getItem("step")) || 1
  );

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

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
      {step === 1 && <TicketSelection setStep={setStep} />}
      {step === 2 && <AttendeeDetails setStep={setStep} />}
      {step === 3 && <TicketReady setStep={setStep} />}
    </div>
  );
}

export default StepsContainer;
