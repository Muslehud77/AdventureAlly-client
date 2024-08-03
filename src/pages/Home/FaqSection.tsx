import { useState } from "react";

const FaqSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="h-full text-foreground rounded-t-3xl pt-20 py-10">
      <div className="text-center py-10">
        <h1 className="text-3xl md:text-5xl font-light mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl font-light leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          Have questions? We've got answers!
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-foreground inline-flex"></div>
        </div>
      </div>
      <div className="max-w-5xl px-10 mx-auto mt-3">
        {faq.map((q, index) => (
          <div
            key={index}
            className="border-2 bg-background border-gray-100 rounded-lg dark:border-gray-700 mb-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="relative z-1 flex items-center justify-between w-full p-8"
            >
              <h1 className="font-semibold ">{q.question}</h1>
              <span
                className={`rounded-full transition-transform ${
                  expandedIndex === index ? "rotate-45" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`relative z-0 transition-all duration-500 ${
                expandedIndex === index
                  ? "translate-y-0 h-24"
                  : "-translate-y-28 h-0 overflow-hidden opacity-0"
              }`}
            >
              <hr
                className={`border-gray-200 dark:border-gray-700`}
              />
              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {q.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;

export const faq = [
  {
    question: "What is the average shipping time for orders?",
    answer:
      "Orders typically ship within 3-5 business days. Delivery times vary based on location and selected shipping method.",
  },
  {
    question: "Can I return or exchange a product if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day return and exchange policy on most products. Items must be in new and unused condition.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times will vary based on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has shipped, you will receive an email with tracking information. You can also track your order through your account on our website.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods.",
  },
  {
    question: "Are there any discounts for bulk purchases?",
    answer:
      "Yes, we offer discounts for bulk purchases. Please contact our customer service team for more information.",
  },
  {
    question: "How can I be sure the products are high quality?",
    answer:
      "We carefully select and test our products to ensure they meet high-quality standards. Customer reviews and ratings can also help you make informed choices.",
  },
  {
    question: "What should I do if I receive a damaged or defective item?",
    answer:
      "If you receive a damaged or defective item, please contact our customer service team within 7 days of receiving your order for assistance with a replacement or refund.",
  },
];
