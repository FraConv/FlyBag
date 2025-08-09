import { IonButton, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Graphic from '@/components/Graphic';
import Profilo from '@/components/Profilo';
import Notifications from './Notifiche';
import { recensioni } from './recensioniData';

const Analytics: React.FC = () => {
  const history = useHistory();
    const recensioniRecenti = [...recensioni]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 2); // Prendi solo 2

  return (
    <IonPage className='bg-white'>
      <div className='w-44 left-[2rem] top-14 fixed z-10'><img src="flybag logo.svg" alt="" /></div>
  
  <div>
       <Notifications></Notifications>
       <Profilo></Profilo>
       </div>
      

      <Graphic />
    <div className='border-[2px] border-[#d5e1e7] w-[40vh] rounded-xl h-[34vh] top-[31rem] absolute left-1/2 transform -translate-x-1/2 pl-5 pt-4 pr-4 flex flex-col gap-4'>
        <div className="flex gap-7 items-center w-full">
          <span style={{color:"black"}} className='text-black font-bold text-[16px]'>Recensioni recenti</span>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => history.push('/Recensioni')}>
            <span style={{color:"#01a179"}} className='font-medium text-[16px]'>Vedi tutte</span>
            <img className='w-2 pt-0.5' src="Arrow_r.svg" alt="Arrow" />
          </div>
        </div>

        {/* Qui visualizzi solo 2 recensioni */}
        {recensioniRecenti.map(r => (
          <div key={r.id} className="bg-white rounded   mb-2 ">
            <div className="flex items-center gap-3">
              <img src={r.imgprofilo} alt={`Profilo di ${r.nome}`} className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-black">{r.nome}</p>
                <p className="text-xs text-gray-500">{new Date(r.data).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="mt-1 text-sm text-black">{r.commento}</p>
            <p className="text-black">⭐ {r.voto}</p>
          </div>
        ))}

      </div>

      <IonButton fill='clear' className='border-[2px] border-[#d5e1e7] w-[18vh] top-[25rem] rounded-xl h-16 absolute left-[1.9rem] bottom-44'>
        <div className="flex flex-col ml-[-58px] text-left gap-1">
            <span style={{color:"black"}} className="text-black">Orders</span>
            <span style={{color:"black"}} className="text-black font-extrabold font-gotham">128</span>
        </div>
      </IonButton>
      <IonButton fill='clear' className='border-[2px] border-[#d5e1e7] w-[18vh] h-16 top-[25rem] rounded-xl absolute right-[1.9rem] bottom-44 '>
        <div className="flex flex-row  text-left gap-2">
        <img className='w-7' src="Inventario.svg" alt="" />
        <span style={{color:"black"}} className='font-bold text-[0.9rem] mt-2'>Inventory</span>
        </div>
      </IonButton>

      
      <NavBar />
    </IonPage>
  );
};

export default Analytics;
