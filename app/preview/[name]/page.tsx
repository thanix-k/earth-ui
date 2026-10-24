import { notFound } from "next/navigation";
import { Suspense } from "react";
import { exampleNames, loadExample } from "@/lib/examples";

export const generateStaticParams = () => exampleNames().map((name) => ({ name }));

// Applied before paint so the page can stay fully static: `?theme=dark` puts
// `.dark` on <html> (portalled popups follow it), `?bleed` drops the padding
// for full-page examples.
const APPLY_QUERY = `(() => {
  const q = new URLSearchParams(location.search), html = document.documentElement;
  html.classList.toggle("dark", q.get("theme") === "dark");
  if (q.has("bleed")) html.dataset.bleed = "";
})()`;

// A bare page per example: used for docs iframes, screenshots and "open in v0".
export default async function PreviewPage({ params }: { params: Promise<{ name: string }> }) {
  const Example = await loadExample((await params).name);
  if (!Example) notFound();
  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static constant, no user input */}
      <script dangerouslySetInnerHTML={{ __html: APPLY_QUERY }} />
      <div className="flex min-h-svh items-center justify-center bg-background p-10 text-foreground in-data-bleed:block in-data-bleed:p-0">
        {/* Streams examples that read the time (e.g. Calendar's "today"). */}
        <Suspense>
          <Example />
        </Suspense>
      </div>
    </>
  );
}
