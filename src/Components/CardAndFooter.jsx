import CustomeFooter from "./CustomFooter"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrKey } from "react-icons/gr";
import { useSelector } from "react-redux";

const CardAndFooter = () => {

    const profile = useSelector(state => state.myProfile)

    return(
        <div className="cardFooter">
            <div className="card px-3 mt-2 card-body">
                <div className="annuncio">
                    <h6>Annuncio</h6>
                    <HiOutlineDotsHorizontal className="threeDots"/>
                </div>
                <div className="innerCard">
                    <p>{profile.name}, reactivate your Premium free trial today!</p>
                    <div><BsFillPersonFill className="innerCardIcon"/><GrKey className="innerCardIcon"/></div>
                    <h3>See who's viewed your profile in the last 90 days</h3>
                    <button>Reactive Trial</button>
                </div>
                
            </div>
            <div className="secondFooter">
                <ul>
                    <li>Informazioni</li>
                    <li>Accessibilità</li>
                    <li>Centro assistenza</li>
                    <li>Privacy e condizioni <IoMdArrowDropdown className="arrowGiu"/></li>
                    <li>Opzioni per gli annunci pubblicitari</li>
                    <li>Pubblicità</li>
                    <li>Servizi alle aziende <IoMdArrowDropdown className="arrowGiu"/></li>
                    <li>Scarica l'app Linkedin</li>
                    <li>Altro</li>
                </ul>
                <div className="footerCopirightDiv">
                    <h3>Linkedin</h3>
                    <span className="footerCopiright footerCopiright2">Linkedin Corporation © 2023</span>
                </div>
            </div >
        </div>
    )
}

export default CardAndFooter