"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { OtpInputState } from "../types";

type Props = { state: OtpInputState; update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Base container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="State Colors" subtitle="Status-driven accent colors.">
      <div className="space-y-4">
        <ColorControl label="Error" value={state.errorColor} onChange={(v) => update("errorColor", v)} />
        <ColorControl label="Success" value={state.successColor} onChange={(v) => update("successColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Digit Box States" subtitle="Active (focused) and filled digit box appearance.">
      <div className="space-y-4">
        <ColorControl label="Active Background" value={state.digitActiveBg} onChange={(v) => update("digitActiveBg", v)} />
        <ColorControl label="Active Border" value={state.digitActiveBorder} onChange={(v) => update("digitActiveBorder", v)} />
        <ColorControl label="Filled Background" value={state.digitFilledBg} onChange={(v) => update("digitFilledBg", v)} />
        <ColorControl label="Filled Text" value={state.digitFilledText} onChange={(v) => update("digitFilledText", v)} />
        <ColorControl label="Caret Color" value={state.caretColor} onChange={(v) => update("caretColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
