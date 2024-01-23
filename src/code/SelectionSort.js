import { ALGORITHM, addSortedState, generateSnapshot } from "./utilities";

function SelectionSortData(arr) {
  this.id = ALGORITHM.SELECTION.ID;
  this.name = ALGORITHM.SELECTION.NAME;
  this.description = "description";
  this.options = { key: "value" };
  this.snapshots = selectionSort(arr);
}

function selectionSort(arr) {
  const snapshots = [];
  const sortedStates = [];

  snapshots.push(generateSnapshot(arr));

  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < length; j++) {
      snapshots.push(
        generateSnapshot(arr, [
          ...sortedStates,
          { index: j, state: "comparing" },
          { index: min, state: "comparing" },
        ])
      );

      if (arr[j] < arr[min]) {
        min = j;

        snapshots.push(
          generateSnapshot(arr, [
            ...sortedStates,
            { index: min, state: "comparing" },
          ])
        );
      }
    }
    if (min != i) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;

      snapshots.push(
        generateSnapshot(arr, [
          ...sortedStates,
          { index: i, state: "swapping" },
          { index: min, state: "swapping" },
        ])
      );
    }

    sortedStates.push({ index: i, state: "sorted" });
    snapshots.push(generateSnapshot(arr, sortedStates));
  }

  sortedStates.push({ index: arr.length - 1, state: "sorted" });
  snapshots.push(generateSnapshot(arr, sortedStates));

  return snapshots;
}

export { SelectionSortData };
