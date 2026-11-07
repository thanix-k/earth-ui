'use client';
import { useSyncExternalStore } from 'react';

export type InstallMode = 'npm' | 'registry';
const KEY = 'earthui-install-mode';
const listeners = new Set<() => void>();

function read(): InstallMode {
  try {
    return localStorage.getItem(KEY) === 'registry' ? 'registry' : 'npm';
  } catch {
    return 'npm';
  }
}

function setMode(mode: InstallMode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {}
  listeners.forEach((l) => l());
}

/** The reader's Install mode, shared by every block on the page and remembered across pages. */
export function useInstallMode() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    read,
    () => 'npm' as const,
  );
}

/** Example source is written for registry mode; npm mode points the same imports at the package. */
export function forMode(code: string, mode: InstallMode) {
  if (mode === 'registry') return code;
  return code
    .replaceAll('"@/components/ui/', '"earthui/')
    .replaceAll('"@/hooks/', '"earthui/hooks/')
    .replaceAll('"@/lib/', '"earthui/lib/');
}

export function InstallModeToggle() {
  const mode = useInstallMode();
  return (
    <div role="radiogroup" aria-label="Install mode" className="inline-flex rounded-md border p-0.5 text-sm">
      {(['npm', 'registry'] as const).map((m) => (
        <button
          key={m}
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          className={`rounded px-2.5 py-1 ${mode === m ? 'bg-fd-accent text-fd-accent-foreground' : 'text-fd-muted-foreground'}`}
        >
          {m === 'npm' ? 'npm' : 'shadcn registry'}
        </button>
      ))}
    </div>
  );
}
