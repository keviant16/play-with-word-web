import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, } from '@ionic/react';
import { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import useFetch from '../customHook/useFetch';

const matriceInit = [
    [{ value: '', color: "#a9a9ff" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
    [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
    [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
    [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
    [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
    [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
];

const keyboardInit = [
    [{ value: "A", color: "dark", disabled: false }, { value: "Z", color: "dark", disabled: false }, { value: "E", color: "dark", disabled: false }, { value: "R", color: "dark", disabled: false }, { value: "T", color: "dark", disabled: false }, { value: 'Y', color: "dark", disabled: false }, { value: "U", color: "dark", disabled: false }, { value: "I", color: "dark", disabled: false }, { value: "O", color: "dark", disabled: false }, { value: "P", color: "dark", disabled: false }],
    [{ value: "Q", color: "dark", disabled: false }, { value: "S", color: "dark", disabled: false }, { value: "D", color: "dark", disabled: false }, { value: "F", color: "dark", disabled: false }, { value: "G", color: "dark", disabled: false }, { value: "H", color: "dark", disabled: false }, { value: "J", color: "dark", disabled: false }, { value: "K", color: "dark", disabled: false }, { value: "L", color: "dark", disabled: false }, { value: "M", color: "dark", disabled: false }],
    [{ value: "back", color: "dark", disabled: false }, { value: "W", color: "dark", disabled: false }, { value: "X", color: "dark", disabled: false }, { value: "C", color: "dark", disabled: false }, { value: "V", color: "dark", disabled: false }, { value: "B", color: "dark", disabled: false }, { value: "N", color: "dark", disabled: false }, { value: "enter", color: "dark", disabled: false }]]


const currentCellInit = { row: 0, col: 0 };

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [keyboard, setKeyboard] = useState(keyboardInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const data = useFetch("http://localhost:3000/data")

    console.log(data.randomWord);


    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        matriceCopy[currentCell.row][currentCell.col].value = value;
        matriceCopy[currentCell.row][currentCell.col].color = "#a9a9ff";

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
            [{ value: '', color: "#a9a9ff" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
            [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
            [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
            [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
            [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
            [{ value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }, { value: '', color: "grey" }],
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
                color: 'grey',
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
                    matriceCopy[currentCellCopy.row][idx].color = 'yellow';
                    updateKeyboard(v.value, "warning")


                    if (v.value === data.randomWord[idx]) {
                        matriceCopy[currentCellCopy.row][idx].color = 'green';
                        updateKeyboard(v.value, "success")

                    }
                } else {
                    matriceCopy[currentCellCopy.row][idx].color = 'red';
                    updateKeyboard(v.value, "danger")

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

    const updateKeyboard = (value: string, color: string) => {
        const keyboardCopy = [...keyboard]

        keyboardCopy.forEach((row: { value: string, color: string, disabled: boolean }[], i: number) => {
            row.forEach((key, j) => {
                if (key.value === value) {
                    switch (color) {
                        case "danger":
                            keyboardCopy[i][j].color = color
                            keyboardCopy[i][j].disabled = true
                            break;

                        case "success":
                        case "warning":
                            keyboardCopy[i][j].color = color

                            break;

                        default:
                            break;
                    }
                }
            })
        })

        setKeyboard(keyboardCopy)
    }

    return (
        <IonPage >
            <IonContent fullscreen >
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <Matrice matrice={matrice} />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="8">
                            <Keyboard
                                add={add}
                                currentCell={currentCell}
                                remove={remove}
                                gess={gess}
                                endGame={endGame}
                                keyboard={keyboard}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <div style={{ textAlign: "center" }}>Message</div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default WordGame;
