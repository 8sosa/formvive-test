"use client";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import FeedbackScreen from "@/components/FeedbackScreen";
import { AnimatePresence, motion } from "framer-motion";
import { FeedbackItem, ProductFormData } from "@/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  const handleSubmit = async (data: ProductFormData) => {
    setSubmitted(true);
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setFeedback(json.results);
    setLoading(false);
  };

  const handleBack = () => {
    setSubmitted(false);
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
        ) : loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-gray-600 text-lg"
          >
            Generating feedback...
            <div className="mt-4 animate-pulse text-4xl">⏳</div>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackScreen feedback={feedback} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
