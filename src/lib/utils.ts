import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function markdownToHtml(markdownText: string) {
    // Convert headers
    markdownText = markdownText.replace(/^# (.*?)$/gm, "<h4>$1</h4>");
    markdownText = markdownText.replace(/^## (.*?)$/gm, "<h5>$1</h5>");
    markdownText = markdownText.replace(/^### (.*?)$/gm, "<h6>$1</h6>");

    // Convert bold
    markdownText = markdownText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Convert italic
    markdownText = markdownText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert links
    markdownText = markdownText.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2">$1</a>'
    );

    // Convert paragraphs
    markdownText = markdownText.replace(/(?<!\n)\n(?!\n)/g, " "); // Replace single newlines with spaces
    markdownText = markdownText.replace(/\n\n/g, "</p>\n\n<p>");
    markdownText = "<p>" + markdownText + "</p>";

    return markdownText;
}
