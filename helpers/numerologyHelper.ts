const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const getAlphabetPositionStartOne = (char: string): number => {
    return alphabet.indexOf(char.toLowerCase()) + 1;
}
export const sumOfString = (str: string): number => {
    const parts = str.split('');
    let sum = 0;

    for (let i = 0; i < parts.length; i++) {
        sum += getAlphabetPositionStartOne(parts[i]);
    }

    return sum;
}

export const reduceNumber = (num: number, maximum: number = 9, exceptions: Array<number> = [11, 22, 33]): number => {
    while (num > maximum) {
        num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
}