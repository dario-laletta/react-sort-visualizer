import { ALGORITHM, addSortedState, generateSnapshot } from "./utilities";

function BubbleSortData(arr) {
  this.id = ALGORITHM.BUBBLE.ID;
  this.name = ALGORITHM.BUBBLE.NAME;
  this.description = "description";
  this.options = { key: "value" };
  this.snapshots = bubbleSort(arr);
}

function bubbleSort(arr) {
  const snapshots = [];
  const sortedStates = [];

  snapshots.push(generateSnapshot(arr));

  let swapped = false;

  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      snapshots.push(
        generateSnapshot(arr, [
          ...sortedStates,
          { index: j, state: "comparing" },
          { index: j + 1, state: "comparing" },
        ])
      );

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        snapshots.push(
          generateSnapshot(arr, [
            ...sortedStates,
            { index: j, state: "swapping" },
            { index: j + 1, state: "swapping" },
            [...sortedStates],
          ])
        );
      }
    }

    sortedStates.push({ index: arr.length - i - 1, state: "sorted" });
    snapshots.push(generateSnapshot(arr, sortedStates));

    if (!swapped) {
      break;
    }
  }

  sortedStates.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sortedStates.push({ index: i, state: "sorted" });
  }

  snapshots.push(generateSnapshot(arr, sortedStates));

  return snapshots;
}

export { BubbleSortData };
