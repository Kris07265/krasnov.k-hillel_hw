'use strict';
function removeElement1(array, item){
    for (let i = item - 1; i < array.length - 1; i ++){
        array[i] = array[i + 1];
    }
    array.length = array.length - 1;
}
const array1 = [1, 2, 3, 4, 5, 6, 7];
removeElement1(array1, 5 );
console.log(array1);

function removeElement2(array, item){
    array.splice(array.indexOf(item), 1);
}
const array2 = [1, 2, 3, 4, 5, 6, 7];
removeElement1(array2, 3);
console.log(array2);
