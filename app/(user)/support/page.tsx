//@ts-nocheck

"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/utils";

export default function SupportPage() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Avoid loading the script twice
    if (scriptLoaded.current) return;

    // Create the tawk.to script element
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6997727604b3791c3bb9aa46/1jhrpe8ad";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Once script is loaded, we can optionally do something
    script.onload = () => {
      scriptLoaded.current = true;
      // Ensure the widget is visible (it is by default) and adjust position
      if (window.Tawk_API) {
        window.Tawk_API.showWidget();
        // You can also pre-hide if needed: window.Tawk_API.hideWidget();
      }
    };

    document.body.appendChild(script);

    // Cleanup: hide the widget and remove the script when leaving the page
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
      // Remove the script tag (optional, but helps keep DOM clean)
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      scriptLoaded.current = false;
    };
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    } else {
      // If API not ready yet, wait a bit or show a toast
      console.warn("Chat not loaded yet");
    }
  };

  return (
    <div className="bg-crypto-blue/5 p-4 md:p-6">
      <div className="max-w-2xl space-y-6">
        {/* Header */}
        <div className="bg-crypto-blue/40 border border-crypto-blue rounded-lg text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Support</h1>
          <p className="text-gray-300">
            Need help with your account, trades, or anything else? Our team is
            here for you.
          </p>
        </div>

        {/* Chat Card */}
        <div className="bg-crypto-blue/40 border border-crypto-blue rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-crypto-blue/30 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-crypto-blue" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Live Chat Support
              </h2>
              <p className="text-sm text-gray-400">
                Available 24/7 for urgent issues
              </p>
            </div>
          </div>

          <Button onClick={openChat} className="w-full purple-btn">
            Start Live Chat
          </Button>
        </div>

        {/* Additional options (optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-crypto-blue/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Email Us</h3>
            <p className="text-sm text-gray-400 mb-3">
              For non-urgent inquiries, drop us an email.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-white font-medium hover:underline text-sm"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div className="bg-gray-900 border border-crypto-blue/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">FAQ</h3>
            <p className="text-sm text-gray-400 mb-3">
              Check our frequently asked questions for quick answers.
            </p>
            <Button variant="link" className="p-0 h-auto">
              Visit FAQ →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
