"use client";

import React from "react";

interface SectionProps {
  content: Record<string, any>;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    name: string;
  };
  designVariant: number;
}

const defaults = {
  title: "কেন আমাদের বেছে নেবেন",
  subtitle: "আমাদের প্রতিষ্ঠানকে অন্যদের থেকে আলাদা করে কী তা জানুন।",
  items: [
    { title: "অভিজ্ঞ শিক্ষক", description: "বহু বছরের অভিজ্ঞতা সম্পন্ন শিল্প-নেতৃস্থানীয় শিক্ষকদের কাছ থেকে শিখুন।", icon: "academic" },
    { title: "আধুনিক পাঠ্যক্রম", description: "আমাদের ক্রমাগত আপডেট করা, শিল্প-প্রাসঙ্গিক কোর্সের মাধ্যমে এগিয়ে থাকুন।", icon: "book" },
    { title: "নমনীয় শিক্ষা", description: "অনলাইন ও অফলাইন বিকল্পের মাধ্যমে নিজের গতিতে পড়াশোনা করুন।", icon: "clock" },
    { title: "ক্যারিয়ার সহায়তা", description: "প্রথম দিন থেকেই প্লেসমেন্ট সহায়তা ও ক্যারিয়ার গাইডেন্স পান।", icon: "briefcase" },
    { title: "সাশ্রয়ী ফি", description: "নমনীয় পেমেন্ট পরিকল্পনার মাধ্যমে সবার জন্য মানসম্পন্ন শিক্ষা।", icon: "currency" },
    { title: "বিশ্বব্যাপী স্বীকৃতি", description: "বিশ্বজুড়ে নিয়োগকর্তাদের দ্বারা স্বীকৃত সার্টিফিকেট অর্জন করুন।", icon: "globe" },
  ],
};

function getIcon(icon: string, color: string) {
  const props = {
    className: "w-8 h-8",
    fill: "none",
    stroke: color,
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
  };
  switch (icon) {
    case "academic":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      );
    case "currency":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
          />
        </svg>
      );
  }
}

export default function FeaturesVariant1({
  content,
  colorTheme,
}: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colorTheme.background} 0%, ${colorTheme.primary}06 100%)`,
      }}
    >
      <style>{`
        @keyframes featCardUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes featIconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{ animation: "featCardUp 0.7s ease-out both" }}
        >
          <div
            className="inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}12, ${colorTheme.accent}12)`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}15`,
            }}
          >
            Features
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          {c.subtitle && (
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: `${colorTheme.text}99` }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(
            (
              item: { title: string; description: string; icon: string },
              i: number
            ) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-default"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${colorTheme.primary}12`,
                  boxShadow: `0 4px 24px ${colorTheme.primary}06`,
                  animation: `featCardUp 0.7s ease-out ${0.1 + i * 0.1}s both`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${colorTheme.primary}10, transparent 70%)`,
                  }}
                />

                {/* Icon circle */}
                <div className="relative z-10">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${colorTheme.primary}18, ${colorTheme.accent}12)`,
                      border: `2px solid ${colorTheme.primary}20`,
                      animation: `featIconFloat 4s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    {getIcon(item.icon, colorTheme.primary)}
                  </div>

                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: colorTheme.text }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${colorTheme.text}99` }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colorTheme.primary}, transparent)`,
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
