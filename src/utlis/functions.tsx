/**
  * Compare iteration of value in a array and a string
  * Enter : value, saisieStr, randomStr
  * Exit : boolean 
  */
export const compareStrIteration = (value: string, randomStr: string) => {
    let count: number = 0

    //pour tout el de saisieStr
    for (let el of randomStr) {
        //si value === el -> count++
        count += value === el ? 1 : 0
    }

    console.log(count);

    //si count1 < count2 -> true | false
    if (count > 1) {
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

/**
 * Increment attempt on win by row
 * Enter : rowNumber, 
 * Exit : obj attempt
 */
export const incrementAttempt = (rowNumber: number, randomStr: string, infoUser: any,) => {

    return infoUser
}

