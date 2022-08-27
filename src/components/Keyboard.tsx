import { IonCol, IonGrid, IonItem, IonRow, } from "@ionic/react"



const Keyboard = (props: any) => {

    const handleOnClick = (value: string) => {

        if (props.currentCell.row === 6) {
            value = 'reset';
        }

        switch (value) {
            case 'back':
                props.remove();
                break;
            case 'enter':
                props.gess();
                break;
            case 'reset':
                props.endGame();
                break;
            default:
                props.add(value);
        }
    };

    return (
        <IonGrid>
            {
                props.keyboard.map((row: [], i: number) => (
                    <IonRow key={i} >
                        {row.map((key: { value: string, color: string, disabled: boolean }, j: number) => (
                            <IonCol key={j}>
                                <IonItem button color={key.color} onClick={() => handleOnClick(key.value)} disabled={key.disabled}>
                                    {key.value}
                                </IonItem>
                            </IonCol>
                        ))}
                    </IonRow>
                ))
            }
        </IonGrid>
    )
}
export default Keyboard