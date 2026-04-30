"use client";

import { CSSProperties, useMemo, useState } from "react";
import content from "./content.json";

type Section = (typeof content.sections)[number];

type ThemeStyle = CSSProperties & {
  "--app-bg": string;
  "--app-surface": string;
  "--app-surface-soft": string;
  "--app-border": string;
  "--app-primary": string;
  "--app-accent": string;
  "--app-accent-soft": string;
  "--app-text": string;
  "--app-muted": string;
  "--app-warning": string;
};

function PowerBIView({
  section,
  loadingLabel,
}: {
  section: Section;
  loadingLabel: string;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-(--app-border) bg-(--app-surface) shadow-2xl shadow-black/30 w-full">
      <div className="relative aspect-video w-full bg-(--app-primary) overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${section.image})` }}
        />
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,var(--app-primary),transparent)]">
          <span className="rounded-md border border-(--app-border) bg-(--app-surface)/85 px-4 py-2 text-sm font-medium text-(--app-muted) backdrop-blur">
            {loadingLabel}
          </span>
        </div>
        <iframe
          key={section.url}
          className="absolute inset-0 h-full w-full border-0"
          title={section.title}
          src={`${section.url}&navContentPaneEnabled=false`}
          allowFullScreen
        />
      </div>
    </article>
  );
}

function DashboardScreen({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  return (
    <section className="grid min-h-[calc(100vh-140px)] gap-8 py-8 lg:grid-cols-[420px_1fr] items-center">
      {/* Columna Izquierda: Información */}
      <div className="flex flex-col rounded-lg border border-(--app-border) bg-(--app-surface) p-6 md:p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--app-accent)">
          {section.kicker}
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-(--app-text) md:text-4xl">
          {section.title}
        </h2>
        <p className="mt-2 text-base font-semibold text-(--app-warning)">
          {section.subtitle}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-(--app-muted)">
          {section.description}
        </p>

        <div className="mt-7 space-y-6">
          <div className="rounded-lg border border-(--app-border) bg-(--app-surface-soft) p-5">
            <h3 className="text-sm font-semibold text-(--app-text)">
              {section.pointsTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-(--app-muted)">
              {section.points.map((point) => (
                <li className="flex gap-3" key={point}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--app-accent)" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-(--app-text) mb-3">
              {section.dataTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.data.map((item) => (
                <span
                  className="rounded-md border border-(--app-border) bg-(--app-bg) px-3 py-1.5 text-[11px] font-bold text-(--app-muted) uppercase tracking-wider"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-(--app-accent) px-6 text-sm font-bold text-(--app-bg) transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-(--app-accent)/10"
          href={section.url}
          target="_blank"
          rel="noreferrer"
        >
          {content.powerBi.openLabel}
        </a>
      </div>

      {/* Columna Derecha: Reporte Power BI Centrado */}
      <div className="flex flex-col w-full">
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-(--app-accent)">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-(--app-border)" />
            <span className="text-xs font-bold uppercase tracking-widest text-(--app-muted)">
              {section.label}
            </span>
          </div>
          <span className="text-[10px] font-bold text-(--app-muted)/50 uppercase">
            Visualización Interactiva
          </span>
        </div>
        
        <PowerBIView
          section={section}
          loadingLabel={content.powerBi.loadingLabel}
        />
        
        <div className="mt-4 border-l-4 border-(--app-accent) bg-(--app-surface) p-4 rounded-r-lg">
          <h3 className="text-xs font-bold uppercase tracking-widest text-(--app-accent)">
            {section.valueTitle}
          </h3>
          {/* CORRECCIÓN: Usando llaves {} y comillas normales dentro de un string para evitar el error de ESLint */}
          <p className="mt-1 text-sm text-(--app-muted) italic leading-relaxed">
            {"\""}{section.value}{"\""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState(content.sections[0].id);

  const activeIndex = useMemo(
    () =>
      Math.max(
        content.sections.findIndex((section) => section.id === activeId),
        0,
      ),
    [activeId],
  );

  const activeSection = content.sections[activeIndex];

  const themeStyle: ThemeStyle = {
    "--app-bg": content.theme.background,
    "--app-surface": content.theme.surface,
    "--app-surface-soft": content.theme.surfaceSoft,
    "--app-border": content.theme.border,
    "--app-primary": content.theme.primary,
    "--app-accent": content.theme.accent,
    "--app-accent-soft": content.theme.accentSoft,
    "--app-text": content.theme.text,
    "--app-muted": content.theme.muted,
    "--app-warning": content.theme.warning,
  } as ThemeStyle;

  return (
    <main
      className="min-h-screen bg-(--app-bg) text-(--app-text) selection:bg-(--app-accent) selection:text-(--app-bg)"
      style={themeStyle}
    >
      <header className="sticky top-0 z-50 border-b border-(--app-border) bg-(--app-bg)/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--app-accent)">
              {content.project.eyebrow}
            </p>
            <h1 className="mt-0.5 text-xl font-bold tracking-tight">
              {content.project.name}
            </h1>
          </div>

          <nav
            className="flex flex-wrap gap-2 sm:grid sm:grid-cols-2 lg:flex xl:grid-cols-4"
            aria-label={content.navigation.dashboardLabel}
          >
            {content.sections.map((section) => {
              const isActive = section.id === activeId;

              return (
                <button
                  /* CORRECCIÓN: min-h-10 en lugar de min-h-[40px] para seguir la sugerencia de Tailwind */
                  className="inline-flex min-h-10 items-center justify-center rounded-md border px-4 text-center text-xs font-bold transition-all active:scale-95"
                  key={section.id}
                  onClick={() => setActiveId(section.id)}
                  style={{
                    background: isActive
                      ? "var(--app-accent-soft)"
                      : "transparent",
                    borderColor: isActive
                      ? "var(--app-accent)"
                      : "var(--app-border)",
                    color: isActive ? "var(--app-accent)" : "var(--app-muted)",
                  }}
                  type="button"
                >
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <DashboardScreen section={activeSection} index={activeIndex} />
      </div>
    </main>
  );
}