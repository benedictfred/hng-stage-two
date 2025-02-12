function Navbar() {
  return (
    <nav className="flex w-full justify-between items-center border border-[#197686] py-2 px-2 mx-auto max-w-5xl mt-8 rounded-2xl">
      <div>
        <img src="/header-name.svg" alt="name" />
      </div>
      <div>
        <ul className="flex justify-center items-center space-x-3 *:hover:text-white cursor-pointer">
          <li className="text-gray-100">Events</li>
          <li className="text-gray-400">My Tickets</li>
          <li className="text-gray-400">About Projects</li>
        </ul>
      </div>
      <div>
        <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-[#197686]/80 transition-colors hover:text-white cursor-pointer">
          <span>My Tickets</span>
          <span className="text-lg">&rarr;</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
