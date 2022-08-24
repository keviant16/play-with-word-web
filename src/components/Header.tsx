import { IonHeader, IonNav, IonNavLink, IonTitle, IonToolbar } from "@ionic/react"
import Home from "../pages/Home";
import '../style/Header.css'

const Header = () => {
    return (
        <IonHeader>
            <IonToolbar className="toolbar">
                <IonNav>
                    <IonNavLink component={Home}>
                        Home
                    </IonNavLink>

                </IonNav>
                <IonTitle>
                    <a href="/home">Home</a>
                </IonTitle>
                <IonTitle>
                    <a href="/game">Game</a>
                </IonTitle>
                <IonTitle>
                    <a href="/statistics">Statistics</a>
                </IonTitle>

            </IonToolbar>
        </IonHeader>
    )

}

export default Header;
