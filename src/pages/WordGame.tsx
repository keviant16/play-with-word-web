import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import useFetch from '../hooks/useFetch';
import WordService from '../services/WordService';
import { currentCellInit, data, feedbackInit, keyboardInit, matriceInit, rKeyboardInit, rMatriceInit } from '../utlis/constants';
import { compareStrIteration, mapArrayToString } from '../utlis/functions';
import { Header } from '../components/Header';
import { updateInfoUser } from '../services/InfoUserService';

const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [keyboard, setKeyboard] = useState(keyboardInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const [feedback, setFeedback] = useState(feedbackInit);

    const userID = window.localStorage.getItem("userID")
    const wordList = data
    const randomWord: string = useFetch("http://localhost:8080/words/random?id=" + userID)
    const infoUser = useFetch("http://localhost:8080/infoUsers/" + userID)


    const add = (value: any) => {
        const matriceCopy = [...matrice];
        const currentCellCopy = { ...currentCell };

        console.log(randomWord);

        if (matriceCopy[currentCell.row][currentCell.col].value) {
            handleFeeback("Appuyez sur Entrée pour continuer.", "error")
        } else {
            matriceCopy[currentCell.row][currentCell.col].value = value;
            matriceCopy[currentCell.row][currentCell.col].color = "#3880ff";

            // if (currentCell.col !== 0) {
            //     matriceCopy[currentCell.row][currentCell.col - 1].color = "black";
            // }

            if (currentCell.col !== 4) {
                currentCellCopy.col++;
            }
        }

        setMatrice(matriceCopy);
        setCurrentCell(currentCellCopy);
    };

    const endGame = () => {
        // setNextNewWorld()
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

            console.log(currentCellClone);

            switch (currentCellClone.row) {
                case 0:
                    infoUser.attemptOne++
                    break;
                case 1:
                    infoUser.attemptTwo++
                    break;
                case 2:
                    infoUser.attemptThree++
                    break;
                case 3:
                    infoUser.attemptFour++
                    break;
                case 4:
                    infoUser.attemptFive++
                    break;
                case 5:
                    infoUser.attemptSix++
                    break;
                default:
                    break;
            }

            infoUser.words.push(randomWord)
            console.log(infoUser);
            updateInfoUser(infoUser, userID)

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
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="6">
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



