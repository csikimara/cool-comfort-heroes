import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

const invokeMock = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => invokeMock(...args) } },
}));

const toastMock = vi.fn();
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: toastMock }) }));

vi.mock("@/components/TurnstileWidget", () => ({
  default: ({ onToken, className }: { onToken: (t: string | null) => void; className?: string }) => (
    <div data-testid="turnstile-widget" className={className}>
      <button type="button" onClick={() => onToken("valid-token")}>
        mock-verify
      </button>
      <button type="button" onClick={() => onToken(null)}>
        mock-expire
      </button>
    </div>
  ),
}));

import FisherContactForm from "@/components/fisher/FisherContactForm";

const fill = () => {
  fireEvent.change(screen.getByLabelText(/Név/i), { target: { value: "Teszt Elek" } });
  fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "teszt@example.com" } });
  fireEvent.change(screen.getByLabelText(/Üzenet/i), { target: { value: "Kérek ajánlatot." } });
  fireEvent.click(screen.getByRole("checkbox"));
};

describe("FisherContactForm", () => {
  beforeEach(() => {
    invokeMock.mockReset();
    invokeMock.mockResolvedValue({ error: null });
    toastMock.mockReset();
  });

  it("renderel a Turnstile widget helye a GDPR jelölő és a küldés gomb között", () => {
    render(<FisherContactForm />);
    const widget = screen.getByTestId("turnstile-widget");
    const checkbox = screen.getByRole("checkbox");
    const submit = screen.getByRole("button", { name: /Üzenet küldése/i });
    expect(widget).toBeInTheDocument();
    expect(checkbox.compareDocumentPosition(widget) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(widget.compareDocumentPosition(submit) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("token nélkül nem indít Supabase invoke-ot", async () => {
    render(<FisherContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /Üzenet küldése/i }));
    await waitFor(() => expect(toastMock).toHaveBeenCalled());
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it("érvényes tokennel és mezőkkel meghívja a send-contact-email függvényt", async () => {
    render(<FisherContactForm />);
    fill();
    fireEvent.click(screen.getByText("mock-verify"));
    fireEvent.click(screen.getByRole("button", { name: /Üzenet küldése/i }));
    await waitFor(() => expect(invokeMock).toHaveBeenCalledTimes(1));
    const [fn, opts] = invokeMock.mock.calls[0] as [string, { body: Record<string, unknown> }];
    expect(fn).toBe("send-contact-email");
    expect(opts.body.turnstileToken).toBe("valid-token");
    expect(opts.body.email).toBe("teszt@example.com");
  });

  it("lejárt token után nem küldhető el az űrlap", async () => {
    render(<FisherContactForm />);
    fill();
    fireEvent.click(screen.getByText("mock-verify"));
    fireEvent.click(screen.getByText("mock-expire"));
    fireEvent.click(screen.getByRole("button", { name: /Üzenet küldése/i }));
    await waitFor(() => expect(toastMock).toHaveBeenCalled());
    expect(invokeMock).not.toHaveBeenCalled();
  });
});
