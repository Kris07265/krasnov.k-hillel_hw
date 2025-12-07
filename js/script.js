'use strict';
function padString(string, length, symbol, isSymbolRight = true) {
    if (typeof string !== 'string') {
        return 'error of string';
    }
    else if (typeof length !== 'number') {
        return 'error length';
    }
    else if (typeof symbol !== 'string') {
        return 'error symbol';
    }
    else {
        while (string.length < length) {
            if (isSymbolRight) {
                string = string + symbol;
            } else {
                string = symbol + string;
            }
        }
        return string.substring(0, length);
    }
}

console.log(padString("Hello", 8, "*"));