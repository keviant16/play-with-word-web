
import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';

const Matrice = (props: { matrice: any[]; }) => {
    return (
        <IonGrid>
            {
                props.matrice.map((row: [], i: number) => (
                    <IonRow key={i}>
                        {row.map((key: string, j: number) => (
                            <IonCol key={j}>
                                <IonItem>
                                    <IonLabel>
                                        {key}
                                    </IonLabel>
                                </IonItem>
                            </IonCol>
                        ))}
                    </IonRow>
                ))
            }
        </IonGrid>
    )

};

export default Matrice;
