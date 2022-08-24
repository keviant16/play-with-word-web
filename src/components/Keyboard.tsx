import { IonCol, IonGrid, IonRow } from "@ionic/react"
import Key from "./Key"

const Keyboard = () => {
    const keyboard = [
        ["A", "Z", "E", "R", "T", 'Y', "U", "I", "O", "P"],
        ["Q", "S", "D", "F", "G", "H", "J", "K", "M"],
        ["back", "W", "X", "C", "V", "B", "N", "enter"]]
    return (
        <IonGrid>
            {keyboard.map((row, i) => (
                <IonRow key={i}>
                    {row.map((key, j) => (
                        <IonCol key={j}><Key letter={key} /> </IonCol>
                    ))}
                </IonRow>
            ))}
        </IonGrid>
    )
}
export default Keyboard