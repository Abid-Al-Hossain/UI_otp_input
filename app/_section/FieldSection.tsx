"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function FieldSection({ state, update }: Props) {
  return (
    <SectionCard title="Field" subtitle="Field controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Input label="Value" value={state.value} onChange={(value) => update("value", value)} />
      <Slider label="Digit count" value={state.digitCount} min={4} max={8} step={1} onChange={(value) => update("digitCount", value)} />
      <Slider label="Group size" value={state.groupSize} min={2} max={4} step={1} onChange={(value) => update("groupSize", value)} />
      <Select label="Mask mode" value={state.maskMode} options={[
  "none",
  "dot",
  "password"
]} onChange={(value) => update("maskMode", value)} />
      <Select label="Character mode" value={state.characterMode} options={[
  "numeric",
  "alphanumeric"
]} onChange={(value) => update("characterMode", value)} />
      <Select label="Separator" value={state.separator} options={[
  "none",
  "dash",
  "space"
]} onChange={(value) => update("separator", value)} />
    </div>
    </SectionCard>
  );
}
