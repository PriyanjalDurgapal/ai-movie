import { NextResponse } from "next/server";
import { generateAISummary } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { reviews } = await request.json();

    if (!reviews?.length) {
      return NextResponse.json(
        { error: "No reviews provided" },
        { status: 400 }
      );
    }

    const aiSummary = await generateAISummary(reviews);
    return NextResponse.json(aiSummary);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "AI summarization failed" },
      { status: 500 }
    );
  }
}