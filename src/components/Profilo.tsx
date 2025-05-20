import { IonButton } from "@ionic/react";
import React from "react";
import { useState } from "react";


const Profilo: React.FC = () => {
  const [profiloOptions, setProfiloOptions] = useState<boolean>(true);

  const handleClick = () => {
    setProfiloOptions((prev) => !prev);
  };


    return(
          <>   
            <div className='w-9 border-2 border-transparent rounded-full absolute scale-[110%] right-[2rem] top-[3.9rem]' onClick={handleClick}>
              <img src="Utente.svg" alt="soksoskos" />
            </div>

            <div>
              <div className={`bg-white top-0 absolute left-0 w-[100%] h-[100%] z-20 transition-transform duration-500 ${profiloOptions ? "translate-y-[-70rem]" : "translate-y-0" }`}>
                <div className='w-9 border-2 border-transparent rounded-full absolute scale-[110%] left-[2rem] top-[3.9rem]' onClick={handleClick}>
                  <img src="icon (6).svg" alt="soksoskos" />
                </div>
                <div className="flex justify-center scale-[280%] top-[5.9rem] left-1/2 -translate-x-1/2 absolute">
                  <img src="Utente.svg" alt="" />
                </div>

                <div className="flex justify-center flex-col-reverse gap-10 absolute left-1/2 -translate-1/2 bottom-0">
                  <div><IonButton className="w-52 bg-[#00C493] rounded-full text-[#005D46] font-bold"  fill="clear">Delete account</IonButton></div>
                  <div><IonButton className="w-52 bg-[#00C493] rounded-full text-[#005D46] font-bold"  fill="clear">Log Out</IonButton></div>
                </div>
              </div>
            </div>
          </>
    )
}

export default Profilo;