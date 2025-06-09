import { IonButton, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Graphic from '@/components/Graphic';
import Profilo from '@/components/Profilo';
import Notifiche from '@/components/Notifiche';

const Analytics: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage className='bg-white'>
      <div className='w-44 left-[2rem] top-14 fixed z-10'><img src="flybag logo.svg" alt="" /></div>
      <div className='grid grid-cols-2 gap-5 fixed right-8 top-14'>
        <div className='absolute right-[5rem] top-[0.5rem]'><Notifiche></Notifiche></div>
      </div>

      <Graphic />
      <div className='border-[2px] border-[#d5e1e7] w-[40vh] rounded-xl h-[30vh] top-[31rem] absolute left-1/2 transform -translate-x-1/2 pl-5 pt-4 pr-4 flex flex-col gap-4'>
        <div className="flex gap-7 items-center w-full">
          <span style={{color:"black"}} className='text-black font-bold text-[16px]'>Recensioni recenti</span>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => history.push('/Recensioni')}>
            <span style={{color:"#01a179"}} className='font-medium text-[16px]'>Vedi tutte</span>
            <img className='w-2 pt-0.5' src="Arrow_r.svg" alt="Arrow" />
          </div>
        </div>
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

      <Profilo></Profilo>
      <NavBar />
    </IonPage>
  );
};

export default Analytics;
