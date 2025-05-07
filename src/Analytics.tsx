import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom";

type Credit = {
    amount: number;
    path:string
}

const Credits: Credit[] = [
    {
        amount: 10000000,
        path:"/Graphic"
    }
];

const Analytics: React.FC = () => {

    const Navigate = useNavigate();

    const HandleClick = (path: string) => {
        Navigate(path);
    };
    return (
        <>
            <NavBar />

            <div className="grid grid-cols-2 absolute left-0 top-0 bg-[#00C493] w-[100%] max-[375px]:h-[80%] h-[60%] rounded-bl-[65px]">
                <div className="w-[280px] col-span-2 mt-24 ml-5 ">
                    <h1 className="text-[40px] text-left font-medium">Items sold with FlyBag this</h1>
                </div>

                <div className="w-[300px] col-span-2 mt-[-110px] max-[375px]:mt-[-60px] ml-5">
                    <h1 className="text-[30px] text-left font-medium">FlyBag credits</h1>

                    <div className="bg-white inline-block pl-[10px] left-6 absolute pr-[10px] h-9 mt-5 rounded-full shadow-black shadow-[0_1px_10px_rgba(0,0,0,0)] z-10">
                        {Credits.map((credit, index) => {
                            const displayAmount = credit.amount >= 999999
                                ? "+ 999.999$"
                                : `${credit.amount.toLocaleString()}$`;

                            return (
                                <h1 className="text-black text-[25px] font-semibold pt-1 cursor-pointer z-20" key={index}  onClick={() => HandleClick(credit.path)}> {displayAmount} </h1>
                            );
                        })}   
                    </div>
                
                    <div className="place-items-center absolute left-0  w-[100%]">
                        <div className="w-[184px] h-[34px] bg-white  rounded-full mt-32 pt-3  grid grid-cols-1 shadow-black shadow-[0_1px_10px_rgba(0,0,0,0)]">
                            <div className="mt-[-8px]"><span className="text-black text-[18px] font-bold">Boost your shop</span></div>
                        </div>
                    </div>

                </div>
            
            </div>

            <div className="border-2 border-transparent w-[100%] h-[50%] absolute  mt-36 grid grid-cols-1 gap-[50px] z-9 left-0 place-items-center  max-[375px]:mt-[250px]">
                <div className="w-[219px] h-[81px] border-[3px] border-[#00C493] rounded-full pl-7 pt-3 grid grid-cols-2 shadow-black shadow-[0_1px_10px_rgba(0,0,0,0)]">
                    <div ><img className="w-12" src="Group 91.svg" alt="" /></div>
                    <div className="mt-[13%]"><span className="text-[#016F54] ml-[-35px]">Inventory</span></div>
                </div>
                <div className="w-[219px] h-[81px] border-[3px] border-[#00C493] rounded-full pl-7 pt-3  grid grid-cols-2 shadow-black shadow-[0_1px_10px_rgba(0,0,0,0)]">
                    <div ><img className="w-12" src="icon (5).svg" alt="" /></div>
                    <div className="mt-[13%]"><span className="text-[#016F54] ml-[-65px]">Orders</span></div>
                </div>
                <div className="w-[219px] h-[81px] border-[3px] border-[#00C493] rounded-full pl-7 pt-3  grid grid-cols-2 shadow-black shadow-[0_1px_10px_rgba(0,0,0,0)]">
                    <div ><img className="w-12" src="Star 3.svg" alt="" /></div>
                    <div className="mt-[13%]"><span className="text-[#016F54] ml-[-55px]">Reviews</span></div>
                </div>
                <div className="mt-[100px] border-2 border-transparent"></div>
            </div>
            
         
        </>
    );
};

export default Analytics;