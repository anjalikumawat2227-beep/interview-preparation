# Interview Prep --- Question Tracker

A responsive **Interview Preparation Question Tracker** built with React
and Vite. It helps you organize practice questions, track their
difficulty and completion status, and monitor your overall preparation
progress from a dashboard.

## Features

-   **Dashboard overview**
    -   View the total number of saved questions.
    -   See completed question counts for DSA, Interview, and Technical
        categories.
    -   Track Pending, In Progress, and Completed questions.
    -   View overall completion progress as a percentage and progress
        bar.
-   **Manage questions**
    -   Add a question with its title, category, difficulty, and status.
    -   Edit an existing question.
    -   Delete a question.
    -   Mark a question as completed.
-   **Search and filter**
    -   Search questions by title.
    -   Filter by category, status, and difficulty.
    -   Clear all search and filter selections.
    -   See how many questions match the current filters.
-   **Persistent browser storage**
    -   Questions are saved in the browser's `localStorage` under the
        `questionData` key.
    -   Your saved questions remain available in the same browser unless
        its local storage is cleared.
-   **Responsive layout**
    -   Navigation sidebar, header, dashboard cards, question cards, and
        forms adapt to different screen sizes.

## Tech Stack

-   **React 19** --- UI components and state management
-   **Vite** --- development server and production build
-   **React Router** --- page navigation
-   **React Hook Form** --- question form handling and validation
-   **Tailwind CSS 4** --- styling and responsive UI
-   **ESLint** --- code linting
-   **Vercel** --- deployment configuration

## Project Structure

``` text
frontend-machine-coding-section/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── AddQuestionForm.jsx
    │   ├── Navbar.jsx
    │   ├── QuestionCard.jsx
    │   ├── SearchAndFilter.jsx
    │   └── Sidebar.jsx
    ├── Layout/
    │   └── MainLayout.jsx
    └── pages/
        ├── Dashboard.jsx
        └── Questions.jsx
```

## Getting Started

### Prerequisites

Install **Node.js** and npm before running the project.

### 1. Clone the repository

``` bash
git clone <your-repository-url>
```

### 2. Open the project directory

``` bash
cd frontend-machine-coding-section
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Open the local URL shown in your terminal (Vite usually provides a URL
such as `http://localhost:5173`).

## Available Scripts

  Command             Description
  ------------------- ----------------------------------------------------
  `npm run dev`       Starts the local development server
  `npm run build`     Creates a production build in the `dist` directory
  `npm run preview`   Previews the production build locally
  `npm run lint`      Runs ESLint checks

## How to Use

1.  Open the **Dashboard** to review question totals and preparation
    progress.
2.  Go to **Questions** from the sidebar.
3.  Select **Add Question** and enter a title, category, difficulty, and
    status.
4.  Use the search field to find a question by title.
5.  Apply category, status, or difficulty filters to narrow the list.
6.  Choose **Edit** to update a question or **Delete** to remove it.
7.  Choose **Mark as Completed** when you finish practising a question.
8.  Return to the Dashboard to review your updated progress.

## Question Categories and Statuses

**Categories** - DSA - Interview - Technical

**Difficulty levels** - Easy - Medium - Hard

**Statuses** - Pending - In Progress - Completed

## Data Storage

This project currently uses browser `localStorage` instead of a backend
database. Question data is stored under the `questionData` key in JSON
format. Data is local to the browser and device where it was saved; it
is not automatically synchronized across browsers or devices.

## Deployment

The repository includes a `vercel.json` rewrite that routes requests to
`index.html`, which supports client-side routing on Vercel. To deploy,
import the repository into Vercel and use the standard Vite build
settings:

-   **Build command:** `npm run build`
-   **Output directory:** `dist`

## Future Improvements

-   Add pagination or sorting for larger question lists.
-   Add confirmation before deleting a question.
-   Improve form button labels for edit mode.
-   Add export/import or cloud sync for question data.
-   Add automated tests for question management, filters, and progress
    calculations.

------------------------------------------------------------------------

Built as a frontend practice project to organize interview preparation
and track learning progress.
