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
  subtitle: "Discover what makes our institution stand out from the rest.",
  items: [
    { title: "Expert Faculty", description: "Learn from industry-leading educators with years of experience.", icon: "academic" },
    { title: "Modern Curriculum", description: "Stay ahead with our constantly updated, industry-relevant courses.", icon: "book" },
    { title: "Flexible Learning", description: "Study at your own pace with online and offline options.", icon: "clock" },
    { title: "Career Support", description: "Get placement assistance and career guidance from day one.", icon: "briefcase" },
  ],
};

function getIcon(icon: string, color: string) {
  const props = { className: "w-8 h-8", fill: "none", stroke: color, viewBox: "0 0 24 24", strokeWidth: 1.5 };
  switch (icon) {
    case "academic":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case "book":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
    case "clock":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case "briefcase":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
    default:
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>;
  }
}

export default function FeaturesVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colorTheme.primary }}>
            {c.title}
          </h2>
          {c.subtitle && (
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${colorTheme.text}bb` }}>
              {c.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-5">
          {items.map((item: { title: string; description: string; icon: string }, i: number) => (
            <div
              key={i}
              className="flex items-start gap-6 p-6 rounded-xl transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: `${colorTheme.primary}05`,
                border: `1px solid ${colorTheme.primary}10`,
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${colorTheme.accent}12`,
                  border: `1px solid ${colorTheme.accent}20`,
                }}
              >
                {getIcon(item.icon, colorTheme.accent)}
              </div>

              {/* Text */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold mb-2" style={{ color: colorTheme.primary }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: `${colorTheme.text}bb` }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
