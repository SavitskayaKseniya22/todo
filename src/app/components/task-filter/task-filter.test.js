import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../page.tsx";
import userEvent from "@testing-library/user-event";

describe("Filter", () => {
  it("render a radio input named ALL", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const radio = await screen.findByTestId("filter-radio-all");
    expect(radio).toBeInTheDocument();
    await user.click(radio);
    const tasks = await screen.findAllByTestId("task");
    expect(tasks).toHaveLength(5);
  });
  it("render a radio input named COMPLETED", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const radio = await screen.findByTestId("filter-radio-completed");
    expect(radio).toBeInTheDocument();
    await user.click(radio);
    const tasks = await screen.findAllByTestId("task");
    expect(tasks).toHaveLength(2);
  });
  it("render a radio input named ACTIVE", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const radio = await screen.findByTestId("filter-radio-active");
    expect(radio).toBeInTheDocument();
    await user.click(radio);
    const tasks = await screen.findAllByTestId("task");
    expect(tasks).toHaveLength(3);

    const radioAll = await screen.findByTestId("filter-radio-all");
    await user.click(radioAll);
    const tasksAfterClick = await screen.findAllByTestId("task");
    expect(tasksAfterClick).toHaveLength(5);
  });
});
