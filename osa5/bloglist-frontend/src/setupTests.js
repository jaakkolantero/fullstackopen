import "jest-localstorage-mock";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
});
