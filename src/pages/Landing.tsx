import { IonButton, IonPage, IonRouterLink } from "@ionic/react";
import React from "react"
import "./Landing.css"
import logo from "/logo_no_text.svg"

const Landing: React.FC = () => {
    return (
        <IonPage id="main">
            <img src={logo} alt="Nope" />
            <div>
                <h1>Benvenuto in <span>Flybag</span></h1>
                <p>Let me penetrate you</p>
                <IonButton color="primary" shape="round" id="button" routerLink="/analytics">Create An Account</IonButton>
                <p id="plogin">Already have an account? <IonRouterLink color={"medium"} routerLink="/login">Login</IonRouterLink> </p>
            </div>
        </IonPage>
    );
}

export default Landing;