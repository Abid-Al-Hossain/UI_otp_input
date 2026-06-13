export type SectionId = "presets" | "basics" | "metadata" | "field" | "validation" | "behavior" | "layout" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "focus" | "states" | "accessibility";

export type OtpInputState = {
  showHelper: boolean;
  showSuccess: boolean;
  width: number;
  height: number;
  gap: number;
  padding: number;
  radius: number;
  borderWidth: number;
  borderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  // Typography (full button-parity)
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSizeUnit: "px" | "rem";
  titleSize: number;
  bodySize: number;
  fontStyle: "normal" | "italic";
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  textDecoration: "none" | "underline";
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  lineHeight: number;
  // Radius (full corner control)
  radiusLinked: boolean;
  radiusTL: number;
  radiusTR: number;
  radiusBR: number;
  radiusBL: number;
  // Shadow (full control)
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;
  // Focus Ring
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingOffset: number;
  focusRingColor: string;
  // Transitions
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  labelSize: number;
  inputSize: number;
  fontWeight: number;
  focusRing: number;
  previewState: "default" | "hover" | "focus" | "active" | "disabled" | "invalid" | "loading" | "empty" | "filled";
  label: string;
  description: string;
  helper: string;
  errorText: string;
  successText: string;
  value: string;
  id: string;
  name: string;
  title: string;
  tabIndex: number;
  dir: "ltr" | "rtl" | "auto";
  lang: string;
  autocomplete: string;
  inputMode: "none" | "text" | "numeric" | "decimal" | "search" | "email" | "tel" | "url";
  enterKeyHint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  digitCount: number;
  groupSize: number;
  maskMode: "none" | "dot" | "password";
  characterMode: "numeric" | "alphanumeric";
  separator: "none" | "dash" | "space";
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
};

export type StudioPreset = {
  id: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: Partial<OtpInputState> & Record<string, unknown>;
};

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  {
    "id": "presets",
    "label": "Presets"
  },
  {
    "id": "basics",
    "label": "Basics"
  },
  {
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "field",
    "label": "Field"
  },
  {
    "id": "validation",
    "label": "Validation"
  },
  {
    "id": "behavior",
    "label": "Behavior"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "colors",
    "label": "Colors"
  },
  {
    "id": "border",
    "label": "Border"
  },
  {
    "id": "radius",
    "label": "Radius"
  },
  {
    "id": "shadow",
    "label": "Shadow"
  },
  {
    "id": "typography",
    "label": "Typography"
  },
  {
    "id": "focus",
    "label": "Focus"
  },
  {
    "id": "states",
    "label": "State Preview"
  },
  {
    "id": "accessibility",
    "label": "Accessibility"
  }
];
