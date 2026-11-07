import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactNode } from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { ExampleCode } from './example-code';

const examplesDir = join(process.cwd(), '../../packages/ui/src/components');

/** Renders an Example next to its source, read straight from packages/ui. */
export function ComponentPreview({ name, children }: { name: string; children: ReactNode }) {
  const code = readFileSync(join(examplesDir, `${name}.tsx`), 'utf8');
  return (
    <Tabs items={['Preview', 'Code']} className="not-prose">
      <Tab value="Preview" className="max-h-[720px] overflow-auto p-0">
        {children}
      </Tab>
      <Tab value="Code">
        <ExampleCode code={code} />
      </Tab>
    </Tabs>
  );
}
