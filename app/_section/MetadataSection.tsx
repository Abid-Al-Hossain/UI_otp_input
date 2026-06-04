"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <SectionCard title="Metadata" subtitle="Metadata controls that are native, preview-honest, and React-export-honest.">
      <Input label="id" value={state.id} onChange={(value) => update("id", value)} />
      <Input label="name" value={state.name} onChange={(value) => update("name", value)} />
      <Input label="title" value={state.title} onChange={(value) => update("title", value)} />
      <Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} />
    </SectionCard>
  );
}
