# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# mtnjava

https://dylanjdev.github.io/mtnjava/

## Online Ordering + Square Checkout Prep

The app now includes an Online Ordering section with:

- Drink + size selection
- Flavor and sugar-free flavor add-ons
- Cart + totals
- Checkout button that posts order data to a backend checkout endpoint

### Frontend Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SQUARE_CHECKOUT_ENDPOINT=http://localhost:8787/api/square/checkout
VITE_SQUARE_LOCATION_ID=YOUR_SQUARE_LOCATION_ID
```

### Expected Backend Response

The frontend sends a `POST` request to `VITE_SQUARE_CHECKOUT_ENDPOINT` and expects:

```json
{
	"checkoutUrl": "https://square.link/u/..."
}
```

or

```json
{
	"url": "https://square.link/u/..."
}
```

If no endpoint is configured, checkout is blocked with an on-screen setup message.

### Payload Shape Sent To Backend

```json
{
	"idempotencyKey": "uuid-or-timestamp",
	"pickupTime": "ASAP",
	"customer": {
		"name": "Pickup Name",
		"phone": "(423) 300-2993"
	},
	"order": {
		"locationId": "SQUARE_LOCATION_ID",
		"lineItems": [
			{
				"name": "Latte (16oz)",
				"quantity": "2",
				"basePriceMoney": {
					"amount": 485,
					"currency": "USD"
				},
				"modifiers": [
					{
						"name": "Flavor: Caramel",
						"basePriceMoney": {
							"amount": 30,
							"currency": "USD"
						}
					}
				],
				"note": "extra hot"
			}
		]
	},
	"redirectUrls": {
		"success": "https://your-site.com/?checkout=success",
		"cancel": "https://your-site.com/?checkout=cancelled"
	}
}
```