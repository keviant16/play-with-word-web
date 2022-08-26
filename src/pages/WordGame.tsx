import { IonCol, IonContent, IonGrid, IonPage, IonRow, } from '@ionic/react';
import { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import useFetch from '../customHook/useFetch';

const matriceInit = [
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
    [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
];

const currentCellInit = { row: 0, col: 0 };

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const data = useFetch("http://localhost:3000/data")

    console.log(data.randomWord);


    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        matriceCopy[currentCell.row][currentCell.col].value = value;

        if (currentCell.col !== 4) {
            currentCellCopy.col++;
        } else {
            console.error('should press enter to continue');
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const endGame = () => {
        console.log('----reset----');

        setMatrice([
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
            [{ value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }, { value: '', color: "primary" }],
        ]);
        setCurrentCell(currentCellInit);
    };

    const remove = () => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        if (currentCellCopy.col > 0) {
            if (!matriceCopy[currentCellCopy.row][currentCellCopy.col].value) {
                currentCellCopy.col--;
            }

            matriceCopy[currentCellCopy.row][currentCellCopy.col] = {
                value: '',
                color: 'primary',
            };
        } else {
            console.error('should not remove value');
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const gess = () => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        const isCurrentValueEmpty =
            matriceCopy[currentCell.row][currentCell.col].value;

        if (currentCell.col === 4 && isCurrentValueEmpty) {
            matriceCopy[currentCellCopy.row].forEach((v, idx) => {
                if (data.randomWord.includes(v.value)) {
                    matriceCopy[currentCellCopy.row][idx].color = 'warning';

                    if (v.value === data.randomWord[idx]) {
                        matriceCopy[currentCellCopy.row][idx].color = 'success';
                    }
                } else {
                    matriceCopy[currentCellCopy.row][idx].color = 'danger';
                }
            });

            currentCellCopy.row++;
            currentCellCopy.col = 0;

            setCurrentCell(currentCellCopy);
            setMatrice(matriceCopy);

        } else {
            console.error('should add value to continue');
        }
    }

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
                            <Keyboard add={add} currentCell={currentCell} remove={remove} gess={gess} endGame={endGame} />
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonPage>
    );
};

export default WordGame;
