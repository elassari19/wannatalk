"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64, createMediaStream } from "@/lib/audioHelper";

export const useRecordVoice = () => {
  const [transcript, setTranscript] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [status, setStatus] = useState<string>('idle');
  const isRecording = useRef(false);
  const chunks = useRef([]);

  const startRecording = () => {
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setStatus('recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setStatus('stopped');
    }
  };

  const getText = async (base64data: any) => {
    setTranscript("loading");
    try {
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());
      const { text } = response;
      setTranscript(text);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream: any) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream)
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      // @ts-ignore
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      console.log('audioBlob', audioBlob)
      blobToBase64(audioBlob, getText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);

  return { status, setStatus, startRecording, stopRecording, transcript };
};