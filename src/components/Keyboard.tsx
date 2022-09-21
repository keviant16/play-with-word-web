import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react"



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
        <IonGrid fixed>
            {
                props.keyboard.map((row: [], i: number) => (
                    <IonRow key={i} className="ion-justify-content-center">
                        {row.map((key: { value: string, color: string, disabled: boolean }, j: number) => (
                            <IonCol key={j} size={key.value === "enter" || key.value === "back" ? "2.4" : '1.2'}>
                                <IonButton className={key.value === "enter" ? "float-right" : ""} color={key.color} onClick={() => handleOnClick(key.value)} disabled={key.disabled} expand="full">
                                    {key.value}
                                </IonButton>
                            </IonCol>
                        ))}
                    </IonRow>
                ))
            }
        </IonGrid >
    )
}
export default Keyboard