import { AppFilterPipe } from './filter.pipe';

describe("FilterPipe", () => {
  let appPipe : AppFilterPipe;

  beforeEach( () => {
    appPipe = new AppFilterPipe();
  });

  it("should return an empty array when provided source is empty or not array", () => {
    expect(appPipe.transform(null, "test")).toEqual([]);
    expect(appPipe.transform(undefined, "test")).toEqual([]);
    expect(appPipe.transform([], "test")).toEqual([]);
  });

  it("should return results when provided with a valid array and search term", () => {
    expect(appPipe.transform(["apple", "banana", "grape"], "ap")).toEqual(["apple", "grape"]);
  });

  it("should return results within object when give key", () => {
    expect(appPipe.transform([{ name: "apple"}, { name: "orange"} ], "orange", "name")).toEqual([{ name: "orange"}]);
  });
});