import {
  Brain,
  ShieldCheck,
  Eye,
  Clock,
  LineChart,
  ListChecks,
  Lock,
  AlertTriangle,
  Sparkles,
  Target,
  Activity,
  Fingerprint,
} from "lucide-react";
import { APP_NAME } from "@/lib/utils";

const AboutUs = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ─── Hero Statement ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-crypto-blue via-[#252A3C] to-[#1E2233]">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crypto-light-purple/8 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="text-xs font-medium text-crypto-purple mr-2">
                About Us
              </span>
              <span className="text-xs text-gray-300">Our Story & Vision</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Is Changing the World.{" "}
              <span className="text-gradient">We Made It Work for You.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              While others debated the future of artificial intelligence, we
              built something real, a platform that puts the power of AI trading
              in the hands of everyday people, not just Wall Street.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Subtle Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-crypto-purple/30 to-transparent" />

      {/* ─── Our Mission ─── */}
      <section className="py-24 bg-gradient-to-b from-[#1E2233] to-[#12141C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Mission
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Making intelligent trading accessible to everyone, not just
              experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 animate-on-scroll"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-crypto-purple/20 rounded-lg w-12 h-12 flex items-center justify-center mb-6 text-crypto-purple">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                The Problem We Saw
              </h3>
              <p className="text-gray-400 leading-relaxed">
                AI is reshaping entire industries — finance, healthcare,
                logistics. Yet most people feel uncertain or left behind.
                Trading, in particular, remains intimidating: complex charts,
                volatile markets, and steep learning curves keep everyday
                individuals on the sidelines.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 animate-on-scroll"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-crypto-purple/20 rounded-lg w-12 h-12 flex items-center justify-center mb-6 text-crypto-purple">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                What We Built
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We built {APP_NAME} to bridge that gap. Our goal is
                straightforward: remove the complexity from trading and let AI
                do the heavy lifting. No jargon, no guesswork — just a
                structured, data-driven approach that works quietly in the
                background on your behalf.
              </p>
            </div>
          </div>

          {/* Quote Block */}
          <div
            className="max-w-3xl mx-auto mt-12 animate-on-scroll"
            style={{ animationDelay: "0.3s" }}
          >
            <blockquote className="relative bg-white/5 backdrop-blur-sm border border-crypto-purple/20 rounded-xl p-8 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crypto-blue px-4">
                <span className="text-crypto-purple text-3xl font-serif">
                  &ldquo;
                </span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
                We don&apos;t believe AI should replace opportunity, we believe
                it should create it. For everyone.
              </p>
              <footer className="mt-4 text-sm text-crypto-purple font-medium">
                — The {APP_NAME} Team
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── Subtle Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ─── How Our AI Thinks ─── */}
      <section className="py-24 bg-gradient-to-b from-[#12141C] to-crypto-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              How Our AI Thinks
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transparent, disciplined, and rules-based — our AI operates with
              the precision of an institutional trading desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <LineChart className="h-6 w-6" />,
                title: "Multi-Market Analysis",
                description:
                  "The AI continuously scans and analyzes multiple financial markets, processing vast amounts of data to identify patterns and short-term opportunities that human traders might miss.",
              },
              {
                icon: <Activity className="h-6 w-6" />,
                title: "Data-Driven Execution",
                description:
                  "Every trade is triggered by data, not emotion. The AI evaluates technical indicators, market sentiment, and historical patterns before executing any position automatically.",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Disciplined Decision Making",
                description:
                  "Our AI follows structured, rule-based logic. It doesn't chase trends or make impulsive moves. If the conditions are not favorable, it simply does not trade.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Risk-Aware Architecture",
                description:
                  "Every decision passes through multiple risk filters. The AI prioritizes capital preservation and avoids overexposure, maintaining a balanced and measured approach at all times.",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "24/7 Market Monitoring",
                description:
                  "Markets don't sleep, and neither does our AI. It operates around the clock, monitoring conditions in real time and acting on opportunities as they emerge — day or night.",
              },
              {
                icon: <ListChecks className="h-6 w-6" />,
                title: "Structured Methodology",
                description:
                  "No guesswork. No gambling. The AI uses a systematic methodology built on quantitative analysis, backtested across multiple market conditions before going live.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-crypto-purple/5 group animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-crypto-purple/20 rounded-lg w-12 h-12 flex items-center justify-center mb-5 text-crypto-purple group-hover:bg-crypto-purple/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Subtle Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-crypto-purple/30 to-transparent" />

      {/* ─── Why Trust Us ─── */}
      <section className="py-24 bg-gradient-to-b from-crypto-blue to-[#12141C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Why Trust Us
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trust isn&apos;t claimed — it&apos;s earned. Here&apos;s how we
              build it, every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Fingerprint className="h-6 w-6" />,
                title: "Extensive Internal Testing",
                description:
                  "Before any strategy goes live, it undergoes rigorous internal testing across different market conditions. We don't release anything until we're confident in its stability.",
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Transparent Daily Visibility",
                description:
                  "Every day, you can see exactly how your investment is performing. No hidden figures, no delayed reports — real-time earnings visibility you can check anytime.",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Fixed Trading Periods",
                description:
                  "Choose from structured 30, 60, or 90-day trading periods. This gives the AI enough time to operate within a disciplined framework without constant user interference.",
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: "AI-Only Decisions",
                description:
                  "Once your capital is allocated, all trading decisions are made exclusively by the AI. No human interference, no emotional overrides — pure algorithmic discipline.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group animate-on-scroll"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-crypto-purple/20 rounded-lg w-12 h-12 flex items-center justify-center mb-6 text-crypto-purple group-hover:bg-crypto-purple/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Our Commitment Card */}
          <div
            className="max-w-3xl mx-auto mt-12 animate-on-scroll"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-gradient-to-r from-crypto-purple/10 to-crypto-light-purple/5 backdrop-blur-sm border border-crypto-purple/20 rounded-xl p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-crypto-purple/20 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-crypto-purple" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Our Commitment
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Built with transparency in mind. Every trade is logged,
                    every transaction is tracked, and your complete history is
                    available at all times. We believe structure and discipline
                    are the foundation of lasting trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Subtle Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ─── Free & Scam Protection Note ─── */}
      <section className="py-24 bg-[#12141C]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Free Access & Your Protection
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Clarity is a cornerstone of our platform. Here&apos;s what you
                need to know.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10 animate-on-scroll"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Access */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-lg w-10 h-10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Completely Free to Use
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {APP_NAME} does not charge any fees to access our AI trading
                    engine. There are no subscriptions, no hidden costs, and no
                    premium tiers. You simply allocate capital to your trading
                    account, and the AI handles everything from there.
                  </p>
                </div>

                {/* Scam Protection */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-500/20 rounded-lg w-10 h-10 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Protect Yourself
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    If anyone contacts you asking for payment to
                    &ldquo;unlock&rdquo; or &ldquo;activate&rdquo; the{" "}
                    {APP_NAME} AI, they are not affiliated with us. We will
                    never ask for external payments outside of our platform. If
                    something feels off, reach out to our official support team
                    directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Subtle Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-crypto-purple/30 to-transparent" />

      {/* ─── Closing Statement ─── */}
      <section className="py-24 bg-gradient-to-b from-[#12141C] to-crypto-blue relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute max-md:hidden inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let AI Handle the{" "}
              <span className="text-gradient">Complexity</span>
            </h2>

            <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
              We built technology that works quietly in the background while you
              focus on life. No noise, no hype, just a reliable system designed
              to navigate markets on your behalf.
            </p>

            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              AI shouldn&apos;t replace opportunity, it should create it.
              That&apos;s the principle behind everything we do at {APP_NAME}.
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-crypto-purple font-medium bg-crypto-purple/10 border border-crypto-purple/20 rounded-full px-5 py-2">
              <ShieldCheck className="h-4 w-4" />
              Built with transparency in mind
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
