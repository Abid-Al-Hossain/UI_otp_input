"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function RadiusSection({ state, update }: Props) {
  return (
    <SectionCard title="Radius" subtitle="Radius controls that are native, preview-honest, and React-export-honest.">
      <Slider label="Radius" value={state.radius} min={0} max={48} step={1} onChange={(value) => update("radius", value)} />
    </SectionCard>
  );
}
