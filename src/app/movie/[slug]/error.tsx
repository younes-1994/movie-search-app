"use client";
import CustomError from "@/components/next/custom-error";
import { Empty } from "@/components/ui/empty";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Empty>
      <CustomError error={error} reset={reset} />
    </Empty>
  );
}
