import { IonPage } from "@ionic/react"
import { ChevronLeft } from "lucide-react"
import { useHistory } from 'react-router-dom';



const Inventory:React.FC= () => {
    const navigate = useHistory();
    return(
        <IonPage>
            <div className="flex flex-row items-start ml-[1.9rem] mt-[3rem]">
                <ChevronLeft onClick={()=>navigate.push("/Analytics")} className="w-11 mt-1 text-black"></ChevronLeft>
                <span style={{color:"black"}} className=" font-bold  text-xl "> Inventario</span>
            </div>

    <div className="bg-[#6EDDC1] w-40 h-8 rounded-lg flex items-center absolute right-[1.9rem] mt-[3rem]">
  <div className="flex justify-between items-center w-full px-2">
    <div className="bg-[white] w-14 h-6 p-1 text-[12px] text-[#6EDDC1] rounded-[5px]">Griglia</div>
    <div className="bg-[white] w-14 h-6 p-1 text-[12px] text-[#6EDDC1] rounded-[5px]">Lista</div>
  </div>
</div>

<div className="w-16 h-16 rounded-full text-white text-6xl font-medium justify-center flex items-center bg-[#6EDDC1] absolute bottom-4 right-[1.9rem]">{"+"}</div>
           
        </IonPage>
    )
}

export default Inventory