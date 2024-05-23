import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Home() {
    return (
        <div className="p-5">
            <h1 className="font-semibold">LandingPage (under development)</h1>
            <Button className="my-5">
                <Link href="/app">Return to app</Link>
            </Button>
        </div>
    );
}
