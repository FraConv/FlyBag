import {IonButton,IonPage,IonIcon} from "@ionic/react";
import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router";
import { arrowBack } from "ionicons/icons"

const InputLogin: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genericError, setGenericError] = useState("");

  const handleSubmit = () => {
    let valid = true;
    setGenericError(""); // Resetta eventuale errore generico

    // Validazione email
    if (email.trim() === "") {
      setEmailError("Inserisci l'email.");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validazione password
    if (password.trim() === "") {
      setPasswordError("Inserisci la password.");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Se i campi sono compilati ma errati
    if (valid) {
      const emailCorretta = "test@email.com";
      const passwordCorretta = "password123";

      if (email !== emailCorretta || password !== passwordCorretta) {
        setGenericError("Login negato, email o password sono sbagliate.");
      } else {
        setGenericError("");
        console.log("Login eseguito");
        // TODO: procedere con il login reale
      }
    }
  };

  return (
    <IonPage className="bg-white">
     <div id="login-header">
        <h1>Log into account</h1>
            <IonButton shape="round" fill="clear" 
                onClick={() => {
                    history.goBack();
            }}>
                    <IonIcon icon={arrowBack} slot="icon-only" color="dark" size="large" ></IonIcon>
            </IonButton>
    </div>

      <div id="Inputlogin-buttons" className="flex flex-col justify-between items-start absolute left-1/2 -translate-x-1/2 top-32 gap-2 text-black">
        <span style={{color:"black"}} className="font-light">Email</span>
        <input className="border-2 rounded-xl text-black w-72 h-10 pl-2"type="text"placeholder="example@example.com"value={email}
            onChange={
                (e) => setEmail(e.target.value)
            }/>
        
        {emailError && 
            <p className="text-red-500 text-sm">{emailError}</p>
        }

        <span style={{color:"black"}} className="font-light mt-2">Password</span>
        <input className="border-2 rounded-xl text-black w-72 h-10 pl-2"type="password"placeholder="Enter password"value={password}
            onChange={
                (e) => setPassword(e.target.value)
            }/>
        
        {passwordError && 
            <p className="text-red-500 text-sm">{passwordError}</p>
        }

        {genericError && 
          <p className="text-red-600 text-sm mt-2">{genericError}</p>
        }

        <IonButton className="mt-4 w-72" shape="round" onClick={handleSubmit}>Accedi</IonButton>
        <br />
        <p className="text-black text-center ml-20" >Forgot password?</p>
    </div>

    <div className="absolute bottom-10"> 
         <p className="text-black text-center px-10" >By using FlyBag, you agree to the Terms and Privacy Policy.</p>
     </div> 
    </IonPage>
  );
};

export default InputLogin;
