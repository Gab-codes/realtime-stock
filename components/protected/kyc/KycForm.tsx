"use client";

import { useState } from "react";
import { upload } from "@imagekit/next";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { toast } from "sonner";

const KycForm = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [idType, setIdType] = useState<
    "id-card" | "passport" | "driver-license"
  >("id-card");

  const authenticator = async () => {
    const res = await fetch("/api/imagekit-auth");
    if (!res.ok) throw new Error("Failed to get authentication params");
    return res.json();
  };

  // Upload a single file and return the ImageKit response - we call authenticator per file
  const uploadSingleFile = async (
    file: File,
    onProgress: (p: number) => void
  ) => {
    const { signature, expire, token, publicKey } = await authenticator();

    const resp = await upload({
      file,
      fileName: file.name,
      signature,
      expire,
      token,
      publicKey,
      folder: "/kyc",
      onProgress: (evt) => {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      },
    });

    return resp;
  };

  const handleUpload = async () => {
    if (!frontFile || !backFile) {
      toast.error("Please upload both front and back images.");
      return;
    }

    try {
      setStatus("pending");
      setProgress(0);

      // Upload front first (so user sees progress and we can show meaningful messages)
      toast.promise(
        (async () => {
          setProgress(5);
          const frontResp = await uploadSingleFile(frontFile, (p) =>
            setProgress(p / 2)
          );
          // after front uploaded, upload back (use second half of progress)
          const backResp = await uploadSingleFile(backFile, (p) =>
            setProgress(50 + p / 2)
          );

          // extract URLs (ImageKit response shape includes 'url')
          const frontImageUrl = frontResp.url;
          const backImageUrl = backResp.url;

          // send to backend to create KYC record
          const apiRes = await fetch("/api/kyc/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idType,
              frontImageUrl,
              backImageUrl,
            }),
          });

          if (!apiRes.ok) {
            const text = await apiRes.text();
            throw new Error(text || "Failed to submit KYC to server");
          }

          setProgress(100);
          setStatus("success");
          // clear files after success
          setFrontFile(null);
          setBackFile(null);

          return true;
        })(),
        {
          loading: "Uploading and submitting KYC...",
          success: "Document uploaded and submitted for verification 🎉",
          error: (err) => `Upload failed: ${err?.message ?? "Unknown error"}`,
        }
      );
    } catch (err: any) {
      console.error("KYC upload flow error:", err);
      toast.error(err?.message ?? "Unexpected error during KYC upload");
      setStatus("idle");
      setProgress(0);
    }
  };

  return (
    <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          KYC Verification
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-gray-400">
          Upload the front and back of your government ID. We will review and
          verify manually.
        </p>

        <div>
          <label className="text-sm text-gray-300 font-medium">
            Document Type
          </label>
          <div className="mt-2 flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                idType === "id-card" ? "bg-white/6" : "bg-transparent"
              }`}
              onClick={() => setIdType("id-card")}
              type="button"
            >
              ID Card
            </button>
            <button
              className={`px-3 py-1 rounded ${
                idType === "passport" ? "bg-white/6" : "bg-transparent"
              }`}
              onClick={() => setIdType("passport")}
              type="button"
            >
              Passport
            </button>
            <button
              className={`px-3 py-1 rounded ${
                idType === "driver-license" ? "bg-white/6" : "bg-transparent"
              }`}
              onClick={() => setIdType("driver-license")}
              type="button"
            >
              Driver License
            </button>
          </div>
        </div>

        {/* front */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">
            Government ID (front)
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFrontFile(e.target.files?.[0] || null)}
            className="bg-black/20 border-gray-700 text-white"
            disabled={status === "pending"}
          />
          {frontFile && (
            <div className="relative w-full h-32 border border-gray-700 rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(frontFile)}
                alt="front preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* back */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">
            Government ID (back)
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setBackFile(e.target.files?.[0] || null)}
            className="bg-black/20 border-gray-700 text-white"
            disabled={status === "pending"}
          />
          {backFile && (
            <div className="relative w-full h-32 border border-gray-700 rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(backFile)}
                alt="back preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {status === "pending" && (
          <>
            <Progress value={progress} className="h-2 bg-gray-700" />
            <p className="text-xs text-gray-400 mt-1">
              {Math.round(progress)}% uploaded
            </p>
          </>
        )}

        {status === "success" && (
          <Alert className="bg-green-500/20 border border-green-600 text-green-300">
            <AlertDescription className="text-center">
              Document uploaded successfully 🎉, awaiting verification.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleUpload}
          disabled={status === "pending"}
          className="bg-crypto-purple hover:bg-crypto-dark-purple w-full text-white"
        >
          {status === "pending" ? "Uploading..." : "Submit for Verification"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default KycForm;
