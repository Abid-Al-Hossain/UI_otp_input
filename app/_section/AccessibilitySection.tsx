"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="Accessibility controls that are native, preview-honest, and React-export-honest.">
      <Select label="dir" value={state.dir} options={[
  "ltr",
  "rtl",
  "auto"
]} onChange={(value) => update("dir", value)} />
      <Input label="lang" value={state.lang} onChange={(value) => update("lang", value)} />
    </SectionCard>
  );
}
