import { expect, test } from '@playwright/test';

test('Route 1: Simple Flowchart Accuracy', async ({ page }) => {
	// Navigate to test case 1
	await page.goto('/test/1');
	
	// Wait for the mermaid diagram to render
	await page.waitForSelector('svg', { timeout: 10000 });
	
	// Check that SVG is present and visible
	const svg = page.locator('svg');
	await expect(svg).toBeVisible();
	
	// Verify the page title
	await expect(page.getByText('Test Case 1: Simple Flowchart')).toBeVisible();
	
	// Verify specific nodes are rendered with correct text
	await expect(page.getByText('Start')).toBeVisible();
	await expect(page.getByText('Decision')).toBeVisible();
	await expect(page.getByText('Action 1')).toBeVisible();
	await expect(page.getByText('Action 2')).toBeVisible();
	await expect(page.getByText('End')).toBeVisible();
	
	// Verify edge labels (be more specific to avoid multiple matches)
	await expect(page.getByText('Yes', { exact: true }).first()).toBeVisible();
	await expect(page.getByText('No', { exact: true }).first()).toBeVisible();
	
	// Check that we have the expected structure
	const nodes = svg.locator('[id*="flowchart"], .node, g[id]');
	const nodeCount = await nodes.count();
	expect(nodeCount).toBeGreaterThan(3); // Should have multiple nodes
	
	// Verify SVG dimensions are reasonable for a simple flowchart
	const svgElement = await svg.elementHandle();
	const boundingBox = await svgElement?.boundingBox();
	expect(boundingBox?.width).toBeGreaterThan(100);
	expect(boundingBox?.height).toBeGreaterThan(100);
});

test('Route 1: Flowchart Structure Validation', async ({ page }) => {
	await page.goto('/test/1');
	await page.waitForSelector('svg', { timeout: 10000 });
	
	const svg = page.locator('svg');
	
	// Verify flowchart has decision diamond
	const svgContent = await svg.innerHTML();
	expect(svgContent).toContain('Decision'); // Should contain decision node
	
	// Check for flowchart-specific elements
	const flowchartElements = svg.locator('g, rect, path, text');
	const elementCount = await flowchartElements.count();
	expect(elementCount).toBeGreaterThan(8); // Simple flowchart should have multiple elements
	
	// Verify no JavaScript errors
	const errors: string[] = [];
	page.on('pageerror', (error) => {
		errors.push(error.message);
	});
	
	await page.waitForTimeout(1000);
	expect(errors.length).toBe(0);
});

test('Route 1: Responsive Behavior', async ({ page }) => {
	// Test desktop view
	await page.setViewportSize({ width: 1200, height: 800 });
	await page.goto('/test/1');
	await page.waitForSelector('svg');
	
	const desktopSvg = page.locator('svg');
	const desktopBox = await desktopSvg.boundingBox();
	
	// Test mobile view
	await page.setViewportSize({ width: 375, height: 667 });
	await page.waitForTimeout(500);
	
	const mobileSvg = page.locator('svg');
	const mobileBox = await mobileSvg.boundingBox();
	
	// SVG should adapt to smaller screen
	expect(mobileBox?.width).toBeLessThanOrEqual(375);
	expect(mobileBox?.width).toBeGreaterThan(50);
	
	// Should still be visible on mobile
	await expect(mobileSvg).toBeVisible();
});
