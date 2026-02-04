import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-crypto-blue to-[#12141C] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute max-md:hidden inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Let AI handle your{" "}
            <span className="text-gradient">trading decisions</span>
          </h2>

          <p
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            With {APP_NAME}, you don’t need to understand markets, charts, or
            strategies. Simply fund your account and let our AI automatically
            identify opportunities, manage risk, and execute trades across
            multiple markets, all in real time.
          </p>

          <Link
            href="/sign-up"
            style={{ animationDelay: "0.6s" }}
            className="animate-fade-in"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-gray-700 w-full text-white hover:bg-white/5 py-6"
            >
              Get Started in Minutes
              <ArrowUpRight className="ml-1.5 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
