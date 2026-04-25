import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardPage } from "../src/pages/DashboardPage";

describe("DashboardPage", () => {
  it("renders mocked KPI cards", () => {
    render(<DashboardPage />);

    expect(screen.getByText("Leads ativos")).toBeInTheDocument();
    expect(screen.getByText("Conversoes")).toBeInTheDocument();
    expect(screen.getByText("Taxa de sucesso")).toBeInTheDocument();
    expect(screen.getByText("Reunioes agendadas")).toBeInTheDocument();
  });
});
