import { ALGORITHM, addSortedState, generateSnapshot } from "./utilities";

function InsertionSortData(arr) {
  this.id = ALGORITHM.INSERTION.ID;
  this.name = ALGORITHM.INSERTION.NAME;
  this.description = "description";
  this.options = { key: "index" };
  this.snapshots = insertionSort(arr);
}

function insertionSort(arr) {
  const snapshots = [];
  const sortedStates = [];
  snapshots.push(generateSnapshot(arr));

  for (let i = 1; i < arr.length; i++) {
    let target = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > target) {
      snapshots.push(
        generateSnapshot(arr, [
          ...sortedStates,
          { index: j, state: "comparing" },
          { index: i, state: "comparing" },
        ])
      );

      arr[j + 1] = arr[j];

      snapshots.push(
        generateSnapshot(arr, [
          ...sortedStates,
          { index: j, state: "swapping" },
          { index: j + 1, state: "swapping" },
        ])
      );

      j--;
    }
    arr[j + 1] = target;

    snapshots.push(
      generateSnapshot(arr, [
        ...sortedStates,
        { index: j + 1, state: "swapping" },
      ])
    );
  }

  sortedStates.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sortedStates.push({ index: i, state: "sorted" });
  }

  snapshots.push(generateSnapshot(arr, sortedStates));

  return snapshots;
}

export { InsertionSortData };
