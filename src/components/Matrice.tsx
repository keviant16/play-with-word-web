
import { IonChip, IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';

const Matrice = (props: { matrice: any[]; }) => {
    return (
        <IonGrid>
            {
                props.matrice.map((row: [], i: number) => (
                    <IonRow key={i}>
                        {row.map((key: { value: string, color: string }, j: number) => (
                            <IonCol key={j}>
                                <IonChip color={key.color}>
                                    {key.value}
                                </IonChip>
                            </IonCol>
                        ))}
                    </IonRow>
                ))
            }
        </IonGrid>
    )

};

export default Matrice;
