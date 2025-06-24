"use client";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import FeedbackScreen from "@/components/FeedbackScreen";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [feedback, setFeedback] = useState<
    { persona: string; feedback: string }[]
  >([]); 

  const handleSubmit = async (data: any) => {
    setFormData(data);
    setSubmitted(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setFeedback(json.results);
  };

  const handleBack = () => {
    setSubmitted(false);
    setFormData(null);
    setFeedback([]);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <ProductForm onSubmit={handleSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackScreen
              data={formData}
              feedback={feedback}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}