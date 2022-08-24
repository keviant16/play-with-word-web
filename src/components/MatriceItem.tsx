import React, { useState } from 'react';
import { IonInput, IonItem, } from '@ionic/react';

const StyledMatriceItem = {
    width: "50px"
}

export const MatriceItem: React.FC = () => {

    const [text, setText] = useState<string>();

    return (
        <IonItem style={StyledMatriceItem}>
            <IonInput value={text} onIonChange={e => setText(e.detail.value!)} maxlength={1} />
        </IonItem >
    );
};