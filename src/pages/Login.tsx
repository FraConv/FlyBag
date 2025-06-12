import { IonBackButton, IonButton, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons"
import React from "react"
import "./Login.css"
import { useHistory } from "react-router";


const Login: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage className="bg-white" id="login-login">
            <div id="login-header">
                <h1>Log into account</h1>
                <IonButton shape="round" fill="clear" onClick={() => {
                    history.goBack();
                }}>
                    <IonIcon icon={arrowBack} slot="icon-only" color="dark" size="large" ></IonIcon>
                </IonButton>

                <p className="relative top-[7rem] text-black">Welcome back!</p>   
            </div>

            <div id="login-button" className="flex justify-center items-center relative top-[-16rem] min-[380px]:top-[-26rem] min-[400px]:top-[-30rem] flex-col gap-3">
                <IonButton className="w-80" shape="round" onClick={
                    // TODO: Implementare login con email
                    () => {console.log("Enter with email")}
                    }>
                        <span style={{color:"black"}} className="ml-2">Continue with Email</span>
                </IonButton>
                <p className="text-black">or</p>
                <IonButton className="w-80 border-2 rounded-full text-black" fill="clear" shape="round"onClick={
                     // TODO: Implementare login con Apple
                    () => {console.log("Enter with Apple")}
                    }>
                        <img src="Apple icon.svg" alt="" />
                            <span style={{color:"black"}} className="ml-2">Continue with Apple</span>
                </IonButton>
                <IonButton className="w-80 border-2 rounded-full text-black" fill="clear" shape="round" onClick={
                    // TODO: Implementare login con Facebook
                    () => {console.log("Enter with Facebook")}
                    }> 
                        <img src="Facebook icon.svg" alt="" />
                            <span style={{color:"black"}} className="ml-2">Continue with Facebook</span>
                </IonButton>
                <IonButton className="w-80 border-2 rounded-full text-black" fill="clear" shape="round" onClick={
                    // TODO: Implementare login con Google
                    () => {console.log("Enter with Google")}
                    }> 
                        <img src="Google icon.svg" alt="" />
                            <span style={{color:"black"}} className="ml-2">Continue with Google</span>
                </IonButton>

            </div>

            <div className="absolute bottom-10"> 
                <p className="text-black text-center px-10" >By using FlyBag, you agree to the Terms and Privacy Policy.</p>
            </div> 
        </IonPage>
    );
}

export default Login;