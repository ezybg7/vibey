## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install required Python dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

### Running the API Server

To start the FastAPI server:

```
uvicorn api.app:app --host 0.0.0.0 --port 8000 --reload
```

### API Endpoints

The following API endpoints are available:

- **GET /api/get-songs** - Get songs to reccomend the user

### Interactive Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc
