"use client";

import { FaMagic, FaLightbulb, FaLock, FaDollarSign, FaCompass, FaCheckCircle, FaRocket, FaKey } from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      icon: FaMagic,
      title: "AI Template System",
      description: "Pre-built templates for images, video, audio and chat. Customize them exactly your way."
    },
    {
      icon: FaLightbulb,
      title: "Lightning Fast Deployment",
      description: "Go from idea to live app in minutes. No infrastructure knowledge required."
    },
    {
      icon: FaLock,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted data and 99.9% uptime SLA."
    },
    {
      icon: FaDollarSign,
      title: "Built-in Monetization",
      description: "Integrated credit system with PayPal. Keep 100% of your profits."
    },
    {
      icon: FaCompass,
      title: "Advanced Analytics",
      description: "Track usage, revenue, and user engagement in real-time dashboards."
    },
    {
      icon: FaCheckCircle,
      title: "24/7 Support",
      description: "Dedicated support team ready to help you succeed and scale."
    },
    {
      icon: FaRocket,
      title: "One-Click Deploy",
      description: "Deploy to cloud with one click. Automatic scaling and updates included."
    },
    {
      icon: FaKey,
      title: "API Integration",
      description: "Connect with 50+ AI providers and services seamlessly."
    }
  ];

  return (
    <section id="features" className="w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-divider/30 bg-bg-page/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <FaRocket className="text-primary text-xs" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Powerful Features for Creators
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Everything you need to build, deploy, and monetize your AI applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-bg-card border border-divider/50 rounded-xl p-6 space-y-4 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer"
              >
                <Icon className="text-3xl text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-base font-bold text-primary-text">{feature.title}</h3>
                <p className="text-sm text-secondary-text leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
