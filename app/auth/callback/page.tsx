"use client";

import { use } from "react";
import { useBroadcastChannel } from "@/lib/useBroadcastChannel";
import { useMount } from "react-use";

export default function AuthCallback({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  const { code } = use(searchParams);

  const { postMessage } = useBroadcastChannel("auth", () => {});
  useMount(() => {
    console.log("AuthCallback mounted", code);
    if (code) {
      postMessage({
        code: code,
        type: "user-oauth",
      });
      // window.close();
      return;
    }
  });

  return <div>Login in progress ...</div>;
}
