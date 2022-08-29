import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, } from '@ionic/react';

import { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Matrice from '../components/Matrice';
import './Home.css';
import useFetch from '../hooks/useFetch';
import { menu } from 'ionicons/icons';
import WordService from '../services/WordService';
import { currentCellInit, feedbackInit, keyboardInit, matriceInit, rKeyboardInit, rMatriceInit } from '../utlis/constants';
import { mapArrayToString } from '../utlis/functions';
import StatisticService from '../services/LastWordService';
import { Header } from '../components/Header';




const WordGame: React.FC = () => {
    const [matrice, setMatrice] = useState(matriceInit);
    const [keyboard, setKeyboard] = useState(keyboardInit);
    const [currentCell, setCurrentCell] = useState(currentCellInit);
    const [feedback, setFeedback] = useState(feedbackInit);
    const [nextNewWord, setNextNewWorld] = useState("");

    const code = window.localStorage.getItem("code")
    const stats = useFetch("http://localhost:8080/statistics/search/findByCode?code=" + code)
    const randomWord = useFetch("http://localhost:8080/words/random")
    const wordList = useFetch("http://localhost:8080/words")


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


        const isCurrentValueEmpty =
            matriceCopy[currentCell.row][currentCell.col].value;

        //is end row and last cell empty
        if (currentCell.col === 4 && isCurrentValueEmpty) {

            //is current row in data array
            if (rowIsInArray(matriceCopy[currentCellCopy.row], wordList)) {
                matriceCopy[currentCellCopy.row].forEach((v, idx) => {

                    //is value in randoWord
                    if (randomWord.includes(v.value)) {

                        // if (compareStrIteration(v.value, matriceCopy[currentCellCopy.row], randomWord)) {
                        matriceCopy[currentCellCopy.row][idx].color = 'yellow';
                        updateKeyboard(v.value, "warning",)
                        // }

                        //has value same position in randoWord
                        if (v.value === randomWord[idx]) {
                            matriceCopy[currentCellCopy.row][idx].color = 'green';
                            updateKeyboard(v.value, "success")
                        }

                    } else {
                        matriceCopy[currentCellCopy.row][idx].color = "red"
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

    const win = (
        array: { value: string; color: string; }[],
        currentCellCopy: { row: number; col: number; },
        matriceCopy: { value: string; color: string; }[][],
        randomWord: string
    ) => {
        const arrayToStr: string = mapArrayToString(array)
        const currentCellClone = { ...currentCellCopy };

        if (randomWord === arrayToStr) {


            updateStats()


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

    const updateStats = () => {
        if (currentCell.row === 0) stats["oneTry"] += 1
        if (currentCell.row === 1) stats["twoTry"] += 1
        if (currentCell.row === 2) stats["threeTry"] += 1
        if (currentCell.row === 3) stats["fourTry"] += 1
        if (currentCell.row === 4) stats["fiveTry"] += 1
        if (currentCell.row === 5) stats["sixTry"] += 1
        StatisticService.update(stats)
    }

    const rowIsInArray = (row: { value: string; color: string; }[], wordList: any) => {
        console.log(wordList?._embedded?.words);

        const arrayToStr = mapArrayToString(row)

        if (wordList?._embedded?.words.find((el: any) => el.value === arrayToStr))
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



