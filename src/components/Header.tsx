import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonButton, IonButtons, IonIcon, IonMenuToggle } from '@ionic/react';
import { menu } from 'ionicons/icons';

export const Header: React.FC = () => (

    <IonHeader >
        <IonToolbar color='dark'>
            <IonButtons slot="start">
                <IonMenuToggle>
                    <IonButton>
                        <IonIcon slot="icon-only" icon={menu}></IonIcon>
                    </IonButton>
                </IonMenuToggle>
            </IonButtons>
            <IonTitle>Wordle</IonTitle>
        </IonToolbar>
    </IonHeader>
);