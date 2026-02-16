/// <reference types="svelte" />
/// <reference types="vite/client" />

// Declare .mjml?raw imports for email templates
declare module '*.mjml?raw' {
	const content: string;
	export default content;
}
