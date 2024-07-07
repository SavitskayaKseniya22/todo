import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./header.tsx";

describe("Header", () => {
  it("renders a title", async () => {
    render(<Header />);
    const title = await screen.findByTestId("header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("ToDo");
  });
});
