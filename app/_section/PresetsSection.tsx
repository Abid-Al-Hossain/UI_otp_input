"use client";

import { useMemo, useState } from "react";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { OTPINPUT_PRESETS } from "../_data/OtpInputPresets";
import type { StudioPreset } from "../types";

type Props = {
  activePresetId: string | null;
  onApply: (preset: StudioPreset) => void;
};

export default function PresetsSection({ activePresetId, onApply }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const families = useMemo(() => ["all", ...Array.from(new Set(OTPINPUT_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(OTPINPUT_PRESETS.map((preset) => preset.size)))], []);
  const filtered = OTPINPUT_PRESETS.filter((preset) => {
    const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size);
  });
  const surprise = () => {
    const source = filtered.length ? filtered : OTPINPUT_PRESETS;
    onApply(source[Math.floor(Math.random() * source.length)]);
  };

  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets with search, filters, surprise, and applied-state highlighting.">
      <div className="grid gap-3 sm:grid-cols-3">
        <Input label="Search presets" value={query} onChange={setQuery} />
        <Select label="Family" value={family} options={families} onChange={setFamily} />
        <Select label="Size" value={size} options={sizes} onChange={setSize} />
      </div>
      <button type="button" onClick={surprise} className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
        Surprise me
      </button>
      <div className="grid gap-3">
        {filtered.map((preset) => (
          <button key={preset.id} type="button" onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left transition hover:bg-white/10" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
            <strong>{preset.archetype}</strong>
            <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
