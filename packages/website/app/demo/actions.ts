"use server";

import { htmlExtractor } from "nxpage/src/helper/htmlExtractor";

export type AnalysisResult = {
    htmlSize: number;
    jsonSize: number;
    savedBytes: number;
    savedPercent: string;
    extractedJson: string;
    rawHtml: string;
    timeMs: number;
};

export async function fetchAndExtractPage(url: string): Promise<AnalysisResult> {
    const start = performance.now();

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const rawHtml = await res.text();
        const htmlSize = new Blob([rawHtml]).size;

        // Extract using the helper
        const extractedData = htmlExtractor(rawHtml);
        const extractedJson = JSON.stringify(extractedData, null, 2);
        const jsonSize = new Blob([extractedJson]).size;

        // Calculate metrics
        const savedBytes = htmlSize - jsonSize;
        const savedPercent = ((savedBytes / htmlSize) * 100).toFixed(2);

        const end = performance.now();
        const timeMs = Math.round(end - start);

        return {
            htmlSize,
            jsonSize,
            savedBytes,
            savedPercent,
            extractedJson,
            rawHtml,
            timeMs
        };
    } catch (error) {
        console.error("Error analyzing page:", error);
        throw error;
    }
}
