import React from "react";

const Navbar = () => {
  const buttons = ["about", "schedule", "login"];
  return (
    <nav className="fixed top-0 left-0 z-10 w-full flex items-center justify-between px-10 py-4">
      {/* Left logo */}
      <div className="flex-shrink-0">
        <img className="rounded-full size-20" src="/logo.jpg" width={100} height={100} alt="ojus logo" />
      </div>

      {/* Center buttons */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-full flex">
        {buttons.map((item, index) => (
          <button key={index} className="capitalize px-5 py-3">
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
