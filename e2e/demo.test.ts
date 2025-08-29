import { expect, test } from '@playwright/test';

test('mermaid component renders complex diagram', async ({ page }) => {
	await page.goto('/');
	
	// Wait for the mermaid diagram to render
	await page.waitForSelector('svg', { timeout: 10000 });
	
	// Check that SVG is present and visible
	const svg = page.locator('svg');
	await expect(svg).toBeVisible();
	
	// Verify the diagram contains expected elements
	await expect(svg.locator('g')).toBeVisible();
	
	// Check for specific nodes from our complex diagram
	await expect(page.locator('text').filter({ hasText: 'React App' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'User Service' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'Payment Gateway' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'Kubernetes Cluster' })).toBeVisible();
	
	// Verify subgraph labels are present
	await expect(page.locator('text').filter({ hasText: 'Frontend Layer' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'API Gateway' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'Microservices Architecture' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'External Services' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'Infrastructure' })).toBeVisible();
	
	// Check that the SVG has proper dimensions
	const svgElement = await svg.elementHandle();
	const boundingBox = await svgElement?.boundingBox();
	expect(boundingBox?.width).toBeGreaterThan(100);
	expect(boundingBox?.height).toBeGreaterThan(100);
});

test('mermaid component handles simple diagram', async ({ page }) => {
	// Navigate to a page with a simple diagram
	await page.goto('/');
	
	// Inject a simple diagram for testing
	await page.evaluate(() => {
		const mermaidElement = document.querySelector('[data-mermaid-id]');
		if (mermaidElement) {
			mermaidElement.innerHTML = '';
		}
	});
	
	// Add a simple mermaid diagram via script
	await page.addScriptTag({
		content: `
			import('mermaid').then(module => {
				const mermaid = module.default;
				mermaid.initialize({ startOnLoad: false });
				const simpleGraph = 'graph TD; A[Start] --> B[End]';
				mermaid.render('simple-test', simpleGraph).then(result => {
					const container = document.querySelector('[data-mermaid-id]');
					if (container) container.innerHTML = result.svg;
				});
			});
		`,
		type: 'module'
	});
	
	// Wait for the simple diagram
	await page.waitForSelector('svg', { timeout: 5000 });
	
	// Verify simple diagram elements
	await expect(page.locator('text').filter({ hasText: 'Start' })).toBeVisible();
	await expect(page.locator('text').filter({ hasText: 'End' })).toBeVisible();
});

test('mermaid component is responsive', async ({ page }) => {
	await page.goto('/');
	
	// Wait for diagram to load
	await page.waitForSelector('svg', { timeout: 10000 });
	
	// Test desktop viewport
	await page.setViewportSize({ width: 1200, height: 800 });
	const desktopSvg = page.locator('svg');
	await expect(desktopSvg).toBeVisible();
	
	const desktopBox = await desktopSvg.boundingBox();
	
	// Test mobile viewport
	await page.setViewportSize({ width: 375, height: 667 });
	await page.waitForTimeout(500); // Allow for responsive adjustment
	
	const mobileSvg = page.locator('svg');
	await expect(mobileSvg).toBeVisible();
	
	const mobileBox = await mobileSvg.boundingBox();
	
	// SVG should be smaller on mobile but still visible
	expect(mobileBox?.width).toBeLessThanOrEqual(375);
	expect(mobileBox?.width).toBeGreaterThan(100);
});

test('mermaid component accessibility', async ({ page }) => {
	await page.goto('/');
	
	// Wait for diagram to render
	await page.waitForSelector('svg', { timeout: 10000 });
	
	// Check that SVG has proper structure for accessibility
	const svg = page.locator('svg');
	await expect(svg).toBeVisible();
	
	// Verify the container div exists
	const container = page.locator('div').filter({ has: svg });
	await expect(container).toBeVisible();
	
	// Run basic accessibility checks
	await expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
});

test('mermaid component performance', async ({ page }) => {
	// Start performance monitoring
	await page.goto('/');
	
	const startTime = Date.now();
	
	// Wait for diagram to render
	await page.waitForSelector('svg', { timeout: 10000 });
	
	const endTime = Date.now();
	const renderTime = endTime - startTime;
	
	// Diagram should render within reasonable time (10 seconds max)
	expect(renderTime).toBeLessThan(10000);
	
	// Check that no JavaScript errors occurred
	const errors: string[] = [];
	page.on('pageerror', (error) => {
		errors.push(error.message);
	});
	
	await page.waitForTimeout(1000);
	expect(errors).toHaveLength(0);
});
