
import { NextResponse } from "next/server";
import { openai } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;
  try {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": `Give a simple summary in concise bullet points for this transcript:  ${text}`
        },
      ],
      // stream: true,
      temperature: 0.7,
      top_p: 1,
    });
    // console.log("response", response.choices[0].message.content)

    return NextResponse.json({
      text: response.choices[0].message.content,
      status: 200 
    });
  } catch (error: any) {
    console.error("Error processing text:", error.status, error.error.message);
    return NextResponse.json({ status: 500, error });
  }
}
