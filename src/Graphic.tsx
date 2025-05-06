import { Link } from "react-router-dom";

const Graphic: React.FC = () => {
    return(
        <>
        <Link className="inline-block" to="/"><div className=" absolute top-16 left-0 w-[auto] h-[auto] pl-4"><img className="cursor-pointer" src="icon (6).svg" alt="" /></div></Link>
        </>
    )
}

export default Graphic