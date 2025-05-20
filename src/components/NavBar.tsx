import { IonButton } from "@ionic/react";
import React from "react";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();

  // Funzione helper: restituisce l'icona giusta
  const getIconSrc = (page: string, icon: string, iconActive: string) => {
    return location.pathname === page ? iconActive : icon;
  };

  return (
      <div className="w-[250px] h-[50px] bg-white absolute bottom-[25px] left-1/2 -translate-x-1/2 rounded-full shadow-[0px_10px_35px_rgba(0,0,0,0.4)] flex justify-center items-center gap-[20px] z-10">
        {/* Analytics */}
        <IonButton
          style={{ "--box-shadow": "none" }}
          color="bianco"
          expand="block"
          shape="round"
          routerLink="/Analytics"
        >
          <div className="w-[100px] absolute ml-[73px]">
            <img
              src={getIconSrc("/Analytics", "Analytics.svg", "Analytics 2.svg")}
              alt="Analytics"
            />
          </div>
        </IonButton>

        {/* Scan */}
        <IonButton
          className="w-[65px] h-[65px] -mt-[50px] rounded-full shadow-[0px_10px_35px_rgba(0,0,0,0.2)]"
          color="guriguti"
          expand="block"
          shape="round"
          routerLink="/Scan"
        >
          <div className="scale-[280%]">
            <img
              src={ "Scan.svg"}
              alt="Scan"
            />
          </div>
        </IonButton>

        {/* Shop */}
        <IonButton
          style={{ "--box-shadow": "none" }}
          color="bianco"
          expand="block"
          shape="round"
          routerLink="/Shop"
        >
          <div className="w-[100px] ml-[73px] absolute">
            <img
              src={getIconSrc("/Shop", "shape.svg", "shape 2.svg")}
              alt="Shop"
            />
          </div>
        </IonButton>
      </div>
  );
};

export default NavBar;