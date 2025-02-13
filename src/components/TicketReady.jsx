import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";

function TicketReady({ setStep }) {
  const ticketRef = useRef(null);
  const eventInfo = JSON.parse(localStorage.getItem("eventInfo"));
  const attendeeDetails = JSON.parse(localStorage.getItem("attendeeForm"));

  const handleDownloadTicket = async () => {
    if (ticketRef.current) {
      try {
        await Promise.all(
          Array.from(ticketRef.current.getElementsByTagName("img")).map(
            (img) =>
              new Promise((resolve) => {
                if (img.complete) resolve();
                else img.onload = resolve;
              })
          )
        );

        const dataUrl = await toPng(ticketRef.current, {
          pixelRatio: 2,
          backgroundColor: "#0E464F",
        });

        const link = document.createElement("a");
        link.download = "techember-fest-ticket.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error downloading ticket:", error);
      }
    }
  };

  return (
    <div className="border border-[#0E464F] rounded-4xl p-5 mt-5">
      <div className="text-center">
        <h1 className="font-alatsi text-3xl">Your Ticket is Booked</h1>
        <p className="font-roboto">
          Check your email for a copy or you can download
        </p>
      </div>
      <div ref={ticketRef} className="flex items-center justify-center p-8">
        <div className="flex flex-col justify-center items-center relative">
          <img
            src="/ticket.png"
            alt="ticket"
            className="w-full h-full object-contain"
          />

          <div className="absolute top-5 flex flex-col justify-center items-center w-[280px] p-4 border border-[#24A0B5] rounded-lg">
            <div className="text-center flex flex-col justify-center items-center space-y-2">
              <p className="font-road-rage text-5xl">Techember Fest &quot;25</p>
              <p className="flex items-center gap-2 text-sm font-roboto">
                <span>📍</span> 04 Rumens road, Ikoyi, Lagos
              </p>
              <p className="flex items-center gap-2 text-sm font-roboto">
                <span>📅</span> March 15, 2025 | 7:00 PM
              </p>
            </div>

            <div className="mt-6 w-full">
              <div className="flex flex-col justify-center gap-4 items-center">
                <img
                  src={attendeeDetails.avatarUrl}
                  alt="user-img"
                  className="w-20 h-20  object-cover"
                />
                <div className="flex flex-col space-y-1 bg-[#08343C] text-sm border border-[#133D44] w-full p-2 font-roboto">
                  <div className="flex justify-between items-center border-b border-[#133D44] pb-2">
                    <p className="flex flex-col w-1/2 pr-2 border-r border-[#133D44]">
                      <span className="text-gray-500 text-[10px]">
                        Enter your name
                      </span>
                      <span className="font-bold text-xs break-words">
                        {attendeeDetails.fullName}
                      </span>
                    </p>
                    <p className="flex flex-col w-1/2 pl-2">
                      <span className="text-gray-500 text-[10px]">
                        Enter your email*
                      </span>
                      <span className="font-bold text-xs break-words">
                        {attendeeDetails.email}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-b border-[#133D44] pb-2">
                    <p className="flex flex-col w-1/2 pr-2 border-r border-[#133D44]">
                      <span className="text-gray-500 text-[10px]">
                        Ticket Type
                      </span>
                      <span className="text-[10px]">
                        {eventInfo.activeTicket.trim().toUpperCase()}
                      </span>
                    </p>
                    <p className="flex flex-col w-1/2 pl-2">
                      <span className="text-gray-500 text-[10px]">
                        Ticket For
                      </span>
                      <span className="text-[10px]">
                        {eventInfo.ticketCount}
                      </span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-[10px]">
                        Special request?
                      </span>
                      <span className="text-[10px] leading-relaxed max-h-[3.6em] overflow-hidden">
                        {attendeeDetails.request || "Nil"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img
            src="/barcode.png"
            alt="barcode"
            className="absolute bottom-8 w-48 h-auto"
          />
        </div>
      </div>
      <div className="flex space-x-5 justify-center items-center mt-5">
        <button
          className="border border-[#24A0B5] text-[#24A0B5] py-3 rounded-xl w-full cursor-pointer"
          onClick={() => setStep(1)}
        >
          Book Another Ticket
        </button>
        <button
          className="bg-[#24A0B5] py-3 rounded-xl w-full cursor-pointer"
          onClick={handleDownloadTicket}
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}

export default TicketReady;
