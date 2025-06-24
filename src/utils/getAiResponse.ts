export async function getAIResponse(prompt: string, formData: {
    productName: string;
    problem: string;
    audience: string;
  }): Promise<string> {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        productName: formData.productName,
        problem: formData.problem,
        audience: formData.audience,
      }),
    });
  
    const json = await res.json();
    return json.message;
  }
  