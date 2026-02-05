import React from "react";
import { APP_NAME } from "@/lib/utils";
import {
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  Gift,
  Target,
} from "lucide-react";
import Link from "next/link";

const Affiliate = () => {
  return (
    <div className="mt-20 bg-background text-foreground">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-light-purple bg-clip-text text-transparent">
            Earn While You Share
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Join our transparent referral program and turn your network into a
            lucrative side hustle. Earn commissions when the people you refer
            start investing with {APP_NAME}.
          </p>
          <div>
            <Link href="/sign-in">
              <button className="bg-crypto-purple text-white cursor-pointer font-semibold px-8 py-2 rounded-lg hover:bg-crypto-purple/80 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
          <div className="inline-flex items-center mt-4 gap-2 bg-crypto-purple/10 text-crypto-purple px-4 py-2 rounded-full text-sm font-medium">
            <Gift className="h-4 w-4" />
            No Limits • Transparent • Real Earnings
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-card border border-border rounded-lg p-8 mb-6">
                <div className="bg-crypto-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-crypto-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  1. Share Your Link
                </h3>
                <p className="text-foreground/70">
                  Get your unique referral link and share it with friends,
                  family, and your network. Anyone who signs up through your
                  link becomes your referral.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-card border border-border rounded-lg p-8 mb-6">
                <div className="bg-crypto-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-crypto-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. They Invest</h3>
                <p className="text-foreground/70">
                  Your referrals complete KYC verification and make their first
                  investment. You earn a commission only when they actively
                  invest in our platform.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-card border border-border rounded-lg p-8 mb-6">
                <div className="bg-crypto-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-crypto-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. You Earn</h3>
                <p className="text-foreground/70">
                  Receive a percentage of their investment amount directly to
                  your account. Earnings are credited instantly and there's no
                  limit to how many people you can refer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <TrendingUp className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Unlimited Referrals
              </h3>
              <p className="text-foreground/70 text-sm">
                There's no cap on how many people you can refer. The more you
                share, the more you earn.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Shield className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Transparent</h3>
              <p className="text-foreground/70 text-sm">
                Track all your referrals and earnings in real-time. No hidden
                fees or complicated calculations.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <DollarSign className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Payouts</h3>
              <p className="text-foreground/70 text-sm">
                Commissions are credited to your account immediately when your
                referrals invest.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Users className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Passive Income</h3>
              <p className="text-foreground/70 text-sm">
                Build a network that works for you 24/7. Your referrals can
                generate ongoing earnings.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Gift className="h-8 w-8 text-pink-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Investment Required
              </h3>
              <p className="text-foreground/70 text-sm">
                Start earning commissions without investing any money yourself.
                Just share and earn.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Target className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Performance-Based</h3>
              <p className="text-foreground/70 text-sm">
                You only earn when your referrals actually invest. Quality
                referrals mean real rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-16">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">
              Important Program Rules
            </h3>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You earn commissions only when referred users complete their
                  first investment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Commission rates are competitive and clearly displayed in your
                  dashboard
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All referrals must comply with our terms of service and
                  complete KYC verification
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Fraudulent referrals or spam will result in account suspension
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-crypto-purple rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already building their passive
              income through our referral program. Your network is your n et
              worth.
            </p>
            <Link
              href="/sign-in"
              className="bg-white text-crypto-purple font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Your Referral Link
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
