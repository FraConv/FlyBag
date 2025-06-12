import { IonButton, IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

type filtroTipo = "Tutte" | "Nuove" | "Vecchie" | "Voto alto" | "Voto basso" | "Voto medio";

const Recensioni: React.FC = () => {
  const history = useHistory();
  const [filtro, setFiltro] = useState<filtroTipo>("Tutte");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [risposte, setRisposte] = useState<{ [key: number]: string }>({});
  const [rispostaInCorso, setRispostaInCorso] = useState<{ [key: number]: string }>({});
  const [inputVisibili, setInputVisibili] = useState<{ [key: number]: boolean }>({});

  const recensioni = [
    { id: 1, imgprofilo: "Commentatore.svg", nome: "Anna Pia", commento: "Ottimo prodotto", data: "2024-06-01", voto: 4 },
    { id: 2, imgprofilo: "Commentatore.svg", nome: "Rocco Siffredi", commento: "Si vede che avete lavorato DURAMENTE per questo prodotto ;)", data: "2025-02-10", voto: 4 },
    { id: 3, imgprofilo: "Commentatore.svg", nome: "Maurizio Merluzzo", commento: "Tutto bello ma...non si puo doppiare!!", data: "2024-11-22", voto: 3 },
    { id: 4, imgprofilo: "Commentatore.svg", nome: "Luca De Giglio", commento: "Il servizio funziona, ma alcuni oggetti erano rotti.", data: "2025-03-28", voto: 3 },
    { id: 5, imgprofilo: "Commentatore.svg", nome: "Gilda Esposito", commento: "Ottimo servizio", data: "2024-12-29", voto: 4 },
    { id: 6, imgprofilo: "Commentatore.svg", nome: "Edoardo Grosso", commento: "FlyBag è LA VITA", data: "2024-12-29", voto: 5 },
    { id: 7, imgprofilo: "Commentatore.svg", nome: "Nunzio Bho", commento: "Prodotto scadente.", data: "2024-12-29", voto: 1 },
  ];

  const totaleVoti = recensioni.reduce((acc, r) => acc + r.voto, 0);
  const mediaVoti = (totaleVoti / recensioni.length).toFixed(1);

  const filtraCommenti = () => {
    let filtrati = [...recensioni];
    switch (filtro) {
      case "Nuove":
        filtrati.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        break;
      case "Vecchie":
        filtrati.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
        break;
      case "Voto alto":
        filtrati = filtrati.filter(r => r.voto >= 4).sort((a, b) => b.voto - a.voto);
        break;
      case "Voto basso":
        filtrati = filtrati.filter(r => r.voto <= 2).sort((a, b) => a.voto - b.voto);
        break;
      case "Voto medio":
        filtrati = filtrati.filter(r => r.voto === 3);
        break;
    }
    return filtrati;
  };

  const opzioneFiltro: { nome: string; valore: filtroTipo }[] = [
    { nome: "Tutte", valore: "Tutte" },
    { nome: "Nuove", valore: "Nuove" },
    { nome: "Vecchie", valore: "Vecchie" },
    { nome: "Voto alto", valore: "Voto alto" },
    { nome: "Voto basso", valore: "Voto basso" },
    { nome: "Voto medio", valore: "Voto medio" },
  ];

  return (
    <IonPage className="bg-white">
      <IonContent className="bg-white" fullscreen>
        <div className="px-[1.9rem] pt-14 flex flex-row gap-5 items-center mt-[1rem]">
          <IonButton className="rounded-full p-0" fill="clear" onClick={() => history.push('/Analytics')}>
            <img src="icon (6).svg" alt="" />
          </IonButton>
          <span style={{ color: "black" }} className="font-bold text-[20px]">Recensioni</span>
        </div>

        <div className="px-[1.9rem] mt-8">
          {/* Media Voti */}
          <div className="bg-[#f3f3f3] w-full py-6 px-6 mb-[-7rem] rounded-3xl">
            <div className="flex flex-row justify-between items-start gap-6">
              <div className="flex flex-col items-center min-w-[6rem] mt-6">
                <p className="text-black text-3xl font-bold mb-1">{mediaVoti}</p>
                <div className="flex gap-[2px] mb-1">
                  {Array.from({ length: Math.round(Number(mediaVoti)) }, (_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{totaleVoti} voti totali</p>
              </div>

              <div className="flex flex-col flex-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const star = 5 - i;
                  const count = recensioni.filter(r => r.voto === star).length;
                  const percent = (count / recensioni.length) * 100;
                  const barColor = star >= 4 ? "bg-[#00C493]" : star === 3 ? "bg-yellow-400" : "bg-red-400";

                  return (
                    <div key={star} className="flex items-center gap-2 mb-2">
                      <span style={{ color: "black" }} className="w-[3.5rem] text-sm">{star}</span>
                      <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                      </div>
                      <span style={{ color: "black" }} className="w-6 text-sm text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filtro */}
          <IonButton fill="clear" className="bg-white w-[auto] h-[3rem] grid-rows-3 border-[2px] border-[#E5E7EB] mb-[-17rem] rounded-[13px] mt-6" onClick={() => setMenuOpen(prev => !prev)}>
            <div className="flex flex-row gap-2 justify-center items-center">
              <span style={{ color: "black" }} className="font-medium text-[18px]">{filtro}</span>
              <img className={`w-4 transition-all duration-100 ${menuOpen ? "rotate-180" : "rotate-0"}`} src="Arrow giu.svg" alt="" />
            </div>
          </IonButton>

          {/* Menu Filtro */}
          <div className={`bg-white w-[45%] mt-[12rem] absolute shadow-[0px_1px_10px_rgba(0,0,0,0.4)] rounded-3xl transition-opacity duration-100 z-20 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            {opzioneFiltro.map(opzione => (
              <div key={opzione.valore} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[14px]" onClick={() => { setFiltro(opzione.valore); setMenuOpen(false); }}>
                {opzione.nome}
              </div>
            ))}
          </div>

          {/* Commenti */}
          <div className="bg-[#f3f3f3] mt-48 rounded-3xl p-4 flex flex-col items-center pb-8 mb-[1.9rem]">
            {filtraCommenti().map(recensione => (
              <div key={recensione.id} className="bg-[#f3f3f3] w-full p-4 mb-4 border-b border-b-[#9faec0] flex flex-col gap-2">
                <div className="flex gap-4">
                  <img src={recensione.imgprofilo} alt={`Profilo di ${recensione.nome}`} className="w-9 h-9 border-2 border-black rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-black font-medium">{recensione.nome}</p>
                      <p className="text-gray-400 text-sm">{recensione.data}</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">⭐ {recensione.voto}</p>
                    <p className="text-black mt-2">{recensione.commento}</p>
                  </div>
                </div>

               {!risposte[recensione.id] && (
                <IonButton
                  fill="clear"
                  size="small"
                  className="text-[#40A48C] border-2 rounded-full font-semibold text-[12px] border-[#40A48C] -ml-2 w-20"
                  onClick={() => setInputVisibili(prev => ({ ...prev, [recensione.id]: !prev[recensione.id] }))}
                >
                  <span style={{ color: "#40A48C" }}>Rispondi</span>
                </IonButton>
              )}


                <div
                  className={`ml-12 flex flex-col gap-2 transition-opacity duration-300 ease-in-out ${inputVisibili[recensione.id] ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                >
                  <textarea
                    className="border rounded-md p-2 w-full text-black"
                    placeholder="Scrivi una risposta..."
                    value={rispostaInCorso[recensione.id] || ""}
                    onChange={(e) =>
                      setRispostaInCorso(prev => ({ ...prev, [recensione.id]: e.target.value }))
                    }
                  />
                  <div className="flex gap-2">
                      <IonButton
                      className='border-2 border-red-500 rounded-md text-black'
                      fill='clear'
                      size="small"
                      onClick={() => {
                        setInputVisibili(prev => ({ ...prev, [recensione.id]: false }));
                        setRispostaInCorso(prev => ({ ...prev, [recensione.id]: "" }));
                      }}
                    >
                      Annulla
                    </IonButton>
                    <IonButton
                      size="small"
                      onClick={() => {
                        setRisposte(prev => ({ ...prev, [recensione.id]: rispostaInCorso[recensione.id] || "" }));
                        setInputVisibili(prev => ({ ...prev, [recensione.id]: false }));
                        setRispostaInCorso(prev => ({ ...prev, [recensione.id]: "" }));
                      }}
                    >
                      Invia risposta
                    </IonButton>
                  </div>
                </div>

                {risposte[recensione.id] && (
                  <div className="ml-12 mt-2 p-3 border-2 text-black rounded-md text-sm">
                    <p className="font-semibold text-[blue-600]">La tua risposta:</p>
                    <p>{risposte[recensione.id]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Recensioni;
