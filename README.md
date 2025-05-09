# Team H - Aircraft Routing Optimization

A project for optimizing aircraft routing problems using advanced algorithms including Christofides and Chained Lin-Kernighan heuristics.

## Team Members
- **Dalton Jayara** - Backend developer
- **Ayman Rahman** - Frontend developer
- **Benjamin Wang** - Project Manager and developer
- **Everett Yan** - Lead UI/UX developer

## Project Overview
This project allows users to discover new music in a tinder-swipe like expereince

- A **frontend** webapp built with React Next.js that provides a user interface for swiping on new songs
- A **backend** written in Python, served with Fast API, and communicates with the Spotify API


## Clone this repository: ##
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

### Backend
Navigate to the `backend-directory` folder and follow the instructions in its README to set up the Python environment and run the optimization algorithms.

### Frontend
Navigate to the `frontend-directory` folder and follow the instructions in its README to set up the Next.js development environment and interact with the application.

## Project Structure
```bash
back-end/
├── __pycache__/            # compiled Python files
├── .venv/                  # primary virtual environment
├── myenv/                  # alternate virtual environment
├── main.py                 # entry point / API server
├── README.md               # project documentation
└── requirements.txt        # Python dependencies

front-end/
├── .next/                  # Next.js build output
├── node_modules/           # npm packages
├── public/                 # static assets (images, icons, etc.)
├── src/
│   ├── api/                # client wrappers for back-end calls
│   ├── app/                # Next.js App Router
│   │   ├── auth/           # /auth routes & pages
│   │   ├── learn/          # /learn routes & pages
│   │   ├── login/          # /login routes & pages
│   │   ├── favicon.ico     # app favicon
│   │   ├── globals.css     # global styles
│   │   ├── layout.tsx      # root layout component
│   │   └── page.tsx        # home page component
│   ├── components/         # reusable UI pieces
│   ├── constants/          # config & constant values
│   └── types/              # TypeScript type definitions
└── .env                    # environment variables
```
