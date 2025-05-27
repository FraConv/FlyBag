import React from "react";
import { IonPage } from "@ionic/react";
import { useState } from "react";

const Notifiche: React.FC = () => {
    return(
        <IonPage className='bg-white'>
            <div className='w-8 h-[60px] border-2 border-transparent scale-[110%] rounded-full '><img src="Notifiche.svg" alt="" /></div>
        </IonPage>
    )
}

export default Notifiche;