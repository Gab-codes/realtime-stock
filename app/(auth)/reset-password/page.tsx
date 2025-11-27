import React from "react";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { token?: string; email?: string };
}) {
  const props = await searchParams;
  // Accept token and email via searchParams
  const token = props?.token || "";
  const email = props?.email || "";

  // Render client component that handles the form and token submission
  // We pass token/email as props to allow the client to prefill fields.
  // Use dynamic import? For simplicity render a client component below.
  const ClientReset = (await import("./ClientResetPassword")).default;

  return <ClientReset token={token} email={email} />;
}
