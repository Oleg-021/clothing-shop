import {useContext} from "react";
import {Outlet, Link} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import CartIcon from "../CartIcon";
import CartDropDown from "../CartDropDown/CartDropDown";

import {UserContext} from "../../store/contexts/user";
import {CartContext} from "../../store/contexts/cart";

import {signOutUser} from "../../utils/firebase/firebase";

import "./styles.scss";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return <>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">SHOP</Link>
                {
                    currentUser ?
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> :
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                }
                <CartIcon/>
            </div>

            {isCartOpen && <CartDropDown/>}
        </div>

        <Outlet/>
    </>;
}

export default Navigation;
