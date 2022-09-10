import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import { useEffect, useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import { currentCellInit, data, feedbackInit, keyboardInit, matriceInit } from '../utlis/constants';
import { compareStrIteration, mapArrayToString } from '../utlis/functions';
import { Header } from '../components/Header';
import { getInfoUser, updateInfoUser } from '../services/InfoUserService';
import { getRandomWord } from '../services/WordService';
import { InfoUser } from '../types/UserInfo';

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [keyboard, setKeyboard] = useState(keyboardInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const [feedback, setFeedback] = useState(feedbackInit);
    const [randomWord, setrandomWord] = useState("");
    const [currentInfoUser, setcurrentInfoUser] = useState<InfoUser | any>({});

    const userID: any = window.localStorage.getItem("userID")
    const wordList = data

    useEffect(() => {
        initGame()
    }, []);

    const initGame = async () => {
        let randomWord: string | any = await getRandomWord(userID)
        let currentInfoUser: InfoUser | any = await getInfoUser(userID)

        setrandomWord(randomWord)
        setcurrentInfoUser(currentInfoUser)
    }

    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        if (matriceCopy[currentCell.row][currentCell.col].value) {
            handleFeeback("Appuyez sur Entrée pour continuer.", "error")
        } else {
            matriceCopy[currentCell.row][currentCell.col].value = value;
            matriceCopy[currentCell.row][currentCell.col].color = "#3880ff";

            if (currentCell.col !== 4) {
                currentCellCopy.col++;
            }
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const endGame = () => {

        setMatrice([
            [{ value: '', color: "#3880ff" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
            [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
            [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
            [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
            [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
            [{ value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }, { value: '', color: "whitesmoke" }],
        ]);
        setCurrentCell(currentCellInit);
        setFeedback(feedbackInit)
        setKeyboard([
            [{ value: "A", color: "light", disabled: false }, { value: "Z", color: "light", disabled: false }, { value: "E", color: "light", disabled: false }, { value: "R", color: "light", disabled: false }, { value: "T", color: "light", disabled: false }, { value: 'Y', color: "light", disabled: false }, { value: "U", color: "light", disabled: false }, { value: "I", color: "light", disabled: false }, { value: "O", color: "light", disabled: false }, { value: "P", color: "light", disabled: false }],
            [{ value: "Q", color: "light", disabled: false }, { value: "S", color: "light", disabled: false }, { value: "D", color: "light", disabled: false }, { value: "F", color: "light", disabled: false }, { value: "G", color: "light", disabled: false }, { value: "H", color: "light", disabled: false }, { value: "J", color: "light", disabled: false }, { value: "K", color: "light", disabled: false }, { value: "L", color: "light", disabled: false }, { value: "M", color: "light", disabled: false }],
            [{ value: "back", color: "light", disabled: false }, { value: "W", color: "light", disabled: false }, { value: "X", color: "light", disabled: false }, { value: "C", color: "light", disabled: false }, { value: "V", color: "light", disabled: false }, { value: "B", color: "light", disabled: false }, { value: "N", color: "light", disabled: false }, { value: "enter", color: "light", disabled: false }]

        ])
        return initGame()
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
        const isCurrentValueEmpty = matriceCopy[currentCell.row][currentCell.col].value;

        //is end row and last cell empty
        if (currentCell.col === 4 && isCurrentValueEmpty) {

            //is current row in data array
            if (rowIsInArray(matriceCopy[currentCellCopy.row], wordList)) {

                //
                matriceCopy[currentCellCopy.row].forEach((v, idx) => {

                    //is value in randoWord

                    if (randomWord.includes(v.value)) {

                        matriceCopy[currentCellCopy.row][idx].color = '#e2850b';
                        updateKeyboard(v.value, "warning")

                        //is more than one in randomWord
                        if (compareStrIteration(v.value, randomWord)) {
                            matriceCopy[currentCellCopy.row][idx].color = "#ffc409"
                        }

                        //has value same position in randoWord
                        if (v.value === randomWord[idx]) {
                            matriceCopy[currentCellCopy.row][idx].color = '#11910c';
                            updateKeyboard(v.value, "success")
                        }

                    } else {
                        //
                        matriceCopy[currentCellCopy.row][idx].color = "#92949c"
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
                            keyboardCopy[i][j].color = "secondary"
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

    const win = (
        array: { value: string; color: string; }[],
        currentCellCopy: { row: number; col: number; },
        matriceCopy: { value: string; color: string; }[][],
        randomWord: string
    ) => {
        const arrayToStr: string = mapArrayToString(array)
        const currentCellClone = { ...currentCellCopy };

        if (randomWord === arrayToStr) {

            switch (currentCellClone.row) {
                case 0:
                    currentInfoUser.attemptOne++
                    break;
                case 1:
                    currentInfoUser.attemptTwo++
                    break;
                case 2:
                    currentInfoUser.attemptThree++
                    break;
                case 3:
                    currentInfoUser.attemptFour++
                    break;
                case 4:
                    currentInfoUser.attemptFive++
                    break;
                case 5:
                    currentInfoUser.attemptSix++
                    break;
                default:
                    break;
            }

            currentInfoUser.words.push(randomWord)
            updateInfoUser(currentInfoUser, userID)

            currentCellClone.row = 6
            handleFeeback("Vous avez trouver le mot !! Appuyez sur une touche du clavier pour Relancez une nouvelle partie", "success")

            setCurrentCell(currentCellClone)

        } else if (matriceCopy[5][4].value !== "") {
            currentCellClone.row = 6

            handleFeeback("Vous avez perdu. le mot était " + randomWord + ". Appuyez sur une touche du clavier pour Relancez une nouvelle partie", "danger")
            setCurrentCell(currentCellClone)
        }
        else {
            currentCellCopy.row++;
            currentCellCopy.col = 0;

            setCurrentCell(currentCellCopy);
            setMatrice(matriceCopy);
        }
    }

    const rowIsInArray = (row: { value: string; color: string; }[], wordList: any) => {
        const arrayToStr = mapArrayToString(row)

        if (wordList.find((el: string) => el === arrayToStr))
            return true
        return false
    }

    return (
        <IonPage id="main">
            <Header />
            <IonContent color="dark">
                <IonGrid fixed>
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={() => window.localStorage.clear()}>Clear Local storage</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol >
                            {feedback.on &&
                                <div style={{ textAlign: "center", padding: 10, borderRadius: 25, backgroundColor: feedback.type === "error" ? "#eb445a" : "green" }}>
                                    {feedback.message}
                                </div>
                            }
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol>
                            <Matrice matrice={matrice} />
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol>
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

                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default WordGame;



