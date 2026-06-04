"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import FontFamilySelect from "@/components/shared/typography/FontFamilySelect";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function TypographySection({ state, update }: Props) {
  return (
    <SectionCard title="Typography" subtitle="Typography controls that are native, preview-honest, and React-export-honest.">
      <FontFamilySelect value={state.fontFamily} onChange={(value) => update("fontFamily", value)} />
      <Slider label="Label size" value={state.labelSize} min={12} max={24} step={1} onChange={(value) => update("labelSize", value)} />
      <Slider label="Input size" value={state.inputSize} min={12} max={24} step={1} onChange={(value) => update("inputSize", value)} />
      <Slider label="Weight" value={state.fontWeight} min={400} max={900} step={50} onChange={(value) => update("fontWeight", value)} />
    </SectionCard>
  );
}
