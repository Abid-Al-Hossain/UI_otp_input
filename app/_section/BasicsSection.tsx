"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function BasicsSection({ state, update }: Props) {
  return (
    <SectionCard title="Basics" subtitle="Basics controls that are native, preview-honest, and React-export-honest.">
      <Input label="Label" value={state.label} onChange={(value) => update("label", value)} />
      <Input label="Description" value={state.description} onChange={(value) => update("description", value)} />
      <Input label="Helper text" value={state.helper} onChange={(value) => update("helper", value)} />
    </SectionCard>
  );
}
