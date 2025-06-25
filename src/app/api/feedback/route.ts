// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

const personas = {
  enthusiastic: "Respond enthusiastically, highlighting positives and excitement.",
  skeptical: "Respond skeptically, questioning usefulness or effectiveness.",
  professional: "Respond in a neutral, analytical tone with constructive insights.",
  // random: `Give unpredictable, hilarious, and exaggerated feedback like a chaotic internet user. Make it weird but still mention the product.`,
};

export async function POST(req: NextRequest) {
  const { productName, problem, audience } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ message: "Missing OpenAI API key." }, { status: 500 });
  }

  try {
    const results: { persona: string; feedback: string }[] = [];

    for (const personaKey of Object.keys(personas)) {
      const style = personas[personaKey as keyof typeof personas];

      const prompt = `Imagine you're a ${audience} using a product called ${productName}, designed to solve this problem: "${problem}". ${style} What feedback would you give about the product?`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      // console.log(`💬 [${personaKey}] →`, content);

      if (!content || typeof content !== "string") {
        console.warn(`⚠️ No valid response for [${personaKey}]`);
        continue; // Skip this persona if there's no usable feedback
      }


      // Save each persona result
      await supabase.from("feedbacks").insert([
        {
          product_name: productName,
          problem: problem || null,
          audience: audience || null,
          persona: personaKey,
          feedback: content,
        },
      ]);

      results.push({ persona: personaKey, feedback: content });
    }

    return NextResponse.json({ message: "All feedback saved", results });
  } catch (error) {
    console.error("Error generating persona feedback:", error);
    return NextResponse.json({ message: "Failed to generate feedback" }, { status: 500 });
  }
}
