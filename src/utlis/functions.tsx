/**
  * Compare iteration of value in a array and a string
  * Enter : value, saisieStr, randomStr
  * Exit : boolean 
  */
export const compareStrIteration = (value: string, saisieArray: { value: string; color: string; }[], randomStr: string) => {
    let count1: number = 0
    let count2: number = 0
    const saisieToStr = mapArrayToString(saisieArray)

    //pour tout el de saisieStr
    for (let el of saisieToStr) {
        //si value === el -> count1++
        count1 += value === el ? 1 : 0
    }

    //pour tout el de randomStr
    for (let el of randomStr) {
        //si value === el -> count2++
        count1 += value === el ? 1 : 0
    }

    console.log(count1 < count2);

    //si count1 < count2 -> true | false
    if (count1 < count2) {
        return true
    }
    return false
}

/**
  * Convert array to string
  * Enter : array
  * Exit : string 
  */
export const mapArrayToString = (array: { value: string; color: string; }[]) => {
    let arrayToStr: string = ""

    array.forEach(el => {
        arrayToStr += el.value
    })

    return arrayToStr
}
