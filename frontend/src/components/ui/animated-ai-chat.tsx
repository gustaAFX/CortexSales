"use client";

import { useEffect, useRef, useCallback, useTransition, useState } from "react";
import * as React from "react";
import { Command, LoaderIcon, Paperclip, SendIcon, Sparkles, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
  icon: React.ReactNode;
  label: string;
  description: string;
  prefix: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cn("relative", containerClassName)}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-violet-500/20 bg-[#080916] px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out placeholder:text-slate-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export function AnimatedAIChat() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 56, maxHeight: 180 });
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  const commandSuggestions: CommandSuggestion[] = [
    { icon: <Sparkles className="h-4 w-4" />, label: "Resumo KPI", description: "Resuma os principais KPI", prefix: "/kpi" },
    { icon: <Command className="h-4 w-4" />, label: "Risco", description: "Sinalize riscos no funil", prefix: "/risk" },
    { icon: <Sparkles className="h-4 w-4" />, label: "Próxima ação", description: "Sugira próxima ação", prefix: "/next" }
  ];

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);
      const matching = commandSuggestions.findIndex((cmd) => cmd.prefix.startsWith(value));
      setActiveSuggestion(matching >= 0 ? matching : -1);
      return;
    }
    setShowCommandPalette(false);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const commandButton = document.querySelector("[data-command-button]");
      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !commandButton?.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCommandSuggestion = (index: number) => {
    const selected = commandSuggestions[index];
    setValue(`${selected.prefix} `);
    setShowCommandPalette(false);
  };

  const handleSendMessage = () => {
    if (!value.trim()) return;
    startTransition(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setValue("");
        adjustHeight(true);
      }, 1800);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showCommandPalette) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) => (prev < commandSuggestions.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : commandSuggestions.length - 1));
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        if (activeSuggestion >= 0) selectCommandSuggestion(activeSuggestion);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    const mockFileName = `analise-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, mockFileName]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-[#070910] p-4 shadow-2xl shadow-violet-950/50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_45%)]" />
      <div className="relative z-10 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80">AI copilot</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Como posso ajudar o time comercial?</h3>
        </div>

        <div className="relative rounded-xl border border-white/10 bg-black/40">
          <AnimatePresence>
            {showCommandPalette && (
              <motion.div
                ref={commandPaletteRef}
                className="absolute left-3 right-3 bottom-full mb-2 overflow-hidden rounded-lg border border-white/10 bg-black/95"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                <div className="py-1">
                  {commandSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.prefix}
                      type="button"
                      onClick={() => selectCommandSuggestion(index)}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors",
                        activeSuggestion === index ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                      )}
                    >
                      <span>{suggestion.icon}</span>
                      <span className="font-medium">{suggestion.label}</span>
                      <span className="ml-auto text-[10px] text-white/40">{suggestion.prefix}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-3">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte algo sobre leads, conversão ou riscos..."
              className="min-h-[56px] resize-none border-none bg-transparent px-2 py-2 text-white/90 placeholder:text-white/30"
              style={{ overflow: "hidden" }}
              showRing={false}
            />
          </div>

          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 px-3 pb-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {attachments.map((file, index) => (
                  <div key={file} className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2 py-1 text-xs text-white/70">
                    <span>{file}</span>
                    <button type="button" onClick={() => removeAttachment(index)} className="text-white/50 hover:text-white">
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-2 border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleAttachFile} className="rounded-md p-2 text-white/50 hover:bg-white/10 hover:text-white">
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                data-command-button
                onClick={() => setShowCommandPalette((prev) => !prev)}
                className={cn(
                  "rounded-md p-2 text-white/50 hover:bg-white/10 hover:text-white",
                  showCommandPalette && "bg-white/10 text-white"
                )}
              >
                <Command className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={isTyping || isPending || !value.trim()}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                value.trim() ? "bg-violet-400 text-black hover:bg-violet-300" : "bg-white/10 text-white/40"
              )}
            >
              {isTyping ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
