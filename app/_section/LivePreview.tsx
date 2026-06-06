"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ClipboardEvent, type ChangeEvent, type KeyboardEvent } from "react";
import type { OtpInputState } from "../types";

function sanitizeOtpValue(raw: string, characterMode: OtpInputState["characterMode"], digitCount: number) {
  return (raw.match(characterMode === "numeric" ? /\d/g : /[a-z0-9]/gi) ?? [])
    .join("")
    .toUpperCase()
    .slice(0, digitCount);
}

function createOtpDigits(value: string, characterMode: OtpInputState["characterMode"], digitCount: number) {
  const sanitized = sanitizeOtpValue(value, characterMode, digitCount);
  return Array.from({ length: digitCount }, (_, index) => sanitized[index] ?? "");
}

function shellStyle(state: OtpInputState): CSSProperties {
  const invalid = state.invalid || state.previewState === "invalid";
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${invalid ? "#fb7185" : state.previewState === "focus" ? state.accent : state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled || state.previewState === "disabled" ? 0.55 : 1,
    outline: state.previewState === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transition: state.motion ? "all 180ms ease" : "none",
  };
}

export default function LivePreview({ state }: { state: OtpInputState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const disabled = state.disabled || state.previewState === "disabled";
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(() => createOtpDigits(state.value, state.characterMode, state.digitCount));
  const descriptionId = `${state.id}-description`;
  const helperId = `${state.id}-helper`;
  const statusId = `${state.id}-status`;
  const separatorText = state.separator === "dash" ? "-" : state.separator === "space" ? " " : "";
  const inputMode = state.characterMode === "numeric" ? "numeric" : state.inputMode;
  const pattern = state.characterMode === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*";
  const describedBy = [descriptionId, helperId, message ? statusId : ""].filter(Boolean).join(" ");

  useEffect(() => {
    setDigits(createOtpDigits(state.value, state.characterMode, state.digitCount));
  }, [state.characterMode, state.digitCount, state.value]);

  const focusCell = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };
  const writeDigits = (startIndex: number, rawValue: string) => {
    const chars = sanitizeOtpValue(rawValue, state.characterMode, state.digitCount);
    if (!chars) return;
    setDigits((current) => {
      const next = [...current];
      chars.split("").forEach((char, offset) => {
        const target = startIndex + offset;
        if (target < state.digitCount) next[target] = char;
      });
      return next;
    });
    focusCell(Math.min(startIndex + chars.length, state.digitCount - 1));
  };
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    writeDigits(index, event.target.value);
  };
  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    writeDigits(index, event.clipboardData.getData("text"));
  };
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) focusCell(index - 1);
  };
  const displayValue = (value: string) => {
    if (state.maskMode === "dot") return value ? "\u2022" : "";
    return value;
  };

  return (
    <fieldset style={shellStyle(state)} className="grid content-center" aria-describedby={describedBy} aria-invalid={invalid || undefined} disabled={disabled}>
      <legend style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </legend>
      <p id={descriptionId} className="text-sm" style={{ color: state.muted }}>{state.description}</p>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={state.title}>
        {digits.map((digit, index) => (
          <Fragment key={index}>
            <input
              ref={(node) => { inputRefs.current[index] = node; }}
              id={`${state.id}-${index + 1}`}
              name={`${state.name}-${index + 1}`}
              title={state.title}
              tabIndex={state.tabIndex}
              dir={state.dir}
              lang={state.lang}
              type={state.maskMode === "password" ? "password" : "text"}
              aria-label={`Digit ${index + 1} of ${state.digitCount}`}
              inputMode={inputMode}
              autoComplete={index === 0 ? state.autocomplete || "one-time-code" : "off"}
              enterKeyHint={state.enterKeyHint}
              pattern={pattern}
              maxLength={1}
              value={displayValue(digit)}
              disabled={disabled}
              readOnly={state.readOnly}
              required={state.required}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              autoFocus={state.previewState === "focus" && index === 0}
              className="h-12 w-11 rounded-xl border bg-white/10 text-center outline-none"
              style={{ borderColor: invalid ? "#fb7185" : state.previewState === "focus" && index === 0 ? state.accent : state.border, color: state.foreground, fontSize: state.inputSize }}
              onChange={(event) => handleChange(index, event)}
              onPaste={(event) => handlePaste(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
            {separatorText && (index + 1) % state.groupSize === 0 && index < state.digitCount - 1 ? (
              <span aria-hidden="true" style={{ color: state.muted }}>{separatorText}</span>
            ) : null}
          </Fragment>
        ))}
      </div>
      <small id={helperId} style={{ color: state.muted }}>{state.characterMode === "numeric" ? "Numbers only" : "Letters and numbers"}; paste fills the remaining cells.</small>
      <small id={statusId} style={{ color: invalid ? "#fb7185" : state.showSuccess ? "#22c55e" : state.muted }}>{message}</small>
    </fieldset>
  );
}
