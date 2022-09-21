import { data } from './utlis/constants';
import { compareStrIteration, mapArrayToString, rowIsInArray } from './utlis/functions';


test("expect value in array of elem to be concat", () => {
  const array = []
  const elem1 = { value: "string1", color: "test" }
  const elem2 = { value: "string2", color: "test" }
  array.push(elem1)
  array.push(elem2)

  expect(mapArrayToString(array)).toBe("string1string2");
});

//count iteration in a lettre 
test("expect A to be more then on time in RANDOM to be false", () => {
  expect(compareStrIteration("A", "RANDOM")).toBe(false);
});

test("expect N to be more then on time in NONNE to be true", () => {
  expect(compareStrIteration("N", "NONNE")).toBe(true);
});


test("expect NONNE to be in data (list of random word) to be true", () => {
  const row = [
    { value: "N", color: "" },
    { value: "O", color: "" },
    { value: "N", color: "" },
    { value: "N", color: "" },
    { value: "E", color: "" },
  ]

  expect(rowIsInArray(row, data)).toBe(true);
});

test("expect AONNE to be in data (list of random word) to be false", () => {
  const row = [
    { value: "A", color: "" },
    { value: "O", color: "" },
    { value: "N", color: "" },
    { value: "N", color: "" },
    { value: "E", color: "" },
  ]

  expect(rowIsInArray(row, data)).toBe(false);
});


