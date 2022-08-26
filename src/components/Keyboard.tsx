import { IonButton, IonButtons, IonToolbar } from "@ionic/react"
import React from "react"

const keyboard = [
    ["A", "Z", "E", "R", "T", 'Y', "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "M"],
    ["back", "W", "X", "C", "V", "B", "N", "enter"]]


const Keyboard = (props: any) => {

    const handleOnClick = (value: string) => {
        if (value === 'back' && props.currentCell.col >= 0) props.remove();

        else props.add(value)

    }
    return (

        <React.Fragment >
            {
                keyboard.map((row, i) => (
                    <IonToolbar key={i} >
                        {row.map((key, j) => (
                            <IonButtons slot="start"
                                key={j}>
                                <IonButton fill="outline" onClick={() => handleOnClick(key)}>{key}</IonButton>
                            </IonButtons>
                        ))}
                    </IonToolbar>
                ))
            }

        </React.Fragment >
    )
}
export default Keyboard