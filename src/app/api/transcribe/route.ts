
import { NextResponse } from "next/server";
import fs from "fs";
import { openai } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;
  try {

    const data = await await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": `
            get the summary of the paragraph ${text}
          `
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    return NextResponse.json({ data, status: 200  });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}