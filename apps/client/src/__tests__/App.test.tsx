import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";
import { Card } from "@repo/ui";

describe("Card", () => {
  test.todo("Todo", () => {});

  test("로딩 상황일 때 Header가 렌더링 된다.", () => {
    const CARD = "카드";

    render(<Card title={CARD} children={undefined} href={""} />);
    const cardTitle = screen.queryByRole("heading");

    expect(cardTitle).toHaveTextContent(CARD);
  });
});
