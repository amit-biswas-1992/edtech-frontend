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
  title: "সাফল্যের কণ্ঠস্বর",
  subtitle: "যেসব শিক্ষার্থীরা আমাদের প্রোগ্রামের মাধ্যমে তাদের ভবিষ্যৎ গড়েছেন।",
  testimonials: [
    {
      name: "রফিক আহমেদ",
      designation: "বুয়েটে ভর্তি",
      text: "কোচিং সেশনগুলো অসাধারণ ছিল। মাত্র তিন মাসে পদার্থবিজ্ঞানে ৪০% উন্নতি হয়েছে।",
      rating: 5,
      image: "",
    },
    {
      name: "ফাতেমা আক্তার",
      designation: "ঢাকা বিশ্ববিদ্যালয়ে ভর্তি",
      text: "আমার ভর্তি সাফল্যের পুরো কৃতিত্ব এই প্ল্যাটফর্মের। ব্যক্তিগত পড়াশোনার পরিকল্পনা এবং সাপ্তাহিক মক টেস্ট আমাকে আত্মবিশ্বাসী করেছে। মেন্টরিং সেশনগুলো জীবন বদলে দিয়েছে।",
      rating: 5,
      image: "",
    },
    {
      name: "তানভীর হাসান",
      designation: "ঢাকা মেডিকেলে ভর্তি",
      text: "চমৎকার জীববিজ্ঞান ও রসায়ন প্রস্তুতি। মক টেস্টগুলো আসল পরীক্ষার প্রায় হুবহু ছিল।",
      rating: 4,
      image: "",
    },
    {
      name: "নুসরাত জাহান",
      designation: "চুয়েটে ভর্তি",
      text: "দুইবার ব্যর্থ হওয়ার পর আশা হারিয়ে ফেলেছিলাম। এই কোচিং আমার ভিত্তি নতুন করে গড়ে দিয়েছে। শিক্ষকরা কখনো হাল ছাড়েননি।",
      rating: 5,
      image: "",
    },
    {
      name: "ইমরান হোসেন",
      designation: "রাজশাহী বিশ্ববিদ্যালয়ে ভর্তি",
      text: "সাশ্রয়ী, কার্যকর এবং সত্যিকারের যত্নশীল। শিক্ষাজীবনের সেরা বিনিয়োগ।",
      rating: 5,
      image: "",
    },
    {
      name: "সাবরিনা ইসলাম",
      designation: "জাহাঙ্গীরনগরে ভর্তি",
      text: "অনলাইন ক্লাসগুলো সরাসরি ক্লাসের মতোই কার্যকর ছিল। রেকর্ড করা লেকচার পরীক্ষার আগে রিভিশনে অনেক সাহায্য করেছে। ঢাকার বাইরের শিক্ষার্থীদের জন্য অত্যন্ত সুপারিশ করি।",
      rating: 4,
      image: "",
    },
  ],
};

function GoldStar({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-4 h-4"
      style={{
        filter: filled ? "drop-shadow(0 0 3px rgba(245, 158, 11, 0.5))" : "none",
      }}
      fill={filled ? "#F59E0B" : "rgba(255,255,255,0.08)"}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function TestimonialsVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const testimonials = c.testimonials || defaults.testimonials;

  // First testimonial is featured (large), rest are in a grid
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0F",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Top spotlight glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${colorTheme.accent}08, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6"
            style={{
              border: "1px solid rgba(245, 158, 11, 0.25)",
              color: "#F59E0B",
              background: "rgba(245, 158, 11, 0.06)",
            }}
          >
            Testimonials
          </div>
          {c.title && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight"
              style={{ color: "#F4F4F5" }}
            >
              {c.title}
            </h2>
          )}
          {c.subtitle && (
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(244,244,245,0.45)" }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Featured testimonial */}
        {featured && (
          <div
            className="group relative rounded-2xl p-8 sm:p-10 mb-8 transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 0 0 rgba(245,158,11,0), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.2)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(245,158,11,0.05), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(245,158,11,0), inset 0 1px 0 rgba(255,255,255,0.03)";
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Left: Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-500"
                    style={{
                      backgroundColor: featured.image ? "transparent" : "rgba(245,158,11,0.12)",
                      backgroundImage: featured.image ? `url(${featured.image})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "#F59E0B",
                      border: "2px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    {!featured.image && featured.name.charAt(0)}
                  </div>
                  {/* Glow behind avatar */}
                  <div
                    className="absolute -inset-2 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)",
                    }}
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1">
                {/* Large decorative quote */}
                <svg
                  className="w-10 h-10 mb-4"
                  fill="rgba(245,158,11,0.2)"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>

                <p
                  className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-light mb-6"
                  style={{ color: "rgba(244,244,245,0.85)", fontStyle: "italic" }}
                >
                  &ldquo;{featured.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-base" style={{ color: "#F4F4F5" }}>
                      {featured.name}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#F59E0B" }}>
                      {featured.designation}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <GoldStar key={star} filled={star <= (featured.rating || 5)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining testimonials in staggered grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {rest.map(
            (
              t: { name: string; designation: string; text: string; rating?: number; image: string },
              i: number
            ) => (
              <div key={i} className="break-inside-avoid mb-6">
                <div
                  className="group relative rounded-xl p-6 transition-all duration-500"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.15)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(245,158,11,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Star rating */}
                  {t.rating && (
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <GoldStar key={star} filled={star <= t.rating!} />
                      ))}
                    </div>
                  )}

                  <p
                    className="text-sm sm:text-[0.95rem] leading-relaxed mb-5"
                    style={{ color: "rgba(244,244,245,0.65)", fontStyle: "italic" }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: t.image ? "transparent" : "rgba(245,158,11,0.1)",
                        backgroundImage: t.image ? `url(${t.image})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        color: "#F59E0B",
                        border: "1px solid rgba(245,158,11,0.15)",
                      }}
                    >
                      {!t.image && t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#F4F4F5" }}>
                        {t.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(245,158,11,0.7)" }}>
                        {t.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
