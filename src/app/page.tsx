"use client";
import { useState } from "react";
export default function Home() {
    const [fetchedData, setFetchedData] = useState<string | null>(null);
    const fetchHandler = async () => {
        const response = await fetch("/api/hello");
        const { data } = await response.json();
        setFetchedData(data);
    };
    return (
        <main>
            <h1>{`Main page`}</h1>
            <p>{fetchedData}</p>
            <button onClick={fetchHandler}>Fetch data</button>
        </main>
    );
}
