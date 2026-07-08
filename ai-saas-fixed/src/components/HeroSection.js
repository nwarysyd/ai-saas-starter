"use client";

import Link from "next/link";
import { FaRocket, FaStar, FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-divider/30 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse-glow" />
      <div className="absolute inset-0 -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
          <FaStar className="text-primary text-sm" />
          <span className="text-sm font-bold text-primary">Trusted by 10,000+ Creators</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance leading-tight">
            Build Custom AI Apps<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-600">
              Without Code
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-secondary-text max-w-2xl text-balance leading-relaxed font-medium">
            Deploy professional AI SaaS applications in minutes. Create image generators, chatbots, video tools and more with our no-code builder.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-full transition-all shadow-lg shadow-primary/30 active:scale-95"
          >
            <FaRocket size={20} />
            Get Started Free
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bg-card border border-divider hover:bg-bg-card/80 text-primary-text text-lg font-bold rounded-full transition-all"
          >
            Learn More
            <FaArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-divider/30">
          {[
            { label: "AI Models", value: "50+" },
            { label: "Deployments", value: "10K+" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-black text-primary">{stat.value}</div>
              <div className="text-xs text-secondary-text font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
