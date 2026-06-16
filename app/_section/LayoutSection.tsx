"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Layout controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Slider label="Gap" value={state.gap} min={4} max={36} step={1} onChange={(value) => update("gap", value)} />
      <Slider label="Padding" value={state.padding} min={10} max={44} step={1} onChange={(value) => update("padding", value)} />
    </div>
    </SectionCard>
  );
}
