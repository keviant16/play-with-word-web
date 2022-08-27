import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, } from '@ionic/react';

import { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import useFetch from '../customHook/useFetch';
import { menu } from 'ionicons/icons';
import WordService from '../services/WordService';


const matriceInit = [
    [{ value: '', color: "#4854e0" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
];

const rMatriceInit = [
    [{ value: '', color: "#a9a9ff" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
    [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
];

const keyboardInit = [
    [{ value: "A", color: "dark", disabled: false }, { value: "Z", color: "dark", disabled: false }, { value: "E", color: "dark", disabled: false }, { value: "R", color: "dark", disabled: false }, { value: "T", color: "dark", disabled: false }, { value: 'Y', color: "dark", disabled: false }, { value: "U", color: "dark", disabled: false }, { value: "I", color: "dark", disabled: false }, { value: "O", color: "dark", disabled: false }, { value: "P", color: "dark", disabled: false }],
    [{ value: "Q", color: "dark", disabled: false }, { value: "S", color: "dark", disabled: false }, { value: "D", color: "dark", disabled: false }, { value: "F", color: "dark", disabled: false }, { value: "G", color: "dark", disabled: false }, { value: "H", color: "dark", disabled: false }, { value: "J", color: "dark", disabled: false }, { value: "K", color: "dark", disabled: false }, { value: "L", color: "dark", disabled: false }, { value: "M", color: "dark", disabled: false }],
    [{ value: "back", color: "dark", disabled: false }, { value: "W", color: "dark", disabled: false }, { value: "X", color: "dark", disabled: false }, { value: "C", color: "dark", disabled: false }, { value: "V", color: "dark", disabled: false }, { value: "B", color: "dark", disabled: false }, { value: "N", color: "dark", disabled: false }, { value: "enter", color: "dark", disabled: false }]
]

const rKeyboardInit = [
    [{ value: "A", color: "dark", disabled: false }, { value: "Z", color: "dark", disabled: false }, { value: "E", color: "dark", disabled: false }, { value: "R", color: "dark", disabled: false }, { value: "T", color: "dark", disabled: false }, { value: 'Y', color: "dark", disabled: false }, { value: "U", color: "dark", disabled: false }, { value: "I", color: "dark", disabled: false }, { value: "O", color: "dark", disabled: false }, { value: "P", color: "dark", disabled: false }],
    [{ value: "Q", color: "dark", disabled: false }, { value: "S", color: "dark", disabled: false }, { value: "D", color: "dark", disabled: false }, { value: "F", color: "dark", disabled: false }, { value: "G", color: "dark", disabled: false }, { value: "H", color: "dark", disabled: false }, { value: "J", color: "dark", disabled: false }, { value: "K", color: "dark", disabled: false }, { value: "L", color: "dark", disabled: false }, { value: "M", color: "dark", disabled: false }],
    [{ value: "back", color: "dark", disabled: false }, { value: "W", color: "dark", disabled: false }, { value: "X", color: "dark", disabled: false }, { value: "C", color: "dark", disabled: false }, { value: "V", color: "dark", disabled: false }, { value: "B", color: "dark", disabled: false }, { value: "N", color: "dark", disabled: false }, { value: "enter", color: "dark", disabled: false }]
]

const currentCellInit = { row: 0, col: 0 };

const feedbackInit = { message: "", type: "", on: false }

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [keyboard, setKeyboard] = useState(keyboardInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const [feedback, setFeedback] = useState(feedbackInit);
    const [nextNewWord, setNextNewWorld] = useState("");

    const data = useFetch("http://localhost:3000/data")

    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        if (matriceCopy[currentCell.row][currentCell.col].value) {
            handleFeeback("Appuyez sur Entrée pour continuer.", "error")
        } else {
            matriceCopy[currentCell.row][currentCell.col].value = value;
            matriceCopy[currentCell.row][currentCell.col].color = "#4854e0";

            if (currentCell.col !== 0) {
                matriceCopy[currentCell.row][currentCell.col - 1].color = "black";
            }

            if (currentCell.col !== 4) {
                currentCellCopy.col++;
            }
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const endGame = () => {
        setNextNewWorld(data.data[Math.floor(Math.random() * data.data.length)])
        setMatrice(rMatriceInit);
        setCurrentCell(currentCellInit);
        setFeedback(feedbackInit)
        setKeyboard(rKeyboardInit)

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
                color: 'whitesmoke',
            };
        } else {
            handleFeeback("Veuillez entrer un mot de 5 lettres..", "error")
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const gess = () => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };
        const randomWord = nextNewWord === "" ? data.randomWord : nextNewWord

        console.log({ randomWord });

        const isCurrentValueEmpty =
            matriceCopy[currentCell.row][currentCell.col].value;

        //is end row and last cell empty
        if (currentCell.col === 4 && isCurrentValueEmpty) {

            //is current row in data array
            if (rowIsInArray(matriceCopy[currentCellCopy.row])) {
                matriceCopy[currentCellCopy.row].forEach((v, idx) => {

                    //is value in randoWord
                    if (randomWord.includes(v.value)) {
                        matriceCopy[currentCellCopy.row][idx].color = '#ffc409';
                        updateKeyboard(v.value, "warning")

                        //has value same position in randoWord
                        if (v.value === randomWord[idx]) {
                            matriceCopy[currentCellCopy.row][idx].color = '#3880ff';
                            updateKeyboard(v.value, "success")
                        }

                    } else {
                        matriceCopy[currentCellCopy.row][idx].color = "#f4f5f8"
                        updateKeyboard(v.value, "danger")
                    }
                });

                //is current same as randoWord
                win(matriceCopy[currentCellCopy.row], currentCellCopy, matriceCopy, randomWord)
            } else {
                handleFeeback("Ce mot nest pas dans la liste", "error")
            }

        } else {
            handleFeeback("Veuillez entrer un mot de 5 lettres..", "error")
        }
    }

    const updateKeyboard = (value: string, color: string) => {
        const keyboardCopy = [...keyboard]

        keyboardCopy.forEach((row: { value: string, color: string, disabled: boolean }[], i: number) => {
            row.forEach((key, j) => {
                if (key.value === value) {
                    switch (color) {
                        case "danger":
                            keyboardCopy[i][j].disabled = true
                            break;

                        case "success":
                            keyboardCopy[i][j].color = "primary"
                            break;


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

    const handleFeeback = (message: string, type: string) => {
        setFeedback({ message: message, type: type, on: true })

        if (type === "error") {
            setTimeout(() => {
                setFeedback(feedbackInit)
            }, 5000);
        }
    }

    const concatRow = (array: { value: string; color: string; }[]) => {
        let arrayToStr: string = ""

        array.forEach(el => {
            arrayToStr += el.value
        })

        return arrayToStr
    }

    const win = (
        array: { value: string; color: string; }[],
        currentCellCopy: { row: number; col: number; },
        matriceCopy: { value: string; color: string; }[][],
        randomWord: string
    ) => {
        const arrayToStr: string = concatRow(array)
        const currentCellClone = { ...currentCellCopy };

        if (randomWord === arrayToStr) {
            currentCellClone.row = 6

            handleFeeback("Vous avez trouver le mot. Appuyez sur une touche du clavier pour Relancez une nouvelle partie", "success")


            WordService.add(randomWord)
            setCurrentCell(currentCellClone)

        } else if (matriceCopy[5][4].value !== "") {
            currentCellClone.row = 6

            handleFeeback("Vous avez perdu. Appuyez sur une touche du clavier pour Relancez une nouvelle partie", "info")
            setCurrentCell(currentCellClone)
        }
        else {
            //change line
            currentCellCopy.row++;
            currentCellCopy.col = 0;

            setCurrentCell(currentCellCopy);
            setMatrice(matriceCopy);
        }
    }

    const rowIsInArray = (row: { value: string; color: string; }[]) => {
        const arrayToStr = concatRow(row)

        if (data.data.find((el) => el === arrayToStr))
            return true
        return false
    }

    return (
        <IonPage id="main">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuToggle>
                            <IonButton>
                                <IonIcon slot="icon-only" icon={menu}></IonIcon>
                            </IonButton>
                        </IonMenuToggle>
                    </IonButtons>
                    <IonTitle>Header</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                            {feedback.on &&
                                <div style={{ textAlign: "center", padding: 10, borderRadius: 25, backgroundColor: feedback.type === "error" ? "#eb445a" : "black" }}>
                                    {feedback.message}
                                </div>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default WordGame;

