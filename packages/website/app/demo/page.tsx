import { DemoViewer } from "./viewer";

type PageProps = {
  searchParams: Promise<{
    url?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const url =
    params?.url ??
    "https://nextjs.org/docs/app/getting-started/installation";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DemoViewer defaultUrl={url} />
    </div>
  );
}