"use client";

import { useState, useRef } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next";
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
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const abortController = new AbortController();

  // Get signature from backend
  const authenticator = async () => {
    const res = await fetch("/api/imagekit-auth");
    if (!res.ok) throw new Error("Failed to get authentication params");
    return res.json();
  };

  const handleUpload = async () => {
    if (!idFile || !selfieFile) {
      toast.error("Please upload both ID and selfie before submitting.");
      return;
    }

    try {
      setStatus("pending");
      setProgress(0);

      const uploadFile = async (file: File) => {
        // ✅ fetch fresh credentials for every upload
        const { signature, expire, token, publicKey } = await authenticator();

        return upload({
          file,
          fileName: file.name,
          signature,
          expire,
          token,
          publicKey,
          folder: "/kyc",
          onProgress: (evt) =>
            setProgress(Math.round((evt.loaded / evt.total) * 100)),
          abortSignal: abortController.signal,
        });
      };

      // ✅ both uploads now have unique tokens
      const [idResponse, selfieResponse] = await Promise.all([
        uploadFile(idFile),
        uploadFile(selfieFile),
      ]);

      console.log("Uploaded:", {
        idUrl: idResponse.url,
        selfieUrl: selfieResponse.url,
      });

      setStatus("success");
      setIdFile(null);
      setSelfieFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unexpected error during upload."
      );
      setStatus("idle");
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
          Upload your valid ID and selfie for verification. Only verified users
          can invest or withdraw.
        </p>

        {/* Upload inputs */}
        {[
          { label: "Government ID (front)", setter: setIdFile, file: idFile },
          {
            label: "Government ID (bacl)",
            setter: setSelfieFile,
            file: selfieFile,
          },
        ].map(({ label, setter, file }, i) => (
          <div key={i} className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">{label}</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setter(e.target.files?.[0] || null)}
              className="bg-black/20 border-gray-700 text-white"
            />
            {file && (
              <div className="relative w-full h-32 border border-gray-700 rounded-md overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`${label} preview`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}

        {status === "pending" && (
          <>
            <Progress value={progress} className="h-2 bg-gray-700" />
            <p className="text-xs text-gray-400 mt-1">{progress}% uploaded</p>
          </>
        )}

        {status === "success" && (
          <Alert className="bg-green-500/20 border border-green-600 text-green-300">
            <AlertDescription className="text-center">
              Document uploaded successfully 🎉, Awaiting verification.
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
