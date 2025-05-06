import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Icon = {
  On: string;
  Off: string;
  path: string;
};

const icons: Icon[] = [
    {
      On: "Analytics 2.svg",
      Off: "Analytics.svg",
      path: "/", // Home
    },
    {
      On: "Scan.svg",
      Off: "Analytics.svg",
      path: "/Scan", // Seconda icona (ma stessa route, forse da cambiare?)
    },
    {
      On: "shape 2.svg",
      Off: "shape.svg",
      path: "/Negozio",
    },
  ];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();



  const [SwitchImg, SetSwitchImg] = useState<number>(0);

  // Effetto per aggiornare l'icona attiva in base alla route attuale
  useEffect(() => {
    const currentIndex = icons.findIndex(icon => icon.path === location.pathname);
    if (currentIndex !== -1) {
      SetSwitchImg(currentIndex);
    }
  }, [location.pathname]);

  const handleClick = (index: number, path: string) => {
    SetSwitchImg(index);
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 fixed items-center w-[250px] h-[47px] top-[90%] -translate-x-1/2 left-1/2 shadow-black z-10">
      <nav className="grid grid-cols-3 gap-[-10px] h-[47px] rounded-full bg-white place-items-center shadow-black shadow-[0_5px_15px_rgba(0,0,0,0)]">
        {icons.map((icon, index) =>
          index === 1 ? (
            <div
              key={index}
              onClick={() => handleClick(index, icon.path)}
              className={`shadow-black shadow-[0_1px_8px_rgba(0,0,0,0)] h-[60px] mt-[-50px] w-[60px] rounded-full ${
                SwitchImg === index
                  ? "bg-white border-[3px] border-[#00C493]"
                  : "bg-[#00C493] border-[3px] border-[#00C493]"
              }`}
            >
              <img
                className="mt-[10px] ml-[9.8px]"
                src={SwitchImg === index ? icon.On : icon.On}
                alt={`Icon ${index}`}
              />
            </div>
          ) : (
            <div
              key={index}
              onClick={() => handleClick(index, icon.path)}
              className="border-2 border-transparent h-[45px] mt-[6px] ml-[16px] w-[45px] rounded-full bg-transparent"
            >
              <img
                src={SwitchImg === index ? icon.On : icon.Off}
                alt={`Icon ${index}`}
              />
            </div>
          )
        )}
      </nav>
    </div>
  );
}

export default NavBar;
