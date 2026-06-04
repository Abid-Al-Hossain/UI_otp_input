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
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "export default function OtpInputComponent() {",
    "  return (",
        "    <fieldset><legend>{state.label}</legend>{Array.from({ length: state.digitCount }, (_, index) => <input key={index} aria-label={`Digit ${index + 1}`} inputMode={state.inputMode} autoComplete={index === 0 ? state.autocomplete : \"off\"} maxLength={1} value={state.value[index] ?? \"\"} onChange={() => undefined} />)}</fieldset>",
    "  );",
    "}",
    "",
  ].join("\n");
}
