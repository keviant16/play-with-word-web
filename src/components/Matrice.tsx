
import { IonCol, IonGrid, IonRow } from '@ionic/react';

const Matrice = (props: { matrice: any[]; }) => {
    return (
        <IonGrid>
            {props.matrice.map((row: [], i: number) => (
                <IonRow key={i}>
                    {row.map((key: { value: string, color: string }, j: number) => (
                        <IonCol key={j} size="2.4">
                            <div style={{ height: 40, width: 40, border: "solid 2px " + key.color, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 3 }}>{key.value}</div>
                        </IonCol>
                    ))}
                </IonRow>
            ))}
        </IonGrid >
    )

};

export default Matrice;
