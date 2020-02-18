function trans(str) {
    str = str.toUpperCase();
    const t = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
    };
    let sum = 0;
    let str_len = str.length;
    for (let i = 0; i < str_len; i++) {
        sum *= 26;
        sum += t[str[i]];
    }
    return sum;
}
let str = "BZ";

console.log(trans(str));