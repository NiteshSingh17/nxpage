import { DemoViewer } from "./viewer";

export default function Page() {
    const defaultUrl = "https://nextjs.org/docs/app/getting-started/installation";

    return (
        <div className="min-h-screen bg-background text-foreground">
            <DemoViewer defaultUrl={defaultUrl} />
        </div>
    );
}