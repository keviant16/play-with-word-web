
import { IonBadge, IonCol, IonGrid, IonRow } from '@ionic/react';

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
                <IonRow key={i} className="ion-justify-content-center">
                    {row.map((key: { value: string, color: string }, j: number) => (
                        <IonCol key={j} size="2">
                            <div
                                className='ion-text-center '
                                style={{ ...style, border: "2px solid " + key.color, color: "white" }}>
                                {key.value}
                                {key.color === "#ffc409" &&
                                    <IonBadge color={"secondary"} style={{ position: "absolute", left: 0, top: 0 }}>!</IonBadge>
                                }
                            </div>
                        </IonCol>
                    ))}
                </IonRow>
            ))}
        </IonGrid >
    )
};

export default Matrice;
