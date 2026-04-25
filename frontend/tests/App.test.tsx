import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { AppStoreProvider } from "../src/store/appStore";

describe("App", () => {
  it("renders the application shell and dashboard route", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppStoreProvider>
          <App />
        </AppStoreProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "CortexSales" })).toBeInTheDocument();
    expect(screen.getByText("Status: Online")).toBeInTheDocument();
    expect(screen.getByText("Leads ativos")).toBeInTheDocument();
  });
});
