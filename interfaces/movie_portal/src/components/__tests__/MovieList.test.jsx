import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MovieList from "../MovieList.jsx";

const sampleMovies = [
  { id: "a", title: "First", year: 2020 },
  { id: "b", title: "Second", year: 2021 },
];

describe("MovieList", () => {
  it("indicates when the catalogue is empty", () => {
    render(<MovieList movies={[]} onSelect={vi.fn()} />);
    expect(screen.getByText(/no movies/i)).toBeInTheDocument();
  });

  it("renders each movie as a selectable button", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<MovieList movies={sampleMovies} onSelect={onSelect} activeId="a" />);

    const second = screen.getByRole("button", { name: /second/i });
    await user.click(second);

    expect(onSelect).toHaveBeenCalledWith("b");
  });
});
