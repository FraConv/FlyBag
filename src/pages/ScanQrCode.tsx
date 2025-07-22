import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonText, IonButton } from '@ionic/react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { ChevronLeft } from 'lucide-react';

const QrScannerZxing: React.FC = () => {
  const [result, setResult] = useState<string>('Nessun risultato');
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();
  const [showManuaalCode, setShowManuaalCode] = useState(false)
  const [manualCode, setManualCode] = useState('');

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result: Result | undefined, err) => {
        if (result) {
          setResult(result.getText());
          codeReader.current?.reset();
        }
      });
    }

    return () => {
      codeReader.current?.reset();
    };
  }, []);

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

      {/* Risultato */}
      <div className="absolute bottom-6 left-0 right-0 z-30 text-center">
        <IonText>
          <h2 className="text-amber-400 font-bold text-lg drop-shadow">Risultato:</h2>
          <p className="text-amber-300 text-base drop-shadow">{result}</p>
        </IonText>
      </div>
    </IonPage>
  );
};

export default QrScannerZxing;
