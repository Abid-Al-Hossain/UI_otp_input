"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Switch from "@/components/shared/input/Switch";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function ValidationSection({ state, update }: Props) {
  return (
    <SectionCard title="Validation" subtitle="Validation controls that are native, preview-honest, and React-export-honest.">
      <Switch label="Required" checked={state.required} onChange={(value) => update("required", value)} />
      <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      <Switch label="Read only" checked={state.readOnly} onChange={(value) => update("readOnly", value)} />
      <Switch label="Invalid" checked={state.invalid} onChange={(value) => update("invalid", value)} />
      <Input label="Error text" value={state.errorText} onChange={(value) => update("errorText", value)} />
      <Input label="Success text" value={state.successText} onChange={(value) => update("successText", value)} />
    </SectionCard>
  );
}
