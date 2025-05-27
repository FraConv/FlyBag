import { IonButton, IonPage, IonContent} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

type filtroTipo= "Tutte" | "Più recenti" | "Più vecchie" | "Voto più alto" | "Voto più basso"

const Recensioni: React.FC = () => {
    const history = useHistory();
    const[filtro, setFiltro] = useState(true);

    const recensioni = [
        {id: 0, imgprofilo: "Arrow giu.svg", nome: "Anna Pia", commento: "Ottimo prodotto", data: "2024-06-01", voto: 4.5}
    ]



    return(
        
        <IonPage className='bg-white'>
            <IonContent className="bg-white" fullscreen>
            <div className='left-[1rem] top-14 absolute flex flex-row gap-5'>
                <IonButton className=" mt-[-0.5rem] rounded-full  p-0 " fill="clear" onClick={() => history.push('/Analytics')}>
                    <img  src="icon (6).svg" alt="" />
                </IonButton>
                <span className='text-black font-bold text-[20px]'>Recensioni</span>
            </div>

           <div className='bg-[#f3f3f3] w-[85%] h-[30%] left-1/2 absolute flex justify-center items-center -translate-x-1/2 top-30 rounded-3xl'></div>

           <IonButton fill='clear' className='bg-[white] w-[36%] h-[4%] border-[2px] text-[15px] border-[#00C493] absolute left-8 top-[27rem] rounded-full p-3' onClick={() => setFiltro(prev => !prev)}>
            <div className="flex flex-row gap-2 justify-center items-center mt-[-1.5rem]">
            <span className='text-black font-medium text-[18px]'>Tutte</span>
            <img className={`w-4 transition-all duration-100 ${filtro ? "rotate-0" : "rotate-180"}`} src="Arrow giu.svg" alt="" />
            </div>
           </IonButton >

            
           <div className={`bg-white w-[45%] h-[27%] left-[1.9rem] shadow-[0px_1px_10px_rgba(0,0,0,0.4)] absolute flex justify-start top-[31rem] rounded-3xl transition-opacity duration-100 z-20 
                ${filtro ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
            </div>

            <div className='bg-[#f3f3f3] w-[85%] h-auto left-1/2 absolute flex justify-center items-center -translate-x-1/2 top-[32rem] rounded-3xl z-10 flex-col gap-4 p-7'>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
                <div className='w-80 h-20 bg-amber-600'></div>
 

            </div>

           
</IonContent>
        </IonPage>

    )
}

export default Recensioni;