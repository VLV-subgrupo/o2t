"use client"

import Image from "next/image";
import CustomButton from "./components/customButton";
import { useState } from "react";

export default function Home() {

  const [text, setText] = useState("Hello World!");

  const handleChangeText = () => {
    setText("Olá Mundo!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className=" text-9xl font-medium">{text}</h1>
      <CustomButton onClick={handleChangeText} />
    </main>
  );
}
