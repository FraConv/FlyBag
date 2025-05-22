import { IonPage } from "@ionic/react";
import React from "react"
import "./Login.css"
import logo from "./logo.svg"

const Login: React.FC = () => {
    return (
        <IonPage id="main">
           <img src={logo} alt="Nope" />
           <h1>Benvenuto in <span>Flybag</span></h1>
           <p>Let me penetrate you</p>
        </IonPage>
    );
}

export default Login;