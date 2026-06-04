"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function StatesSection({ state, update }: Props) {
  return (
    <SectionCard title="State Preview" subtitle="State Preview controls that are native, preview-honest, and React-export-honest.">
      <Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "disabled",
  "invalid",
  "loading",
  "empty",
  "filled"
]} onChange={(value) => update("previewState", value)} />
      <Switch label="Show helper" checked={state.showHelper} onChange={(value) => update("showHelper", value)} />
      <Switch label="Show success" checked={state.showSuccess} onChange={(value) => update("showSuccess", value)} />
    </SectionCard>
  );
}
