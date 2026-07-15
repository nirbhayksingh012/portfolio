import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">Could not find the requested page.</p>
      <Link href="/" className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
        Return Home
      </Link>
    </div>
  );
}
