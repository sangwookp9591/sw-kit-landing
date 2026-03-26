"use client";
import { useEffect, useState } from "react";

interface TerminalProps {
  lines: string[];
  loop?: boolean;
  typingSpeed?: number;
  active?: boolean;
}

export function Terminal({
  lines,
  loop = false,
  typingSpeed = 50,
  active = true,
}: TerminalProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!active || lines.length === 0) return;

    // All lines completed
    if (lineIndex >= lines.length) {
      if (loop) {
        const timeout = setTimeout(() => {
          setLineIndex(0);
          setCharIndex(0);
        }, 2000);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const currentLine = lines[lineIndex];

    // Current line fully typed
    if (charIndex >= currentLine.length) {
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Type next character
    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [active, lineIndex, charIndex, lines, loop, typingSpeed]);

  const isComplete = lineIndex >= lines.length;

  return (
    <div className="overflow-hidden rounded-lg bg-aing-dark shadow-lg">
      {/* Header bar */}
      <div className="flex items-center gap-2 bg-[#1E2527] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
      </div>

      {/* Body */}
      <div className="p-4 font-mono text-sm text-gray-300">
        {lines.map((line, i) => {
          if (i > lineIndex) return null;

          const isCurrentLine = i === lineIndex && !isComplete;
          const displayText = isCurrentLine
            ? line.slice(0, charIndex)
            : i < lineIndex || isComplete
              ? line
              : "";

          return (
            <div key={i} className={isCurrentLine ? "text-white" : "text-gray-400"}>
              <TerminalLine text={displayText} />
              {isCurrentLine && (
                <span className="animate-[blink_1s_infinite]">|</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TerminalLine({ text }: { text: string }) {
  if (text.startsWith("$")) {
    return (
      <>
        <span className="text-aing-primary">$</span>
        {text.slice(1)}
      </>
    );
  }
  return <>{text}</>;
}
