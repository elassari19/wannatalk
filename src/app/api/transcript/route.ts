import { NextResponse } from "next/server";
import fs from "fs";
import path from 'path';
import { openai } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json();

  const base64Audio = body.audio;

  // Convert the base64 audio data to a Buffer
  const audio = Buffer.from(base64Audio, "base64");

  // Define the file path for storing the temporary WAV file
  const filePath = path.join(process.cwd(), 'input.wav');
  try {
    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);
  } catch (error) {
    console.log("Error writing audio to file:", error);
  }

  try {
    console.log("Processing audio...")
    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}