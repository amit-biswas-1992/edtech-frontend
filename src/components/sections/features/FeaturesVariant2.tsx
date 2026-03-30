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
  title: "Why Choose Us",
  subtitle:
    "Discover what makes our institution stand out from the rest.",
  items: [
    {
      title: "Expert Faculty",
      description:
        "Learn from industry-leading educators with years of experience in their respective fields. Our faculty members are dedicated to nurturing the next generation of leaders.",
      icon: "academic",
    },
    {
      title: "Modern Curriculum",
      description:
        "Stay ahead with our constantly updated, industry-relevant courses designed in collaboration with leading companies and organizations.",
      icon: "book",
    },
    {
      title: "Flexible Learning",
      description:
        "Study at your own pace with online and offline options. Our hybrid model ensures you never miss a class regardless of your schedule.",
      icon: "clock",
    },
    {
      title: "Career Support",
      description:
        "Get placement assistance and career guidance from day one. Our dedicated career services team works tirelessly to connect you with top employers.",
      icon: "briefcase",
    },
  ],
};

function getIcon(icon: string, color: string) {
  const props = {
    className: "w-10 h-10",
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

export default function FeaturesVariant2({
  content,
  colorTheme,
}: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes featAltSlideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes featAltSlideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes featAltBarGrow {
          from { width: 0; }
          to { width: 60px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="h-[2px] rounded-full"
              style={{
                backgroundColor: colorTheme.primary,
                animation: "featAltBarGrow 0.6s ease-out both",
              }}
            />
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: colorTheme.primary }}
            >
              Features
            </span>
            <div
              className="h-[2px] rounded-full"
              style={{
                backgroundColor: colorTheme.primary,
                animation: "featAltBarGrow 0.6s ease-out both",
              }}
            />
          </div>

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

        {/* Alternating rows */}
        <div className="space-y-20">
          {items.map(
            (
              item: { title: string; description: string; icon: string },
              i: number
            ) => {
              const isEven = i % 2 === 0;
              const delay = `${0.2 + i * 0.15}s`;

              return (
                <div
                  key={i}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 lg:gap-20`}
                  style={{
                    animation: `${
                      isEven ? "featAltSlideLeft" : "featAltSlideRight"
                    } 0.7s ease-out ${delay} both`,
                  }}
                >
                  {/* Image/Icon placeholder */}
                  <div className="flex-1 w-full max-w-lg">
                    <div
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group"
                      style={{
                        background: `linear-gradient(135deg, ${colorTheme.primary}08, ${colorTheme.secondary}12, ${colorTheme.accent}08)`,
                        border: `1px solid ${colorTheme.primary}10`,
                      }}
                    >
                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `linear-gradient(${colorTheme.primary} 1px, transparent 1px), linear-gradient(90deg, ${colorTheme.primary} 1px, transparent 1px)`,
                          backgroundSize: "32px 32px",
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-24 h-24 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `linear-gradient(135deg, ${colorTheme.primary}15, ${colorTheme.accent}15)`,
                            border: `2px solid ${colorTheme.primary}20`,
                          }}
                        >
                          {getIcon(item.icon, colorTheme.primary)}
                        </div>
                      </div>

                      {/* Number badge */}
                      <div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: `${colorTheme.primary}12`,
                          color: colorTheme.primary,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-[2px] rounded-full"
                        style={{ backgroundColor: colorTheme.primary }}
                      />
                      <span
                        className="text-xs font-bold tracking-[0.15em] uppercase"
                        style={{ color: colorTheme.primary }}
                      >
                        Feature {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-bold mb-4"
                      style={{ color: colorTheme.text }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: `${colorTheme.text}99` }}
                    >
                      {item.description}
                    </p>

                    {/* Decorative accent bar */}
                    <div
                      className="w-16 h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
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
