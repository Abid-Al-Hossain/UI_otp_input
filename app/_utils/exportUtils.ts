import type { OtpInputState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: OtpInputState, fileName = "otp-input") : ExportPayload {
  return {
    fileName: `${fileName || "otp-input"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: OtpInputState) {
  return `import { Fragment, useEffect, useRef, useState } from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function sanitizeOtpValue(raw, characterMode, digitCount) {
  return (raw.match(characterMode === "numeric" ? /\\d/g : /[a-z0-9]/gi) ?? [])
    .join("")
    .toUpperCase()
    .slice(0, digitCount);
}

function createOtpDigits(value, characterMode, digitCount) {
  const sanitized = sanitizeOtpValue(value, characterMode, digitCount);
  return Array.from({ length: digitCount }, (_, index) => sanitized[index] ?? "");
}

export default function OtpInputComponent() {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const inputRefs = useRef([]);
  const [digits, setDigits] = useState(() => createOtpDigits(state.value, state.characterMode, state.digitCount));
  const [activeIndex, setActiveIndex] = useState(null);
  const descriptionId = \`\${state.id}-description\`;
  const helperId = \`\${state.id}-helper\`;
  const statusId = \`\${state.id}-status\`;
  const separatorText = state.separator === "dash" ? "-" : state.separator === "space" ? " " : "";
  const inputMode = state.characterMode === "numeric" ? "numeric" : state.inputMode;
  const pattern = state.characterMode === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*";
  const describedBy = [descriptionId, helperId, message ? statusId : ""].filter(Boolean).join(" ");
  const shellStyle = {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: \`\${state.borderWidth}px ${state.borderStyle} \${invalid ? state.errorColor : state.previewState === "focus" ? state.accent : state.border}\`,
    boxShadow: \`0 \${Math.round(state.shadow / 3)}px \${state.shadow}px rgba(0,0,0,.28)\`,
    background: state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    opacity: disabled ? 0.55 : 1,
    outline: state.previewState === "focus" ? \`\${state.focusRing}px solid \${state.accent}\` : "none",
    transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none",
  };

  useEffect(() => {
    setDigits(createOtpDigits(state.value, state.characterMode, state.digitCount));
  }, []);

  const focusCell = (index) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };
  const writeDigits = (startIndex, rawValue) => {
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
  const displayValue = (value) => {
    if (state.maskMode === "dot") return value ? "\\u2022" : "";
    return value;
  };

  return (
    <fieldset style={shellStyle} className="grid content-center" aria-describedby={describedBy} aria-invalid={invalid || undefined} disabled={disabled}>
      {/* Browser OTP hint: autoComplete="one-time-code" is applied to the first cell. */}
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
              id={\`\${state.id}-\${index + 1}\`}
              name={\`\${state.name}-\${index + 1}\`}
              title={state.title}
              tabIndex={state.tabIndex}
              dir={state.dir}
              lang={state.lang}
              type={state.maskMode === "password" ? "password" : "text"}
              aria-label={\`Digit \${index + 1} of \${state.digitCount}\`}
              inputMode={inputMode}
              autoComplete={index === 0 ? "one-time-code" : "off"}
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
              onChange={(event) => writeDigits(index, event.target.value)}
              onPaste={(event) => {
                event.preventDefault();
                writeDigits(index, event.clipboardData.getData("text"));
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digits[index] && index > 0) focusCell(index - 1);
              }}
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
`;
}
