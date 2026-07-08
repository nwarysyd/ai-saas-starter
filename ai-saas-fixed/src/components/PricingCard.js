"use client";

import { FaCheck, FaArrowRight } from "react-icons/fa";

export default function PricingCard({ plan, isPopular, onPurchase, isLoading }) {
  return (
    <div
      className={`relative bg-bg-card border rounded-xl p-8 flex flex-col justify-between gap-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isPopular 
          ? "border-primary shadow-xl shadow-primary/10 scale-105 ring-1 ring-primary/20" 
          : "border-divider/50 shadow-lg"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-pink-600 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-lg">
          Most Popular ⭐
        </div>
      )}

      <div className="space-y-6">
        {/* Plan Header */}
        <div className="space-y-3">
          <h3 className="text-lg font-black uppercase tracking-wider text-primary-text">
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">${plan.price}</span>
            <span className="text-sm text-secondary-text">/one-time</span>
          </div>
        </div>

        {/* Credits Display */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-xs text-secondary-text font-semibold mb-1">AI Credits</p>
          <p className="text-3xl font-black text-primary">{plan.credits}</p>
          <p className="text-xs text-secondary-text font-medium mt-2">
            Forever access to your credits
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary-text leading-relaxed min-h-[3rem]">
          {plan.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 border-t border-divider/30 pt-6">
          {[
            "Dynamic aspect ratios",
            "HD downloads",
            "Commercial license",
            "Priority support"
          ].map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-secondary-text">
              <FaCheck className="text-primary text-xs flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Purchase Button */}
      <button
        onClick={() => onPurchase(plan.id)}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] ${
          isPopular
            ? "bg-gradient-to-r from-primary to-pink-600 text-white hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70"
            : "bg-bg-page hover:bg-bg-card text-primary-text border border-divider"
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Get Started
            <FaArrowRight size={14} />
          </>
        )}
      </button>
    </div>
  );
}
