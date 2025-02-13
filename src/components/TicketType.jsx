function TicketType({ name, price, isActive, onClick }) {
  return (
    <div
      className={`flex flex-col space-x-5 border-2 border-[#197686] max-w-96 px-3 py-2 rounded-lg cursor-pointer w-full hover:bg-[#197686] ${
        isActive ? "bg-[#197686]" : ""
      }`}
      onClick={onClick}
    >
      <p className="text-2xl font-semibold">{price}</p>
      <p className="mt-2">{name}</p>
      <p>20/52</p>
    </div>
  );
}

export default TicketType;
