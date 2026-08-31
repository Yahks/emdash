import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname;

	// Only allow Admin UI, Auth, and API routes on this instance
	if (
		pathname.startsWith("/_emdash") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/_astro")
	) {
		return next();
	}

	// Block all public visitor-facing pages on this Admin Worker
	return new Response("404 Not Found (Admin Instance Only)", {
		status: 404,
		headers: { "Content-Type": "text/plain" },
	});
});
