import { useEffect, useMemo, useRef, useState } from "react";

/* ----------------------- Normalization helpers ----------------------- */
function normalizeLine(raw: string, opts: { collapseSpaces: boolean; ignoreTrailing: boolean }) {
  let s = raw
    .replace(/\r\n?/g, "\n")          // CRLF/LF -> LF (safety)
    .replace(/\t/g, "  ")             // tabs -> 2 spaces
    // smart quotes -> straight quotes
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'");

  if (opts.collapseSpaces) s = s.replace(/ {2,}/g, " "); // collapse runs of spaces
  if (opts.ignoreTrailing) s = s.replace(/[ \u00A0]+$/g, ""); // ignore trailing spaces
  return s;
}

function charEqual(a: string | undefined, b: string | undefined, strict: boolean) {
  if (a === b) return true;
  if (!strict) {
    // be forgiving about whitespace width
    if ((a === " " || a === "\u00A0") && (b === " " || b === "\u00A0")) return true;
  }
  return false;
}

/* ------------------------- Component props --------------------------- */
type Props = {
  text: string;               // multi-line exercise text
  windowSize?: number;        // how many lines to show (odd number). Default: 3
  strict?: boolean;           // exact match? defaults to forgiving false
  className?: string;
};

export default function InteractiveLineTyper({
  text,
  windowSize = 3,
  strict = false,
  className = ""
}: Props) {
  // normalize entire exercise once
  const lines = useMemo(() =>
    normalizeLine(text, { collapseSpaces: false, ignoreTrailing: false }).split("\n")
  , [text]);

  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  const rawTarget = lines[lineIndex] ?? "";
  // normalize current line for comparison (forgiving by default)
  const target = normalizeLine(rawTarget, {
    collapseSpaces: !strict,
    ignoreTrailing: !strict,
  });

  // compute correctness for currently typed chars
  const decorations = useMemo(() => {
    const arr: ("pending" | "ok" | "bad")[] = [];
    const limit = Math.max(typed.length, target.length);
    for (let i = 0; i < limit; i++) {
      const t = typed[i];
      const g = target[i];
      if (t === undefined) arr.push("pending");
      else arr.push(charEqual(t, g, strict) ? "ok" : "bad");
    }
    return arr;
  }, [typed, target, strict]);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [lineIndex]);

  useEffect(() => {
    const onKey = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      if (done) return;
      if (keyboardEvent.key === "Tab") {
        keyboardEvent.preventDefault();
        setTyped("");
        return;
      }
      if ((keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key === "Enter") {
        keyboardEvent.preventDefault();
        advanceLine();
        return;
      }
      if (keyboardEvent.key === "Backspace") {
        keyboardEvent.preventDefault();
        if (typed.length > 0) setTyped((s) => s.slice(0, -1));
        return;
      }
      if (keyboardEvent.key === "Enter") {
        keyboardEvent.preventDefault();
        advanceLine();
        return;
      }
      if (keyboardEvent.key.length === 1) {
        keyboardEvent.preventDefault();
        if (!startedAt) setStartedAt(Date.now());
        setTyped((s) => s + keyboardEvent.key);

        // auto-advance when precisely finished (forgiving about trailing spaces when not strict)
        const after = typed + keyboardEvent.key;
        const trimmedAfter = strict ? after : after.replace(/[ \u00A0]+$/g, "");
        const trimmedTarget = strict ? target : target.replace(/[ \u00A0]+$/g, "");
        if (trimmedAfter.length === trimmedTarget.length) {
          // match all chars?
          let allOk = true;
          for (let i = 0; i < trimmedTarget.length; i++) {
            if (!charEqual(trimmedAfter[i], trimmedTarget[i], strict)) { allOk = false; break; }
          }
          if (allOk) setTimeout(() => advanceLine(), 0);
        }
      }
    };
    const el = containerRef.current ?? window;
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, target, done, startedAt, strict]);

  function advanceLine() {
    setTyped("");
    if (lineIndex + 1 < lines.length) setLineIndex((i) => i + 1);
    else setDone(true);
  }

  // compute 3-line window (prev, current, next)
  const pad = Math.floor(Math.max(1, windowSize) / 2);
  const start = Math.max(0, lineIndex - pad);
  const end = Math.min(lines.length, lineIndex + pad + 1);
  const windowLines = lines.slice(start, end);

  return (
    <div
      ref={containerRef}
      className={"w-full max-w-3xl mx-auto select-none " + className}
      tabIndex={0}
      aria-label="Interactive line-by-line typing area"
    >
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Line Practice (window {windowLines.length} lines)</h2>
        <div className="text-sm text-gray-600">
          <kbd className="px-1 py-0.5 border rounded">Enter</kbd> next
          <span className="mx-2">•</span>
          <kbd className="px-1 py-0.5 border rounded">Tab</kbd> restart line
          <span className="mx-2">•</span>
          <kbd className="px-1 py-0.5 border rounded">Backspace</kbd> delete
        </div>
      </header>

      <div className="rounded-2xl ring-1 ring-gray-200 bg-white p-4 max-h-[70vh] overflow-auto">
        {windowLines.map((line, idx) => {
          const absoluteIdx = start + idx;
          const isCurrent = absoluteIdx === lineIndex && !done;

          if (!isCurrent) {
            return (
              <LineRow key={absoluteIdx} number={absoluteIdx + 1} className="text-gray-500">
                <span className="whitespace-pre font-mono">{line || " "}</span>
              </LineRow>
            );
          }

          // current line with coloring & caret
          return (
            <LineRow
              key={absoluteIdx}
              number={absoluteIdx + 1}
              className="bg-yellow-50 ring-1 ring-yellow-200"
              innerRef={currentRef}
            >
              <span className="whitespace-pre font-mono">
                {target.split("").map((ch, i) => {
                  const state = decorations[i] ?? "pending";
                  const cls =
                    state === "pending" ? "text-gray-400"
                    : state === "ok" ? "text-green-600"
                    : "text-red-600 underline decoration-red-600";
                  return <span key={i} className={cls}>{ch}</span>;
                })}
                {/* extra typed beyond target */}
                {typed.length > target.length &&
                  <span className="text-red-600 underline decoration-red-600">
                    {typed.slice(target.length)}
                  </span>
                }
                {/* caret */}
                <span className="inline-block w-0.5 h-5 align-text-bottom bg-black animate-pulse" />
              </span>
            </LineRow>
          );
        })}
      </div>

      {done && (
        <div className="mt-4 rounded-xl p-3 bg-emerald-50 ring-1 ring-emerald-200">
          <div className="font-medium">Exercise complete. Press Tab to restart a line or refresh to start over.</div>
        </div>
      )}
    </div>
  );
}

function LineRow({
  number,
  children,
  className = "",
  innerRef,
}: {
  number: number;
  children: React.ReactNode;
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className={"flex items-start gap-3 px-3 py-1 rounded-md " + className}
    >
      <div className="w-10 text-right pr-2 select-none text-gray-400">{number}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
