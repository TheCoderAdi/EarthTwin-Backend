export function safeJSONParse(text) {
    try {
        if (!text) return null;

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch {
        return null;
    }
}