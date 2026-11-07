import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Button
      size="sm"
      variant="outline"
      nativeButton={false}
      render={<Link href={href} />}
    >
      <ArrowLeftIcon />
      {label}
    </Button>
  );
};