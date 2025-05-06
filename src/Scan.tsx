import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";

const WebcamViewer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const StreamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [fade, setFade] = useState(false);


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
        // dopo la durata della transizione, smonta il div
        setShowNotice(false);
      }, 300);
      return () => clearTimeout(timeout); // pulizia se cambia velocemente
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
    <>
      <div className="bg-white h-[100%] w-[100%] absolute left-0 top-0 items-center ">
        <div className="absolute top-16 w-[100%] h-auto -translate-x-1/2 left-1/2 text-white place-items-center">
          <span className="text-border-2 border-black text-shadow-lg">Take a photo of the product</span>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full object-cover h-[100vh] top-0 "
        />

      

        {/* Bottone per scattare la foto */}
        <div className="flex flex-col items-center mt-[-230px] gap-4 ">
          <button
            onClick={takePhoto}
            disabled={!!photo}
            className="w-[75px]  max-[375px]:scale-[75%] max-[375px]:mt-[20px] h-[75px] flex items-center justify-center border-[5px] border-[#005640] bg-[#00C493] text-white rounded-full shadow-md"
          >
            <img src="Icon camera.svg" className="scale-[138%]" alt=""/>
          </button>

          <div className="absolute left-7 mt-10 ">
          <button className="w-[50px]  max-[375px]:scale-[75%] max-[375px]:mt-[20px] h-[50px] mt-5 flex items-center justify-center border-[3px] border-[#00C493] bg-white text-white rounded-full shadow-md">
            <img className="scale-[400%]" src="Group 105 (1).svg" alt="" />
          </button>
        </div>

        <div className="absolute right-7 mt-10">
          <button className="w-[50px]  max-[375px]:scale-[75%] max-[375px]:mt-[20px] h-[50px] mt-5 flex items-center justify-center border-[3px] border-[#00C493] bg-white text-white rounded-full shadow-md">
            <img className="scale-[450%]" src="Group 103 (3).svg" alt="" />
          </button>
        </div>

        <div className="absolute right-7 mt-10 top-12">
          <button className="w-[50px]  max-[375px]:scale-[75%] max-[375px]:mt-[20px] h-[50px] mt-5 flex items-center justify-center border-[3px] border-[#00C493] bg-white text-white rounded-full shadow-md">
            <img className="scale-[390%]" src="flash.png" alt="" />
          </button>
        </div>


        </div>

     

        {/* Canvas invisibile per cattura */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Mostra la foto se presente */}
        {photo && (
          <div className="">
            <div className="w-[30px] h-[30px] flex justify-center rounded-full bg-white mt-[-630px] fixed z-20 items-center ml-7" onClick={toggleNotice}><img className="scale-100" src="icon (6).svg" alt="" /></div>
            <img src={photo} alt="Foto scattata" className="fixed top-[0] h-[100vh] left-0 w-screen object-cover z-[11]" />
           
          </div>
        )}

        
          <div>
        {showNotice && (
          <div className={`fixed z-20 bg-[#EDF0F7] w-64 h-32 top-32  rounded-2xl text-black text-[13px] px-3 py-2 -translate-x-1/2 left-1/2 transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}>
            <span>Cancellare la foto scattata?</span>
              <div className="rounded-full w-20 h-auto bg-red-800 border-[3px] border-red-800 fixed left-5 text-white top-20 text-[13px]" onClick={cancelPhoto} ><span>Si</span></div>
             <div className="rounded-full w-20 h-auto border-[3px] border-black fixed right-5 text-black top-20  text-[13px]" onClick={refuseCancel}><span>No</span></div>
          </div>
           )}
          </div>
       

        <NavBar />
      </div>
    </>
  );
};

export default WebcamViewer;
