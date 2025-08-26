import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonText, IonButton, useIonRouter } from '@ionic/react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { ChevronLeft } from 'lucide-react';

const QrScannerZxing: React.FC = () => {
  const [result, setResult] = useState<string>('Nessun risultato');
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();
  const [showManuaalCode, setShowManuaalCode] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useIonRouter();

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result: Result | undefined) => {
        if (result) {
          setResult(result.getText());
          codeReader.current?.reset();

          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
            // Salva il risultato in sessionStorage
            sessionStorage.setItem('qrResult', result.getText());
            // Naviga alla pagina del risultato
            router.push('/QrCodeResult');
          }, 2500);
        }
      });
    }

    return () => {
      codeReader.current?.reset();
    };
  }, [router]);

  return (
    <IonPage className="relative">
      {/* Video a schermo intero sotto */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />

      {/* Overlay sopra il video */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 min-h-screen gap-14 bg-black/50">
        {/* Immagine centrata e ridotta */}
        <img
          src="Scanqrcode.png"
          alt="Scan QR Code"
          className="w-72 h-auto sm:w-40 md:w-48"
        />

         <div className="absolute right-7 mt-10 top-[-30px]">
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[100%]" src="torcia.svg" alt="" />
          </div>
        </div>

          <div className="absolute left-7 mt-10 top-[-30px]"  onClick={() => setShow(true)}>
          <div className="w-[45px] h-[45px] mt-5 flex items-center justify-center text-white rounded-full shadow-md cursor-pointer">
            <img className="scale-[100%]" src="info.svg" alt="" />
          </div>
        </div>

         {show && (
        <div className="absolute  mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-5 z-10">
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
      )}

        {/* Testo descrittivo */}
        <IonText>
          <span style={{color:"white"}} className="text-white text-base sm:text-lg font-medium">
            Inquadra il QR code del negozio
          </span>
        </IonText>

        {/* Bottone */}
        <IonButton
          fill="clear"
          onClick={() =>setShowManuaalCode(true)}
          className="bg-[#212329] border-2 border-[#4D4F54] text-white rounded-full w-64 h-12 text-sm"
        >
          <div className="flex items-center justify-center gap-4">
            <img src="tastiera icon.svg" alt="Icona tastiera" className="w-5 h-5" />
            Inserisci codice
          </div>
        </IonButton>
      </div>

      {showManuaalCode &&(

        <div className='absolute top-0 left-0 w-full h-full bg-black/90 z-50 flex flex-col items-center justify-center px-6'>
         <IonText className="text-white text-xl mb-4">Inserisci il codice manualmente</IonText>
          <input
            type="text"
            placeholder="Codice..."
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="w-36 max-w-xs p-2 border-[#4D4F55] border-2 text-black rounded-full"
          />
           
          <IonButton onClick={() => setShowManuaalCode(false)} fill="clear" className="text-white mt-2 absolute top-7 left-4 scale-125">
            <ChevronLeft></ChevronLeft>
          </IonButton>
        </div>

      )}

    {isLoading && (
  <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-50 flex flex-col items-center justify-center">
    <div className="loader border-4 border-t-transparent border-[#00C493] rounded-full w-16 h-16 animate-spin"></div>
    <IonText className="text-white mt-4">Scansione in corso...</IonText>
    <p>Il negoziante sta scansionando i tuoi prodotti</p>
  </div>
)}


    </IonPage>
  );
};

export default QrScannerZxing;
