import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Home() {
    return (
        <div>
            <h1>LandingPage(under development)</h1>
            <Button>
                <Link href="/app">Return to app</Link>
            </Button>
        </div>
    );
}
