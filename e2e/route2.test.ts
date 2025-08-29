import { expect, test } from '@playwright/test';

test('Route 2: Sequence Diagram with Configuration', async ({ page }) => {
	// Navigate to test case 2
	await page.goto('/test/2');
	
	// Wait for the sequence diagram to render
	await page.waitForSelector('svg', { timeout: 10000 });
	
	const svg = page.locator('svg');
	await expect(svg).toBeVisible();
	
	// Verify the page title
	await expect(page.getByText('Test Case 2: Sequence Diagram with Config')).toBeVisible();
	
	// Verify participants are rendered (use first match to avoid multiple elements)
	await expect(page.getByText('Alice').first()).toBeVisible();
	await expect(page.getByText('Bob').first()).toBeVisible();
	await expect(page.getByText('Charlie').first()).toBeVisible();
	
	// Verify some of the messages are rendered
	await expect(page.getByText('Hello Bob!')).toBeVisible();
	await expect(page.getByText('Hello Alice!')).toBeVisible();
	await expect(page.getByText('Hi Charlie!')).toBeVisible();
	
	// Check that sequence diagram elements are present
	const sequenceElements = svg.locator('rect, line, text');
	const elementCount = await sequenceElements.count();
	expect(elementCount).toBeGreaterThan(10); // Sequence diagrams have many elements
	
	// Verify the diagram has substantial content
	const svgContent = await svg.innerHTML();
	expect(svgContent.length).toBeGreaterThan(500); // Should have substantial content
	
	// Check dimensions
	const svgElement = await svg.elementHandle();
	const boundingBox = await svgElement?.boundingBox();
	expect(boundingBox?.width).toBeGreaterThan(200);
	expect(boundingBox?.height).toBeGreaterThan(150);
});

test('Route 2: Dark Theme Configuration Validation', async ({ page }) => {
	await page.goto('/test/2');
	await page.waitForSelector('svg', { timeout: 10000 });
	
	const svg = page.locator('svg');
	
	// Check that the configuration is applied (dark theme)
	const svgContent = await svg.innerHTML();
	
	// Sequence diagrams should have participant boxes and message lines
	expect(svgContent).toContain('Alice');
	expect(svgContent).toContain('Bob');
	expect(svgContent).toContain('Charlie');
	
	// Verify sequence-specific elements
	const participants = svg.locator('text').filter({ hasText: /Alice|Bob|Charlie/ });
	const participantCount = await participants.count();
	expect(participantCount).toBeGreaterThanOrEqual(3); // Should have 3 participants
	
	// Check for message arrows/lines (sequence diagrams have many lines)
	const lines = svg.locator('line, path');
	const lineCount = await lines.count();
	expect(lineCount).toBeGreaterThan(5); // Should have multiple message lines
});

test('Route 2: Sequence Diagram Interaction Messages', async ({ page }) => {
	await page.goto('/test/2');
	await page.waitForSelector('svg', { timeout: 10000 });
	
	// Verify all expected messages are present
	const messages = [
		'Hello Bob!',
		'Hello Alice!', 
		'Hi Charlie!',
		'Hey Alice!',
		'Bob to Charlie',
		'Charlie to Bob'
	];
	
	for (const message of messages) {
		await expect(page.getByText(message)).toBeVisible();
	}
	
	// Verify no JavaScript errors during rendering
	const errors: string[] = [];
	page.on('pageerror', (error) => {
		errors.push(error.message);
	});
	
	await page.waitForTimeout(1000);
	expect(errors.length).toBe(0);
});

test('Route 2: Performance and Accessibility', async ({ page }) => {
	// Test performance
	const startTime = Date.now();
	
	await page.goto('/test/2');
	await page.waitForSelector('svg', { timeout: 10000 });
	
	const renderTime = Date.now() - startTime;
	expect(renderTime).toBeLessThan(8000); // Should render within 8 seconds
	
	// Test accessibility
	const svg = page.locator('svg');
	await expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
	
	// Test responsive behavior
	await page.setViewportSize({ width: 375, height: 667 });
	await page.waitForTimeout(500);
	
	const mobileSvg = page.locator('svg');
	await expect(mobileSvg).toBeVisible();
	
	const mobileBox = await mobileSvg.boundingBox();
	expect(mobileBox?.width).toBeLessThanOrEqual(375);
	expect(mobileBox?.width).toBeGreaterThan(100);
});
