import { IonHeader, IonNav, IonNavLink, IonTitle, IonToolbar } from "@ionic/react"
import Home from "../pages/Home";
import '../style/Header.css'

const Header = () => {
    return (
        <IonHeader>
            <IonToolbar className="toolbar">
                <IonTitle>
                    <IonNav>
                        <IonNavLink component={Home}>
                            Home
                        </IonNavLink>

                    </IonNav>
                </IonTitle>
                <IonTitle>
                    <a href="/game">Game</a>
                </IonTitle>
                <IonTitle>
                    <a href="/info">Info</a>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    )

}

export default Header;
