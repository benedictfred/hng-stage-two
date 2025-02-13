import { useState } from "react";
import TicketType from "./TicketType";

function TicketSelection({ setStep }) {
  const [activeTicket, setActiveTicket] = useState(() => {
    const evenInfo = JSON.parse(localStorage.getItem("eventInfo"));
    if (evenInfo) return evenInfo.activeTicket || "regular";
  });
  const [ticketCount, setTicketCount] = useState(() => {
    const evenInfo = JSON.parse(localStorage.getItem("eventInfo"));
    if (evenInfo) return +evenInfo.ticketCount || 1;
  });

  function handleSubmit() {
    const eventInfo = { activeTicket, ticketCount };
    localStorage.setItem("eventInfo", JSON.stringify(eventInfo));
    setStep(2);
  }

  return (
    <div className="border border-[#0E464F] rounded-4xl p-5 mt-5">
      <div className="border border-[#07373F] rounded-2xl flex flex-col justify-center items-center p-5 text-center radial-gradient-left">
        <p className="font-road-rage text-5xl">Techember Fest &quot;25</p>
        <p className="font-roboto">
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </p>
        <p className="font-roboto">
          📍 [Event Location] || March 15, 2025 | 7:00 PM
        </p>
      </div>
      <div className="bg-[#07373F] h-1 w-full mt-5"></div>
      <div className="font-roboto mt-5 space-y-2">
        <p>Select Ticket Type:</p>
        <div className="bg-[#052228]  border border-[#07373F] p-3 flex gap-5 rounded-2xl max-sm:flex-col">
          <TicketType
            name="Regular Access"
            price="Free"
            isActive={activeTicket === "regular"}
            onClick={() => setActiveTicket("regular")}
          />
          <TicketType
            name="VIP Access"
            price="$50"
            isActive={activeTicket === "vip"}
            onClick={() => setActiveTicket("vip")}
          />
          <TicketType
            name="VVIP Access"
            price="$150"
            isActive={activeTicket === "vvip"}
            onClick={() => setActiveTicket("vvip")}
          />
        </div>
      </div>
      <div className="font-roboto mt-5 space-y-2">
        <p>Number of Tickets</p>
        <select
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
          className="border border-[#07373F] w-full active:outline-none active:border-none p-3 rounded-lg *:bg-[#07373F] outline-none"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-5 justify-center items-center mt-5 max-sm:space-x-0 max-sm:flex-col-reverse">
        <button className="border border-[#24A0B5] text-[#24A0B5] py-3 rounded-xl w-full cursor-pointer">
          Cancel
        </button>
        <button
          className="bg-[#24A0B5] py-3 rounded-xl w-full cursor-pointer max-sm:mb-4"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketSelection;
