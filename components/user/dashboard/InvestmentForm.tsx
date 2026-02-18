"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Lightbulb, Brain } from "lucide-react";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import { createInvestment } from "@/lib/actions/investment.action";
import { useRouter } from "next/navigation";

type Props = {
  depositedBalance: number;
  kycStatus: "verified" | "pending" | "rejected" | "unverified";
};

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randDelay = () => 5000 + Math.floor(Math.random() * 1001);

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const InvestmentForm = ({ depositedBalance, kycStatus }: Props) => {
  const [amount, setAmount] = useState<number | "">("");
  const [days, setDays] = useState(30);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // AI modal states
  const [sequenceMessages, setSequenceMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [confidence, setConfidence] = useState(98); // 97-99
  const [animState, setAnimState] = useState<"bulb" | "brain" | null>("bulb");

  const timerRef = useRef<number | null>(null);

  // Profit configuration
  const profitRates: Record<number, number> = {
    30: 0.2,
    60: 0.25,
    90: 0.3,
  };

  const profitRate = profitRates[days];
  const profit =
    typeof amount === "number"
      ? (amount * profitRate * days).toFixed(2)
      : "0.00";

  // message variants (keeps things fresh)
  const step1Variants = [
    `Analyzing market conditions to craft a strategy targeting ${(
      profitRate * 100
    ).toFixed(0)}% returns.`,
    `Evaluating trading signals and risk metrics to reach ${(
      profitRate * 100
    ).toFixed(0)}% on your capital.`,
    `Running portfolio simulations to design a plan that aims for ${(
      profitRate * 100
    ).toFixed(0)}% growth.`,
  ];

  const step2Variants = [
    `A data-backed growth plan was identified with a ${confidence}% confidence level.`,
    `Model outputs indicate a strong plan with ${confidence}% probability of positive performance.`,
    `Found an approach showing ${confidence}% historical consistency across scenarios.`,
  ];

  const step3Variants = [
    "Finalizing the tailored investment strategy and preparing deployment.",
    "Consolidating results and preparing your personalized execution plan.",
    "Applying final optimizations and ensuring the plan meets safety thresholds.",
  ];

  // Build randomized sequence each invest attempt
  const buildSequence = () => {
    const conf = randInt(97, 99);
    setConfidence(conf);

    // interpolate the percent into step2 variants by replacing placeholder if needed
    const s1 = pick(step1Variants);
    const s2 = pick(step2Variants).replace("${confidence}", `${conf}%`); // just in case
    const s2Interpolated = s2.includes("${confidence}")
      ? s2.replace("${confidence}", `${conf}%`)
      : s2;
    const s3 = pick(step3Variants);

    // sequence: show s1, s2, s3
    return [s1, s2Interpolated, s3];
  };

  // Clear timers and reset
  const cleanup = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setAnimState("bulb");
    setStepIndex(0);
    setSequenceMessages([]);
    setCurrentMessage("");
  };

  const handleInvest = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid investment amount.");
      return;
    }

    if (amount > depositedBalance) {
      toast.error(
        "Insufficient Balance: your deposit cannot cover this investment.",
      );
      return;
    }
    // KYC check
    if (kycStatus === "pending") {
      toast.error("KYC Verification Pending, please wait for approval.");
      return;
    }

    if (kycStatus !== "verified") {
      toast.error("KYC Verification Required, please complete your KYC first.");
      router.push("/kyc");
      return;
    }

    if (amount < 500) {
      toast.error("Minimum investment amount is $500.");
      return;
    }

    // Start AI modal immediately
    const seq = buildSequence(); // builds your randomized messages
    setSequenceMessages(seq);
    setCurrentMessage(seq[0]);
    setStepIndex(1);
    setAnimState("bulb");
    setOpen(true);

    try {
      // Trigger the server action (while animation is running)
      const response = await createInvestment({
        amount,
        days,
        profitRates,
      });

      // If backend failed
      if (!response?.success) {
        throw new Error(response?.error || "Failed to create investment.");
      }

      router.refresh();
      setAmount("");
    } catch (error) {
      console.error("Error creating investment:", error);
      toast.error("Investment failed. Please try again.");

      // stop animation and close modal
      setOpen(false);
      setAnimState(null);
      setCurrentMessage("");
      setStepIndex(0);
    }
  };

  // Manage step transitions
  useEffect(() => {
    if (!open) return;

    // If no sequence yet, nothing to do
    if (!sequenceMessages.length) return;

    // finished all steps -> show success after randomized delay
    if (stepIndex >= sequenceMessages.length) {
      timerRef.current = window.setTimeout(() => {
        if (typeof amount === "number") {
          const formattedAmount = formatPrice(amount);
          const formattedProfit = formatPrice(parseFloat(profit));

          setCurrentMessage(
            `Congratulations, your investment plan is now active. Based on your investment of ${formattedAmount}, our system is projected to generate ${formattedProfit} over the next ${days} days. Earnings will be added to your account automatically.`,
          );
        } else {
          setCurrentMessage(
            "Congratulations — your investment plan is now active.",
          );
        }

        setAnimState("brain");
      }, randDelay());

      return () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      };
    }

    // decide delay:
    const delay = randDelay();

    timerRef.current = window.setTimeout(() => {
      // toggle animation state each step to create bulb<->brain effect
      setAnimState((s) => (s === "bulb" ? "brain" : "bulb"));
      // show the next message
      setCurrentMessage(sequenceMessages[stepIndex]);
      setStepIndex((i) => i + 1);
    }, delay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [stepIndex, open, sequenceMessages]);

  // cleanup on close
  useEffect(() => {
    if (!open) {
      cleanup();
    }
  }, [open]);

  // stop timers on unmount
  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <>
      <Card
        id="invest"
        className="bg-crypto-blue/80 border border-crypto-blue/20 text-white mt-4 md:mt-8"
      >
        <CardHeader className="px-3">
          <CardTitle className="text-xl font-semibold">
            Invest and Let AI Work for You 🤖
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3">
          <p className="text-gray-400 mb-4">
            Enter an amount you’d like to invest. Our AI system will trade
            intelligently and generate consistent daily returns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Amount Input */}
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-400 mb-1">
                Investment Amount ($)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value ? parseFloat(e.target.value) : "")
                }
                className="bg-black/20 border-gray-700 text-white"
              />
            </div>

            {/* Duration Dropdown */}
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-400 mb-1">Duration</label>
              <Select
                value={days.toString()}
                onValueChange={(value) => setDays(parseInt(value, 10))}
              >
                <SelectTrigger className="bg-black/20 border-gray-700 text-white w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] text-gray-200 border border-gray-800">
                  <SelectItem value="30">30 Days (20%)</SelectItem>
                  <SelectItem value="60">60 Days (25%)</SelectItem>
                  <SelectItem value="90">90 Days (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Profit Display */}
          <div className="mb-4">
            <p className="text-gray-300">
              Expected Profit:{" "}
              <span className="font-semibold text-green-400">${profit}</span>
            </p>
            <p className="text-xs text-gray-500">
              (Calculated at {profitRate * 100}% daily for {days} days)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full"
            onClick={handleInvest}
          >
            Start Investment
          </Button>
        </CardContent>
      </Card>

      {/* AI Process Modal */}
      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogContent className=" text-gray-200 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              AI Investment Assistant
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-4 space-y-4">
            {/* Animated icon area */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  currentMessage &&
                    currentMessage.toLowerCase().includes("successfully")
                    ? "animate-none"
                    : "animate-pulse",
                  "p-3 rounded-full bg-gradient-to-br from-yellow-400/5 to-white/2 shadow-sm",
                )}
                aria-hidden
              >
                {/* toggle between icons */}
                <div
                  className="flex items-center justify-center icon-rotate"
                  style={{
                    transform:
                      animState === "brain"
                        ? "rotate(8deg) scale(1.02)"
                        : "rotate(0deg) scale(1)",
                  }}
                >
                  {animState === "bulb" ? (
                    <Lightbulb className="w-12 h-12 text-yellow-400" />
                  ) : (
                    <Brain className="w-12 h-12 text-indigo-300" />
                  )}
                </div>
              </div>
            </div>

            {/* message area */}
            <div className="px-4">
              <p className="text-gray-300 text-sm fade-in">{currentMessage}</p>

              {/* small status row */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {/* progress dots */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.min(stepIndex, 3)
                          ? "bg-emerald-400"
                          : "bg-gray-600/40"
                      }`}
                    />
                  ))}
                </div>

                {/* confidence bubble, shows while processing */}
                <div className="text-xs text-gray-400 px-2 py-1 rounded-md border border-gray-800/60">
                  Confidence:{" "}
                  <span className="font-medium text-gray-200">
                    {confidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* final success icon */}
            {currentMessage &&
              currentMessage.toLowerCase().includes("plan is now active") && (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-8 h-8 animate-bounce text-green-400" />
                  <span className="text-green-300 font-medium">Success</span>
                </div>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestmentForm;
