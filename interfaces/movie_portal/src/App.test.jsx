import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import App from "./App.jsx";

global.fetch = vi.fn();

const payload = [
  {
    id: "arrival",
    title: "Arrival",
    synopsis: "Aliens arrive on Earth.",
    poster_url: "https://example.com/arrival.jpg",
    year: 2016,
    rating: 7.9,
  },
];

describe("App", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it("shows movies fetched from the API", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(payload) });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/arrival/i)).toBeInTheDocument();
    });
  });

  it("handles an API failure", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
