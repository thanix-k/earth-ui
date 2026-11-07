import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 gap-4">
      <h1 className="text-3xl font-bold">Earth UI</h1>
      <p className="text-fd-muted-foreground">
        shadcn/ui with the Earth UI preset. Install from npm or the shadcn registry.
      </p>
      <Link href="/docs" className="font-medium underline">
        Get started
      </Link>
    </div>
  );
}
