import NavBarUtente from '@/components/NavBarUtente';
import { IonButton, IonPage,} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Recensioni: React.FC = () => {
    const history = useHistory();
    return(
        
        <IonPage className='bg-white'>
            <div className='left-[2rem] top-14 absolute flex flex-row gap-5'>
                <IonButton className=" mt-[-0.5rem] rounded-full  p-0 " fill="clear" onClick={() => history.push('/Analytics')}>
                    <img  src="icon (6).svg" alt="" />
                </IonButton>
                <span className='text-black font-bold text-[20px]'>Recensioni</span>
           </div>

           <div className='bg-[#f3f3f3] w-[85%] h-[30%] left-1/2 absolute flex justify-center items-center -translate-x-1/2 top-30 rounded-3xl'></div>

           <div className='bg-[white] w-[34%] h-[4%] border-[2px] border-[#E5E7EB] absolute flex justify-start items-center left-8 top-[27rem] gap-2 rounded-[7px] p-3'>
            <span className='text-black'>Rilevanzza</span>
            <img className='w-4' src="Arrow giu.svg" alt="" />
           </div>
        </IonPage>

    )
}

export default Recensioni;