# Song Management Application

A full-stack application for managing a list of songs with CRUD operations, built with React, Redux Toolkit, Redux-Saga, Emotion, and a custom Webpack setup. The backend is mocked using MirageJS.

## Setup Instructions
1. Clone the repository: `git clone https://github.com/henokworkuliyew/song-management-app.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open `http://localhost:8080` in your browser.

## Technologies Used
- **Frontend**: React (functional components), Redux Toolkit, Redux-Saga, Emotion/Styled System
- **Backend**: MirageJS (mock API)
- **Build Tool**: Custom Webpack configuration
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel (optional, see below)

## Webpack Configuration
- **Entry/Output**: `src/index.js` to `dist/bundle.js`.
- **Loaders**:
  - `babel-loader` for JSX/ES6+.
  - `css-loader` and `style-loader` for CSS.
  - `file-loader` for images/SVGs (saved to `dist/assets`).
- **Plugins**:
  - `HtmlWebpackPlugin` generates `index.html`.
  - `DefinePlugin` sets `API_BASE_URL`.
- **Optimization**: Code splitting for React and vendor libraries.
- **Dev Server**: Runs on `localhost:8080` with hot reloading.

## API Endpoints (MirageJS Mock)
- `GET /api/songs?page={page}&limit={limit}`: Fetch paginated songs.
- `GET /api/songs/:id`: Fetch a single song by ID.
- `POST /api/songs`: Create a new song.
- `PUT /api/songs/:id`: Update a song by ID.
- `DELETE /api/songs/:id`: Delete a song by ID.
