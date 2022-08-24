
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { MatriceItem } from './MatriceItem';

const Matrice: React.FC = () => {
    const matrice = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]

    return (
        <IonGrid>
            {
                matrice.map((row, i) => (
                    <IonRow key={i}>
                        {row.map((key, j) => (
                            <IonCol key={j}><MatriceItem /> </IonCol>
                        ))}
                    </IonRow>
                ))
            }
        </IonGrid>
    )

};

export default Matrice;
