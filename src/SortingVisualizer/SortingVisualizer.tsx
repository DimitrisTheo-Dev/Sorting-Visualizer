import React, { useEffect, useState } from 'react';
import './SortingVisualizer.css';
import '../sortingAlgorithms/mergeSortAlgo'
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSortAlgo";
// import { testMergeSort } from "../sortingAlgorithms/sortingAlgorithms";
import styled from "styled-components";

const PRIMARY_COLOR = 'dimgray';
const SECONDARY_COLOR = 'red';
const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_BARS = 120;

const SortingVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);

    useEffect(() => {
        resetArray();
    }, []);

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    const resetArray = () => {
        const array = [];
        for(let i=0; i < NUMBER_OF_BARS; i++){
            array.push(randomIntFromSetInterval(5, 700))
        }
        setArray(array)
    }
    return (
        <div className="array-container">
            {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}
                />
            ))}
            <br/>
            <Button onClick={() => resetArray()} primary> Reset Array</Button>
            <Button onClick={() => mergeSort()} primary> Merge Sort </Button>
            {/*<Button onClick={() => quickSort()} primary>  Quick Sort</Button>*/}
            {/*<Button onClick={() => testSortMerge(array)} primary> Test Merge Sort (debugging)</Button>*/}
        </div>
    );
}

const Button = styled.button`
  background: ${(props: { primary: any; }) => props.primary ? "black" : "white"};
  color: ${(props: { primary: any; }) => props.primary ? "white" : "black"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const randomIntFromSetInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// For debugging the merge sort algorithm
// const arraysAreEqual = (array1: number[], array2: number[]) => {
//     if (array1.length !== array2.length) return false;
//     let i = 0;
//     array1.forEach((_) => {
//         if(array1[i] !== array2[i]) return false;
//         i++;
//     })
//     return true;
// }

// const testSortMerge = (array: number[]) => {
//     const typeScriptSortedArray = array.slice().sort((a, b) => a - b);
//     const sortedArray = testMergeSort(array);
//     console.log(arraysAreEqual(typeScriptSortedArray, sortedArray));
// }

export default SortingVisualizer;