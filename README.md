# EarthTwin Backend

Minimal backend for the EarthTwin API — provides analysis, simulation and coaching endpoints that use a generative model (Gemini) and simple simulation logic.

## What this is

This repository contains a small Express-based API that exposes endpoints to:

- Analyze a user's lifestyle (calls a generative language model)
- Simulate planetary impact from a carbon score
- Provide future predictions and eco-coaching suggestions
- Compare two scenarios

It's intentionally lightweight and structured for further development.

## Prerequisites

- Node.js 16+ (ES modules support required)
- npm (comes with Node)
- A Gemini API key (or another compatible generative-model API key) if you want AI-powered responses

## Install

From the project root:

```pwsh
npm install
```

## Environment

Create a `.env` file in the project root. The app reads the following variables:

- `PORT` (optional) — port to run the server (default 5000)
- `GEMINI_API_KEY` — API key used by the generative model integration (required for analyze/future/coach endpoints to call Gemini)

Example `.env`:

```
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

## Run

- Development (uses nodemon as configured in package.json):

```pwsh
npm run dev
```

- Run with Node (production/simple run):

```pwsh
node src/server.js
```

The server will respond to a health check at `GET /` with `🌍 EarthTwin API running`.

## API Endpoints

Base path: `/api/earth`

All endpoints accept JSON bodies and return JSON with the shape `{ success: true, data: ... }` on success.

- POST /api/earth/analyze
  - Body: `{ "input": "<free text describing lifestyle/habits>" }`
  - Returns: parsed AI analysis (carbon_score, water_usage, waste_index, summary)

Example:

```pwsh
curl -X POST http://localhost:5000/api/earth/analyze -H "Content-Type: application/json" -d '{"input":"I drive 20 miles daily and eat meat 5x a week"}'
```

- POST /api/earth/simulate
  - Body: `{ "carbon_score": <number> }` (the internal simulation uses `carbon_score` to derive temperature rise, pollution, etc.)

Example:

```pwsh
curl -X POST http://localhost:5000/api/earth/simulate -H "Content-Type: application/json" -d '{"carbon_score": 72}'
```

- POST /api/earth/future
  - Body: `{ "carbon_score": <number> }`
  - Returns: AI-generated future prediction for the provided carbon score.

- POST /api/earth/coach
  - Body: `{ "lifestyle": "<short description>" }`
  - Returns: AI-generated suggestions and coaching advice.

- POST /api/earth/compare
  - Body: `{ "current": { "carbon_score": <number> }, "alternative": { "carbon_score": <number> } }`
  - Returns: a delta summary and a small visual_delta object with numeric differences.

Example compare body:

```pwsh
curl -X POST http://localhost:5000/api/earth/compare -H "Content-Type: application/json" -d '{"current":{"carbon_score":80},"alternative":{"carbon_score":60}}'
```

## Notes for developers

- The Gemini client is implemented in `src/config/gemini.js` and expects `GEMINI_API_KEY` in the environment.
- Routes live in `src/routes/earth.routes.js` and controller logic in `src/controllers/earth.controller.js`.
- Simulation math is in `src/services/impact.service.js` and is intentionally simple — adjust formulas there.

## Next steps

- Add request validation (e.g., using `joi` or `express-validator`).
- Add tests for each controller (jest + supertest) and a CI workflow.

## License

MIT
