import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { loadDateReducer } from "../../store/dateSlice";

const dispatchMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));

vi.mock("../../store/dateSlice", { spy: true });
const dom = render(<Header />);

test("decrement one day on button click", () => {
  const date = new Date(2001, 0, 1, 16, 0, 0);
  vi.setSystemTime(date);
  const button = dom.container.querySelector("#minusOneDay");
  fireEvent.click(button!);
  expect(loadDateReducer).toBeCalledTimes(1);
  vi.mock("../../store/hooks", () => ({
    useAppSelector: vi
      .fn()
      .mockImplementation(() => new Date(2001, 0, 1, 16, 0, 0).getTime()),
  }));
  const dateCalled = new Date(2000, 11, 31, 16, 0, 0);
  expect(loadDateReducer).toBeCalledWith(dateCalled);
});

test("increments one day on button click", () => {
  const date = new Date(2001, 0, 1, 16, 0, 0);
  vi.setSystemTime(date);
  const button = dom.container.querySelector("#plusOneDay");
  fireEvent.click(button!);
  vi.mock("../../store/hooks", () => ({
    useAppSelector: vi
      .fn()
      .mockImplementation(() => new Date(2001, 0, 1, 16, 0, 0).getTime()),
  }));
  const dateCalled = new Date(2001, 0, 2, 16, 0, 0);
  expect(loadDateReducer).toBeCalledWith(dateCalled);
});

test("open setting modal then color palette modal", () => {
  const buttonSetting = screen.getByTestId("SettingsOutlinedIcon");
  const buttonCalendar = screen.getByTestId("EditCalendarOutlinedIcon");
  expect(buttonSetting).toBeDefined();
  expect(buttonCalendar).toBeDefined();
});
