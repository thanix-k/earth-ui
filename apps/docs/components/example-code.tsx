'use client';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { forMode, useInstallMode } from './install-mode';

export function ExampleCode({ code }: { code: string }) {
  return <DynamicCodeBlock lang="tsx" code={forMode(code, useInstallMode())} />;
}
