import { IonCol, IonContent, IonGrid, IonPage, IonRow, } from '@ionic/react';
import { useEffect, useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import axios from "axios"
import Header from '../components/Header';
import useFetch from '../customHook/useFetch';



const matriceInit = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

const currentCellInit = { row: 0, col: 0 };

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const data = useFetch("http://localhost:3000/data")

    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };


        if (currentCell.row === 6) {
            return endGame();
        }

        matriceCopy[currentCell.row][currentCell.col] = value;

        if (currentCell.col === 4) {
            currentCellCopy.row++;
            currentCellCopy.col = 0;
        } else {
            currentCellCopy.col++;
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const endGame = () => {
        console.log('----reset----');

        setMatrice([
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ]);
        setCurrentCell(currentCellInit);
    };

    const remove = () => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        if (currentCellCopy.row > 0 && currentCellCopy.col === 0) {
            currentCellCopy.row--;
            currentCellCopy.col = 5;
        }
        matriceCopy[currentCellCopy.row][currentCellCopy.col - 1] = '';

        if (currentCellCopy.col > 0) {
            console.log('currentCellCopy', currentCellCopy);
            currentCellCopy.col--;
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <Matrice matrice={matrice} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <Keyboard add={add} currentCell={currentCell} remove={remove} />
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonPage>
    );
};

export default WordGame;
