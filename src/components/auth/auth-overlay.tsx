"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface AuthOverlayProps {
  isAuthenticated: boolean;
  onAuthenticate: () => void;
  children: React.ReactNode;
}

const CORRECT_PASSKEY = "0000";

export function AuthOverlay({ isAuthenticated, onAuthenticate, children }: AuthOverlayProps) {
  const [otp, setOtp] = useState("");
  const [validationState, setValidationState] = useState<"idle" | "success" | "error">("idle");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (otp.length === 4) {
      if (otp === CORRECT_PASSKEY) {
        setValidationState("success");
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onAuthenticate();
          }, 300);
        }, 500);
      } else {
        setValidationState("error");
        setTimeout(() => {
          setValidationState("idle");
          setOtp("");
        }, 1000);
      }
    }
  }, [otp, onAuthenticate]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.4 
              }}
              className="relative z-10 flex flex-col items-center gap-6 rounded-xl bg-card p-8 shadow-2xl border"
            >
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Enter Passkey</h2>
                <p className="text-muted-foreground">Please enter your 4-digit passkey to access the calendar</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={setOtp}
                  className={cn(
                    "transition-all duration-200",
                    validationState === "error" && "animate-pulse"
                  )}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={cn(
                          "h-12 w-12 text-lg transition-all duration-200",
                          validationState === "success" && "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400",
                          validationState === "error" && "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500"
                        )}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
