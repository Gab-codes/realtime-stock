import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-crypto-blue to-[#12141C] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Ready to revolutionize your{" "}
            <span className="text-gradient">investment trading</span>?
          </h2>

          <p
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of users who trust {APP_NAME} to trade both
            cryptocurrency and the stock market using advanced AI-driven
            strategies. Our system analyzes the market in real time, executes
            precision trades, and optimizes your returns automatically — no
            experience required.
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
              Create Account
              <ArrowUpRight className="ml-1.5 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
