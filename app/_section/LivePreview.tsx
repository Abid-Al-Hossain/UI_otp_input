"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ClipboardEvent, type ChangeEvent, type KeyboardEvent } from "react";
import type { OtpInputState } from "../types";
import { SYSTEM_FONTS } from "@/components/shared/typography/fontConstants";

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

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
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px solid ${invalid ? state.errorColor : state.previewState === "focus" ? state.accent : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled || state.previewState === "disabled" ? 0.55 : 1,
    outline: state.previewState === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transition: state.transitionDuration > 0 ? "all 180ms ease" : "none",
  };
}

export default function LivePreview({ state }: { state: OtpInputState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const disabled = state.disabled || state.previewState === "disabled";
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(() => createOtpDigits(state.value, state.characterMode, state.digitCount));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={state.ariaLabel || state.title}>
        {digits.map((digit, index) => {
          const isActive = activeIndex === index || (state.previewState === "focus" && index === 0);
          const isFilled = digit !== "";
          return (
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
              className="h-12 w-11 rounded-xl border text-center outline-none"
              style={{
                borderColor: invalid ? state.errorColor : isActive ? state.digitActiveBorder : state.border,
                backgroundColor: isActive ? state.digitActiveBg : isFilled ? state.digitFilledBg : "rgba(255,255,255,0.1)",
                color: isFilled ? state.digitFilledText : state.foreground,
                caretColor: state.caretColor,
                fontSize: state.inputSize,
              }}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
              onChange={(event) => handleChange(index, event)}
              onPaste={(event) => handlePaste(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
            {separatorText && (index + 1) % state.groupSize === 0 && index < state.digitCount - 1 ? (
              <span aria-hidden="true" style={{ color: state.muted }}>{separatorText}</span>
            ) : null}
          </Fragment>
          );
        })}
      </div>
      <small id={helperId} style={{ color: state.muted }}>{state.characterMode === "numeric" ? "Numbers only" : "Letters and numbers"}; paste fills the remaining cells.</small>
      <small id={statusId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </fieldset>
  );
}
