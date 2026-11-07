"use client";

import { useState } from "react";
import { sendEmailAction } from "@/actions/send-email";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

export default function TestEmail() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSendEmail() {
    setIsLoading(true);

    try {
      const result = await sendEmailAction({
        to: "your-email@gmail.com",
        subject: "Better Auth Test Email",
        html: `
          <h1>Hello!</h1>
          <p>Nodemailer is working successfully.</p>
        `,
      });

      if (result.success) {
        toast.success("Email sent successfully!");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-md p-8 space-y-6 border shadow-xl rounded-2xl bg-card">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Email Configuration
          </h1>

          <p className="text-sm text-muted-foreground">
            Test your Nodemailer SMTP connection by sending an email.
          </p>
        </div>

        <Button
          onClick={handleSendEmail}
          disabled={isLoading}
          className="w-full h-12 rounded-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Email...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Send Test Email
            </>
          )}
        </Button>
      </div>
    </div>
  );
}