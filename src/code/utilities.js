import { BubbleSortData } from "./BubbleSort";
import { InsertionSortData } from "./InsertionSort";
import { SelectionSortData } from "./SelectionSort";

const ALGORITHM = {
  SELECTION: {
    ID: "selectionSort",
    NAME: "Selection Sort",
  },
  INSERTION: {
    ID: "insertionSort",
    NAME: "Insertion Sort",
  },
  BUBBLE: {
    ID: "bubbleSort",
    NAME: "BubbleSort",
  },
};

const DEFAULT = {
  ARR_SIZE: 10,
  DELAY: 250,
};

const delay = {
  "0.25x": DEFAULT.DELAY * 4,
  "0.5x": DEFAULT.DELAY * 2,
  "1x": DEFAULT.DELAY,
  "2x": DEFAULT.DELAY * 0.5,
  "4x": DEFAULT.DELAY * 0.25,
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateArray() {
  const arr = [];

  for (let i = 1; i <= DEFAULT.ARR_SIZE; i++) {
    arr.push(i);
  }

  shuffleArray(arr);

  return arr;
}

function addSortedState(object, index) {
  if (!object.hasOwnProperty("states")) {
    state.states = [];
  }

  const existingState = object.states.find((element) => element.index == index);
  if (existingState) {
    existingState.state = "sorted";
  } else {
    object.states.push({ index, state: "sorted" });
  }
}

function generateSnapshot(arr, states) {
  let snapshot = [];

  for (let i = 0; i < arr.length; i++) {
    snapshot.push({
      value: arr[i],
      state: states?.find((state) => state.index == i)?.state,
    });
  }

  return snapshot;
}

function generateAlgorithmData(id) {
  const arr = generateArray();
  switch (id) {
    case ALGORITHM.SELECTION.ID:
      return new SelectionSortData(arr);
    case ALGORITHM.INSERTION.ID:
      return new InsertionSortData(arr);
    case ALGORITHM.BUBBLE.ID:
      return new BubbleSortData(arr);
    default:
      return undefined;
  }
  const algorithmData = new SelectionSortData(generateArray());
  return algorithmData;
}

export {
  generateArray,
  delay,
  DEFAULT,
  addSortedState,
  generateSnapshot,
  generateAlgorithmData,
  ALGORITHM,
};
