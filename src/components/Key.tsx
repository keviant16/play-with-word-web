import { IonButton } from "@ionic/react"

const Key = (props: { letter: string }) => {
    const { letter } = props
    return (
        <IonButton>{letter}</IonButton>
    )
}

export default Key