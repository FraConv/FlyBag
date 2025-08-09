import { IonButton, IonPage } from "@ionic/react"
import { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router";
import { ChevronLeft } from "lucide-react";
import { closeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Scan: React.FC = () => {

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const StreamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(false);

  const toggleNotice = () => {
    setShowNotice(prev => !prev);
  };

  const refuseCancel = () => {
    setFade(false); // fade-out
    setTimeout(() => setShowNotice(false), 300);
  };

  const cancelPhoto = () => {
    setPhoto(null);
    setShowNotice(false);
  };

  useEffect(() => {
    if (showNotice) {
      setFade(true); // fade-in
    } else {
      setFade(false); // fade-out
      const timeout = setTimeout(() => {
        setShowNotice(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [showNotice]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          StreamRef.current = mediaStream;
        }
      } catch (err) {
        console.error("Errore nell'accesso alla webcam:", err);
      }
    };

    startCamera();

    return () => {
      StreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setPhoto(imageData);
      }
    }
  };

  return (
    <IonPage className='bg-white'>
      <button onClick={goBack} className=" text-white px-3 py-1 rounded-full w-5 shadow z-10 top-16 left-5 absolute">
  <ChevronLeft className="z-10"/>
</button>
      <div className="bg-white h-full w-full absolute left-0 top-0 items-center">
      <div className="absolute top-16 w-full h-auto -translate-x-1/2 left-1/2 text-white flex justify-center">
        <span style={{color:"white"}} className="text-shadow-lg font-medium">Take a photo of the product</span>
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full object-cover h-[100vh] top-0"
      />

      <div className="flex flex-col items-center mt-[-40%] gap-4">
        <div
          onClick={takePhoto}
          className="w-[70px] h-[70px] flex items-center justify-center border-5 border-[#005640] bg-[#00C493] text-white rounded-full shadow-md cursor-pointer"
        >
          <img src="Icon camera.svg" className="scale-[125%]" alt="" />
        </div>

        <div className="absolute left-7 mt-10 top-12"  onClick={() => setShow(true)}>
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[100%]" src="info.svg" alt="" />
          </div>
        </div>

        <div className="absolute left-7 mt-10">
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center border-3 border-[#00C493] bg-white text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[55%]" src="Group 105 (1).svg" alt="" />
          </div>
        </div>

        <div className="absolute right-7 mt-10">
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center border-3 border-[#00C493] bg-white text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[60%]" src="Group 103 (3).svg" alt="" />
          </div>
        </div>

        <div className="absolute right-7 mt-10 top-12">
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center border-3 border-[#00C493] bg-white text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[100%]" src="flash 2.svg" alt="" />
          </div>
        </div>
      </div>

      {show && (
        <div className="flex justify-center items-center ">
              <div className="absolute  top-48 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-5 z-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <h3 className="text-base font-semibold text-black">Come funziona?</h3>
             
                </div>
      
                {/* Istruzioni */}
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    Trova il QR code del negozio
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    Inquadra con la fotocamera
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    Aggiungi i prodotti scelti
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    Inserisci le informazioni necessarie
                  </li>
                </ol>
      
                {/* Bottone */}
                <IonButton
                  size='default'
                  shape='round'
                  onClick={() => setShow(false)}
                  className="mt-4 w-full  text-white font-semibold py-2 rounded-full transition"
                >
                  Ho capito
                </IonButton>
              </div>
              </div>
            )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {photo && (
        <div>
          <div
            className="w-[30px] h-[30px] flex justify-center rounded-full right-7 bg-white top-24 fixed z-20 items-center  cursor-pointer"
            onClick={toggleNotice}
          >
            <IonIcon className="text-black size-64" icon={closeOutline} slot="icon-only" />
          </div>
          <img
            src={photo}
            alt="Foto scattata"
            className="fixed top-0 h-full left-0 w-screen object-cover z-11"
          />
        </div>
      )}

      {showNotice && (
        <div
          className={`fixed z-20 bg-white w-72 h-32 top-32 rounded-2xl text-black text-[13px] p-5 -translate-x-1/2 left-1/2 transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          <span style={{color:"black"}} className="text-[18px] font-normal text-center">Cancellare la foto scattata?</span>
          <IonButton fill="clear"
            className="rounded-full w-24 h-1 bg-red-800 border-3 border-red-800 fixed left-5 text-white top-20 text-[12px] cursor-pointer"
            onClick={cancelPhoto}
          >
            <span style={{color:"white"}} className="text-[18px] font-medium mt-[-6px]">Si</span>
          </IonButton>
          <IonButton fill="clear"
            className="rounded-full w-24 h-1 border-[3px] border-black fixed right-5 top-20 text-[12px] cursor-pointer"
            onClick={refuseCancel}
          >
            <span style={{color:"black"}} className="text-[18px] font-medium mt-[-6px]">No</span>
          </IonButton>
        </div>
      )}
    </div>
    </IonPage>
  )
}

export default Scan;