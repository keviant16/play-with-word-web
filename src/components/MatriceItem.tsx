import React, { useState } from 'react';
import { IonInput, IonItem, } from '@ionic/react';

export const MatriceItem: React.FC = () => {

    const [text, setText] = useState<string>();

    return (
        <IonItem>
            <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(e.detail.value!)}></IonInput>
        </IonItem>
    );
};