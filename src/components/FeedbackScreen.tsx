"use client";
import { FC, useState } from "react";
import { motion } from "framer-motion";

type Feedback = {
  persona: string;
  feedback: string;
};

const avatars: Record<string, string> = {
  enthusiastic: "😄",
  skeptical: "🤔",
  professional: "🧑‍💼",
  random: "🎲",
};

const personaStyles: Record<string, string> = {
  enthusiastic: "bg-green-100 border-green-300",
  skeptical: "bg-yellow-100 border-yellow-300",
  professional: "bg-blue-100 border-blue-300",
  random: "bg-purple-100 border-purple-300",
};

const FeedbackScreen: FC<{
  data: any;
  feedback: Feedback[];
  onBack: () => void;
}> = ({ data, feedback, onBack }) => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (persona: string) => {
    setExpanded((prev) => ({ ...prev, [persona]: !prev[persona] }));
  };

  const visibleFeedback = selectedPersona
    ? feedback.filter((f) => f.persona === selectedPersona)
    : feedback;

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded shadow space-y-4 text-black w-full">
      <h2 className="text-2xl font-bold mb-2">🤖 Simulated Feedback</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedPersona(null)}
          className={`px-3 py-1 rounded border ${
            selectedPersona === null ? "bg-black text-white" : "bg-white"
          }`}
        >
          All
        </button>
        {Array.from(new Set(feedback.map((f) => f.persona))).map((persona) => (
          <button
            key={persona}
            onClick={() => setSelectedPersona(persona)}
            className={`capitalize px-3 py-1 rounded border ${
              selectedPersona === persona
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {persona}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {visibleFeedback.map((item, index) => {
          const isExpanded = expanded[item.persona];
          const content =
            !isExpanded && item.feedback.length > 300
              ? item.feedback.slice(0, 300) + "..."
              : item.feedback;

          return (
            <motion.div
            key={`${item.persona}-${index}`}
            initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl shadow border flex flex-col ${
                personaStyles[item.persona] || "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{avatars[item.persona]}</span>
                <h3 className="font-bold capitalize text-lg">
                  {item.persona} feedback
                </h3>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
              {item.feedback.length > 300 && (
                <button
                  onClick={() => toggleExpand(item.persona)}
                  className="text-sm text-blue-600 hover:underline mt-1 self-start"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Back */}
      <div className="pt-4">
        <button
          onClick={onBack}
          className="bg-white border px-4 py-2 rounded hover:bg-gray-200"
        >
          ⬅️ Back
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
