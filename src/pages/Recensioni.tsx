import { IonButton, IonPage, IonContent} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

type filtroTipo= "Tutte" | "Nuove" | "Vecchie" | "Voto alto" | "Voto basso" | "Voto medio"

const Recensioni: React.FC = () => {
    const history = useHistory();
    const[filtro, setFiltro] = useState<filtroTipo>("Tutte");
    const[menuOpen, setMenuOpen] = useState<boolean>(false)

    const recensioni = [
        {id: 1, imgprofilo: "Commentatore.svg", nome: "Anna Pia", commento: "Si vede che avete lavorato ", data: "2024-06-01", voto: 4},
        {id: 2, imgprofilo: "Commentatore.svg", nome: "Rocco Siffredi", commento: "Si vede che avete lavorato DURAMENTE per questo prodotto ;)", data: "2025-02-10", voto: 4},
        {id: 3, imgprofilo: "Commentatore.svg", nome: "Maurizio Merluzzo", commento: "Tutto bello ma...non si puo doppiare!!", data: "2024-11-22", voto: 3},
        {id: 4, imgprofilo: "Commentatore.svg", nome: "Luca De Giglio", commento: "Il servizio effettivamenete funziona, il pacco e anche arrivato puntuale...peccato pero che alcuni degli oggetti all'interno si sono rotti. Da migliorare il trasporto", data: "2025-03-28", voto: 3},
        {id: 5, imgprofilo: "Commentatore.svg", nome: "Gilda Esposito", commento: "Ottimo servizio, e arrivato prima del capodanno Napoletano quindi il pacco e arrivato integro e puntuale", data: "2024-12-29", voto: 4},
        {id: 6, imgprofilo: "Commentatore.svg", nome: "Edoardo Grosso", commento: "FlyBag e LA VITA, l'ho usero molto spesso quando viaggero", data: "2024-12-29", voto: 5},
        {id: 7, imgprofilo: "Commentatore.svg", nome: "Stronzo Bastardo", commento: "FlyBag e LA VITA, l'ho usero molto spesso quando viaggero", data: "2024-12-29", voto: 1},
    ]

      const totaleVoti = recensioni.reduce((acc, r) => acc + r.voto, 0);
      const mediaVoti = (totaleVoti / recensioni.length).toFixed(1);

    const filtraCommenti = () => {
        let filtrati = [...recensioni];
        switch (filtro) {
            case "Nuove":
                filtrati.sort((a,b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                break;
            case "Vecchie":
                filtrati.sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime());
                break;
            case "Voto alto":
              filtrati = filtrati.filter(r => r.voto >= 4);
                filtrati.sort((a,b) => b.voto  - a.voto);
                break;
            case "Voto basso":
              filtrati = filtrati.filter(r => r.voto <= 2);
                filtrati.sort((a,b) => a.voto - b.voto);
                break;
            case "Voto medio":
              filtrati = filtrati.filter(r => r.voto === 3);
                filtrati.sort((a,b) => a.voto - b.voto);
                break;
            default:
                break;
        }
        return filtrati;
    }

    const opzioneFiltro: {nome:string; valore:filtroTipo} [] = [
        {nome: "Tutte", valore: "Tutte"},
        {nome: "Nuove", valore: "Nuove"},
        {nome: "Vecchie", valore: "Vecchie"},
        {nome: "Voto alto", valore: "Voto alto"},
        {nome: "Voto basso", valore: "Voto basso"},
        {nome: "Voto medio", valore: "Voto medio"},
    ]


    return(
        
       <IonPage className="bg-white">
        <IonContent className="bg-white" fullscreen>
          <div className="px-[1.9rem] pt-14 flex flex-row gap-5 items-center mt-[1rem]">
            <IonButton className="rounded-full p-0" fill="clear" onClick={() => history.push('/Analytics')}>
              <img src="icon (6).svg" alt="" />
            </IonButton>
              <span style={{ color: "black" }} className="font-bold text-[20px]">Recensioni</span>
          </div>

          <div className="px-[1.9rem]  mt-8">
            <div className="bg-[#f3f3f3] w-full h-[15rem] flex justify-center items-center mb-[-7rem] rounded-3xl">
              <div className="w-full mb-6 text-center">
                <p className="text-black text-lg font-semibold">⭐ {mediaVoti}</p>
                <p className="text-gray-500 text-sm">{totaleVoti} recensioni</p>
              </div>
            </div>

            <IonButton fill="clear" className="bg-white w-[auto] h-[3rem] border-2 border-[#00C493] mb-[-17rem] rounded-full mt-6" onClick={() => setMenuOpen(prev => !prev)}>
              <div className="flex flex-row gap-2 justify-center items-center">
                <span style={{ color: "black" }} className="font-medium text-[18px]">{filtro}</span>
                  <img className={`w-4 transition-all duration-100 ${menuOpen ? "rotate-180" : "rotate-0"}`} src="Arrow giu.svg" alt=""/>
              </div>
            </IonButton>

            <div className={`bg-white w-[45%] mt-[12rem] absolute shadow-[0px_1px_10px_rgba(0,0,0,0.4)] rounded-3xl transition-opacity duration-100 z-20
              ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                {opzioneFiltro.map(opzione => (
                  <div
                    key={opzione.valore}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[14px]"
                        onClick={() => { setFiltro(opzione.valore); setMenuOpen(false); }}
                        >
                        {opzione.nome}
                  </div>
                ))}
            </div>

            <div className="bg-[#f3f3f3] mt-48 rounded-3xl p-4  flex flex-col items-center pb-8 mb-[1.9rem]">
              {filtraCommenti().map(recensione => (
                <div
                  key={recensione.id}
                    className="bg-[#f3f3f3] w-full p-4 mb-4 border-b border-b-[#9faec0] flex gap-4"
                    >
                      <img src={recensione.imgprofilo} alt={`Profilo di ${recensione.nome}`} className="w-9 h-9 border-2 border-black rounded-full  object-cover shrink-0"/>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-black font-medium">{recensione.nome}</p>
                    <p className="text-gray-400 text-sm">{recensione.data}</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">⭐ {recensione.voto}</p>
                  <p className="text-black mt-2">{recensione.commento}</p>
                </div>
              </div>
              ))}
            </div>
          </div>
        </IonContent>
      </IonPage>
    )
  }

export default Recensioni;