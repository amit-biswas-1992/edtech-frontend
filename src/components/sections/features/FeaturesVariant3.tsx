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
  title: "আমাদের বৈশিষ্ট্যসমূহ",
  subtitle: "আমাদের প্রতিষ্ঠানকে অন্যদের থেকে আলাদা করে কী তা জানুন।",
  items: [
    {
      title: "অভিজ্ঞ শিক্ষক",
      description: "বহু বছরের অভিজ্ঞতা সম্পন্ন শিক্ষকদের কাছ থেকে শিখুন।",
      icon: "academic",
    },
    {
      title: "আধুনিক পাঠ্যক্রম",
      description: "ক্রমাগত আপডেট করা, শিল্প-প্রাসঙ্গিক কোর্স।",
      icon: "book",
    },
    {
      title: "নমনীয় শিক্ষা",
      description: "অনলাইন ও অফলাইন বিকল্পের মাধ্যমে নিজের গতিতে পড়ুন।",
      icon: "clock",
    },
    {
      title: "ক্যারিয়ার সহায়তা",
      description: "প্রথম দিন থেকেই প্লেসমেন্ট সহায়তা ও গাইডেন্স।",
      icon: "briefcase",
    },
  ],
};

function getIcon(icon: string, color: string) {
  const props = {
    className: "w-7 h-7",
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
    default:
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      );
  }
}

// Bento layout: assign sizes based on index
function getBentoClass(index: number, total: number): string {
  if (total <= 2) return "col-span-1";
  if (total === 3) {
    if (index === 0) return "sm:col-span-2 sm:row-span-2";
    return "col-span-1";
  }
  // 4+ items: first is large, others fill
  if (index === 0) return "sm:col-span-2 sm:row-span-2";
  if (index === total - 1 && total % 2 === 0) return "sm:col-span-2";
  return "col-span-1";
}

const bentoColors = [
  { bg: "12", border: "18" },
  { bg: "08", border: "14" },
  { bg: "10", border: "16" },
  { bg: "06", border: "12" },
];

export default function FeaturesVariant3({
  content,
  colorTheme,
}: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  const colorCycle = [
    colorTheme.primary,
    colorTheme.accent,
    colorTheme.secondary,
    colorTheme.primary,
  ];

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes bentoFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bentoShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{ animation: "bentoFadeIn 0.7s ease-out both" }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          {c.subtitle && (
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: `${colorTheme.text}88` }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 auto-rows-[minmax(200px,auto)]">
          {items.map(
            (
              item: { title: string; description: string; icon: string },
              i: number
            ) => {
              const cardColor = colorCycle[i % colorCycle.length];
              const tint = bentoColors[i % bentoColors.length];
              const isLarge = i === 0 && items.length > 2;

              return (
                <div
                  key={i}
                  className={`group relative ${getBentoClass(
                    i,
                    items.length
                  )} rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-default`}
                  style={{
                    backgroundColor: `${cardColor}${tint.bg}`,
                    border: `1px solid ${cardColor}${tint.border}`,
                    animation: `bentoFadeIn 0.6s ease-out ${
                      0.15 + i * 0.1
                    }s both`,
                  }}
                >
                  {/* Shimmer effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cardColor}08, transparent)`,
                      backgroundSize: "200% 100%",
                      animation: "bentoShimmer 2s linear infinite",
                    }}
                  />

                  <div
                    className={`relative z-10 h-full flex flex-col ${
                      isLarge ? "justify-center p-10" : "justify-between p-7"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`${
                        isLarge ? "w-16 h-16 mb-6" : "w-12 h-12 mb-4"
                      } rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      style={{
                        backgroundColor: `${cardColor}18`,
                        border: `1px solid ${cardColor}25`,
                      }}
                    >
                      {getIcon(item.icon, cardColor)}
                    </div>

                    <div>
                      <h3
                        className={`${
                          isLarge ? "text-2xl" : "text-lg"
                        } font-bold mb-2`}
                        style={{ color: colorTheme.text }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`${
                          isLarge ? "text-base" : "text-sm"
                        } leading-relaxed`}
                        style={{ color: `${colorTheme.text}88` }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Corner decoration */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-[0.06] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 100% 0%, ${cardColor}, transparent 70%)`,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
