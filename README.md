# 🧠 Formvive-Style Predictive Feedback Simulator

This project simulates predictive user feedback generation based on a product idea, its intended audience, and a defined problem — inspired by Formvive’s dynamic form flow. It uses OpenAI’s GPT models to simulate responses from different personas and saves them to Supabase for storage and analysis.

## 🔧 Tech Stack

* **Next.js 14 (App Router)**
* **TailwindCSS** for styling
* **Framer Motion** for animation
* **Supabase** for database and storage
* **OpenAI GPT-3.5-Turbo** for AI feedback generation
* **Netlify** for deployment

---

## ✅ Problem Statement

> *"How might we simulate user feedback for a startup’s product concept — before it's built — in a way that's fast, dynamic, and persona-aware?"*

We needed a tool that:

* Accepts basic inputs: Product Name, Problem it solves, and Intended Audience
* Generates diverse feedback styles to reflect real-world personalities
* Displays feedback interactively
* Saves the feedback for future analysis

---

## 🚀 Solution Overview

### 1. **Dynamic Form Step**

Users fill in:

* `Product Name`
* `Problem Statement`
* `Target Audience`

A clean form UI was built using React and Tailwind, animated using `Framer Motion` for a smooth transition.

### 2. **Predictive Feedback via AI**

Once the form is submitted:

* We dynamically generate prompts for different **personas**:

  * `Enthusiastic`
  * `Skeptical`
  * `Professional`
  * `Random` (chaotic/troll/meme-style feedback)

* Each prompt is sent to the **OpenAI Chat API**, and responses are collected asynchronously.

* If the `random` persona fails to return a proper response, we retry with a simpler, Gen-Z-style prompt to encourage creativity.

### 3. **Persona-Based Animated Display**

Each feedback is shown on a stylized card:

* Persona avatars (emoji-based)
* Feedback truncation with "Read More"
* Persona tabs for filtering
* Cards animated on entrance for fluid UX

### 4. **Storage in Supabase**

All feedbacks are stored in a Supabase `feedbacks` table with the following schema:

```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  problem TEXT,
  audience TEXT,
  persona TEXT,
  feedback TEXT
);
```

### 5. **Loading State & Error Handling**

A loading state was implemented while feedback is being generated. Errors are logged and gracefully handled — including API key issues, rate limits, or incomplete AI responses.

---

## ✨ Features

* ✅ 4 Feedback Personas with distinct styles
* ✅ “Read More” toggle for long feedbacks
* ✅ Animated transitions for form and cards
* ✅ Avatar icons for each persona
* ✅ Filtering by persona with tabs
* ✅ Real-time saving to Supabase

---

## 📁 Project Structure Highlights

```
src/
  components/
    ProductForm.tsx
    FeedbackScreen.tsx
  app/
    api/feedback/route.ts  ← handles OpenAI + Supabase
  utils/
    supabase.ts
    getAIResponse.ts (legacy)
```

---

## 🛆 How to Run

1. Clone the repo
2. Create `.env.local` with:

   ```env
   OPENAI_API_KEY=your_openai_key
   NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Install dependencies: `npm install`
4. Run the app: `npm run dev`
5. Deploy via Netlify or Vercel

---

## 🌱 Future Ideas

* User authentication (save feedback per user)
* Feedback sentiment analysis
* Shareable feedback summaries
* GPT-4 model option
* Export to PDF/CSV

---

## 🙌 Author

Built by **Emmanuel Amos** — full-stack engineer exploring smart simulations, generative interfaces, and lean validation tools.
