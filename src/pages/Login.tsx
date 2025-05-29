import { IonBackButton, IonButton, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons"
import React from "react"
import "./Login.css"
import { useHistory } from "react-router";

const Login: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage id="login-login">
            <div id="login-header">
                <h1>Log into account</h1>
                <IonButton shape="round" fill="clear" onClick={() => {
                    history.goBack();
                }}>
                    <IonIcon icon={arrowBack} slot="icon-only" color="dark" size="large" ></IonIcon>
                </IonButton>
                
            </div>
        </IonPage>
    );
}

export default Login;