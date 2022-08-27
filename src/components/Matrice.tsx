
import { IonCol, IonGrid, IonRow } from '@ionic/react';

const style = {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const Matrice = (props: { matrice: any[]; }) => {

    return (
        <IonGrid>
            {props.matrice.map((row: [], i: number) => (
                <IonRow key={i}>
                    {row.map((key: { value: string, color: string }, j: number) => (
                        <IonCol key={j} size="2.4">
                            {/* <div style={{ ...style, backgroundColor: key.color, border: "5px solid " + key.color, color: "white" }}>{key.value}</div> */}
                            <div style={{ ...style, backgroundColor: "whitesmoke", border: "5px solid " + key.color }}>{key.value}</div>
                        </IonCol>
                    ))}
                </IonRow>
            ))}
        </IonGrid >
    )
};

export default Matrice;
