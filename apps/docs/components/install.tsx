'use client';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { InstallModeToggle, useInstallMode } from './install-mode';

export function Install({ name }: { name?: string }) {
  const mode = useInstallMode();
  const code =
    mode === 'npm'
      ? 'pnpm add @earthui/ui'
      : `pnpm dlx shadcn@latest add @earthui/${name ?? 'theme'}`;
  return (
    <div className="not-prose my-6 flex flex-col gap-2">
      <InstallModeToggle />
      <DynamicCodeBlock lang="bash" code={code} />
    </div>
  );
}
