#  AI Movie Insight Builder

An AI-powered movie analysis web application built using **Next.js (App Router)**.
The application fetches movie data from **The Movie Database (TMDB)** and generates intelligent summaries using the **OpenAI API**.

---

##  Features

*  Search movies using IMDb ID
*  Fetch real-time movie details from TMDB API
*  Generate AI-powered movie summaries
*  Review summarization
*  Cast listing display
*  Robust input validation & error handling
*  Unit & Component Testing using **Jest** and **React Testing Library**

---

##  Tech Stack

* **Frontend:** Next.js 14 (App Router)
* **Backend:** Next.js API Routes
* **Language:** TypeScript
* **Testing:** Jest + React Testing Library
* **External API:** TMDB
* **AI Integration:** OpenAI API
* **Styling:** (Add Tailwind CSS / CSS Modules / etc. if used)

---

##  Project Structure

```
AI-MOVIE-INSIGHT-BUILDER/
│
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── layout.tsx
│   └── page.tsx
│
├── components/           # Reusable UI Components
├── lib/                  # Business Logic & Utilities
├── __tests__/            # Unit & Component Tests
│
├── jest.config.ts
├── jest.setup.ts
└── tsconfig.json
```

---

##  Environment Variables

Create a `.env.local` file in the root directory:

```
TMDB_API_KEY=your_tmdb_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 🛠 Installation & Setup

### 1 Clone the repository

```
git clone <your-repo-url>
cd AI-MOVIE-INSIGHT-BUILDER
```

### 2 Install dependencies

```
npm install
```

### 3 Add environment variables

Create `.env.local` and add your API keys.

### 4 Start development server

```
npm run dev
```

Application runs at:
### live
https://ai-movie-vert.vercel.app/

```
http://localhost:3000
```

---

##  Running Tests

Run all tests:

```
npm test
```

Generate coverage report:

```
npm test -- --coverage
```

This ensures business logic, validation, and components are properly tested.

---

##  What This Project Demonstrates

* Clean component-based architecture
* API integration with external services
* AI-powered backend logic
* Strong input validation
* Proper error handling
* Unit & component testing best practices
* Alias mapping configuration for scalable structure

---

## Possible Future Improvements

* Add user authentication
* Implement caching layer
* Improve UI/UX design
* Add CI/CD pipeline
* Deploy to **Vercel**

---

##  Author

**Priyanjal**
BCA | Full Stack Developer
Java | Next.js | Backend Development Enthusiast
