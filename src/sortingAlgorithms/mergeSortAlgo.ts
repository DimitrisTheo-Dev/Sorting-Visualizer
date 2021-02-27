export const getMergeSortAnimations = (array: number[]) => {
    const animations: any[] = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

const mergeSortHelper = (
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    auxiliaryArray: number[],
    animations: any[]
) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

const doMerge = (
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxiliaryArray: number[],
    animations: any[]
) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    //bottom two loops for leftover values
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once  to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// export const testMergeSort = (array: number[]) => {
//     if(array.length <= 1) return array;
//
//     let sortedArray: number[] = []
//     let leftIndex = 0
//     let rightIndex = 0
//     let middleIndex =  Math.floor(array.length / 2);
//     let leftArr = array.slice(leftIndex, middleIndex)
//     let rightArr = array.slice(middleIndex)
//     let leftEl = leftArr[leftIndex]
//     let rightEl = rightArr[rightIndex]
//     while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
//
//         if (leftEl < rightEl) {
//             sortedArray.push(leftEl)
//             leftIndex++
//         } else {
//             sortedArray.push(rightEl)
//             rightIndex++
//         }
//
//     }
//      while(leftIndex < leftArr.length) sortedArray.push(leftEl)
//      while(rightIndex < rightArr.length) sortedArray.push(rightEl)
//     return sortedArray
// }
