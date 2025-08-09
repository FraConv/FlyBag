import React, { useState } from "react";
import { ChevronLeft, Bell } from "lucide-react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
} from "@ionic/react";

const notifications = [
  {
    id: 1,
    type: "Ordini",
    icon: "Notifiche_ordini_icon.svg",
    text: "Nuovo ordine per Tazza Turistica",
    date: "11/5, 14:30",
  },
  {
    id: 2,
    type: "Recensioni",
    icon: "Notifiche_recensione_icon.svg",
    text: "Nuova recensione da Marco Rossi",
    date: "11/5, 14:30",
  },
  {
    id: 3,
    type: "Ritiri",
    icon: "Notifiche_ritiro_icon.svg",
    text: "Ritiro programmato per Tazza Turistica",
    date: "11/5, 14:30",
  },
  {
    id: 4,
    type: "Problemi",
    icon: "Notifiche_problemi_icon.svg",
    text: "Problema con spedizione Calamita X",
    date: "11/5, 14:30",
  },
];

const tabs = ["Tutte", "Ordini", "Recensioni", "Ritiri", "Problemi"];

const Notifications: React.FC = () => {
  const navigate = useHistory();
  const [selectedTab, setSelectedTab] = useState("Tutte");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const filteredNotifications =
    selectedTab === "Tutte"
      ? notifications
      : notifications.filter((n) => n.type === selectedTab);

  return (
    <> 
      {/* Header */}
      <div className="flex justify-between items-center px-6 mt-[3rem] ">
    

        {/* Campanella con badge */}
        <div className="absolute right-24 top-[4.3rem] " onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <button>
            <Bell className="text-black w-6 h-6" />
          </button>
          {notifications.length > 0 && (
            <p 
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </p>
          )}
        </div>
      </div>

      {/* Contenuto notifiche (solo se aperto) */}
      {isNotificationOpen && (
        <IonContent className="pt-2  bg-white top-0 absolute left-0 z-50">
              <div className="flex flex-row gap-4 items-center mt-12 ml-4 ">
          <ChevronLeft
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="scale-[120%] text-black"
          />
          <span style={{color: "black"}} className="font-bold text-xl text-black">Notifiche</span>
        </div>
          <div className="mb-4 mt-9 px-4 ">
  <div className="flex flex-wrap gap-5 bg-[#EEF3F4] rounded-md p-2 justify-center md:justify-between">
    {tabs.map((tab) => (
      <button
      style={{borderRadius: 5}}
        key={tab}
        onClick={() => setSelectedTab(tab)}
        className={`px-4 h-8 flex items-center justify-center text-sm rounded-full transition-colors duration-200 ${
          selectedTab === tab
            ? "bg-white font-medium text-black shadow-sm"
            : "bg-transparent text-[#64748B]"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>
         

          {/* Lista notifiche */}
          <div className="max-w-md mx-auto px-4 space-y-3 ">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#DEF7F1] shadow-sm"
              >
                <div className="text-xl">
                  <img
                    src={n.icon}
                    alt={n.type}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-gray-400">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </IonContent>
      )}
    </>
  );
};

export default Notifications;
