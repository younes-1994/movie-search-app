"use client";
import { useEffect } from "react";
import { House, RotateCw } from "lucide-react";

import { CustomLink } from "@/components/next/custom-link";
import { Button } from "@/components/ui/button";

export default function CustomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mb-3">{error?.message || "Something went wrong!"}</h2>
      <Button className="mb-3" onClick={() => reset()}>
        <RotateCw />
        <p className="ms-2">Try again</p>
      </Button>
      <CustomLink href="/">
        <Button className="mb-3">
          <House />
          <p className="ms-2">Go to Home</p>
        </Button>
      </CustomLink>
    </div>
  );
}
