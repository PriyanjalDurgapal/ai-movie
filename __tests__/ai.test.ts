import { generateAISummary } from "@/lib/ai";

jest.mock("openai", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: '{"summary":"Great film","sentiment":"positive"}',
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

describe("AI Summary", () => {
  it("parses AI response correctly", async () => {
    const result = await generateAISummary(["Amazing movie"]);
    expect(result.summary).toBe("Great film");
    expect(result.sentiment).toBe("positive");
  });
});