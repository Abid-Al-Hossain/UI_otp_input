"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function BehaviorSection({ state, update }: Props) {
  return (
    <SectionCard title="Behavior" subtitle="Behavior controls that are native, preview-honest, and React-export-honest.">
      <Input label="Autocomplete" value={state.autocomplete} onChange={(value) => update("autocomplete", value)} />
      <Select label="Input mode" value={state.inputMode} options={[
  "none",
  "text",
  "numeric",
  "decimal",
  "search",
  "email",
  "tel",
  "url"
]} onChange={(value) => update("inputMode", value)} />
      <Select label="Enter key hint" value={state.enterKeyHint} options={[
  "enter",
  "done",
  "go",
  "next",
  "previous",
  "search",
  "send"
]} onChange={(value) => update("enterKeyHint", value)} />
      <Switch label="Motion safe transition" checked={state.motion} onChange={(value) => update("motion", value)} />
    </SectionCard>
  );
}
