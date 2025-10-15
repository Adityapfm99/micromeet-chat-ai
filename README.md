# Micromeet AI Doctor-Patient Chat & Medical Record Generator

## Features

- Doctor/Patient chat interface
- Conversation history display
- "Generate Medical Record" button (uses OpenAI API)
- Medical record includes: Chief Complaint, Symptoms, Assessment, Plan
- Backend proxy server to handle CORS and secure API key management

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Express.js with CORS support (local) / Vercel Functions (production)
- **LLM API**: OpenAI (gpt-3.5-turbo)

## Architecture

This application uses a client-server architecture to solve CORS issues and keep the OpenAI API key secure:

- **Development**: 
  - Frontend (React): `http://localhost:5173`
  - Backend (Express): `http://localhost:3001`
- **Production (Vercel)**:
  - Frontend: Deployed as static site
  - Backend: Serverless function at `/api/chat`
- The frontend automatically detects the environment and uses the appropriate API endpoint

## How to Run Locally

1. **Clone or download this repo**
2. **Install dependencies:**  
   ```bash
   npm install
   ```
3. **Add OpenAI API key to `.env`:**  
   ```
   VITE_OPENAI_API_KEY=sk-...key...
   ```
4. **Start both servers:**  
   ```bash
   npm run dev:full
   ```
   
   **Or run them separately:**
   ```bash
   # Terminal 1 - Backend server
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel

### Prerequisites
- [Vercel account](https://vercel.com)
- [Vercel CLI](https://vercel.com/cli) (optional but recommended)

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your Git repository

3. **Configure Environment Variables:**
   In your Vercel dashboard, add the environment variable:
   ```
   VITE_OPENAI_API_KEY = your-openai-api-key-here
   ```

4. **Deploy:**
   - Vercel will automatically detect it's a Vite project
   - Your app will be deployed with both frontend and serverless function
   - The API will be available at `https://your-app.vercel.app/api/chat`

### Alternative: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts and add environment variables when asked

# Subsequent deployments
vercel --prod
```

### Environment Variables in Vercel

Make sure to add your OpenAI API key in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `VITE_OPENAI_API_KEY` with your OpenAI API key value
4. Save and redeploy

## Available Scripts

- `npm run dev` - Start the frontend development server only
- `npm run server` - Start the backend server only
- `npm run dev:full` - Start both frontend and backend servers simultaneously
- `npm run build` - Build the frontend for production
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## API Key Security

This project uses a secure backend proxy to handle OpenAI API calls:

**Local Development:**
- Uses Express.js server on port 3001
- API key stored in `.env` file

**Production (Vercel):**
- Uses Vercel serverless functions
- API key stored securely in Vercel environment variables
- API endpoint: `/api/chat`

The frontend automatically detects the environment and uses the appropriate endpoint.

## Usage

1. Enter messages as Doctor or Patient using the respective input fields
2. Click "Send" or press Enter to add messages to the conversation
3. See the conversation build up in the chat history
4. Click "Generate Medical Record" to get an AI-generated medical summary
5. The medical record will include Chief Complaint, Symptoms, Assessment, and Plan

## CORS Solution

This application solves CORS (Cross-Origin Resource Sharing) errors by:

**Local Development:**
- Express.js backend server acts as a proxy
- Frontend makes requests to local backend server
- Backend forwards requests to OpenAI API

**Production (Vercel):**
- Vercel serverless function handles API requests
- Same-origin requests (no CORS issues)
- API key remains secure on the server side

## Running Unit Tests

To run unit tests:
```bash
npm test
```
All tests are located in `src/test/` and use Vitest + React Testing Library.

## File Structure

```
├── api/
│   └── chat.js              # Vercel serverless function
├── src/
│   ├── App.jsx              # Main React component
│   ├── App.css              # Styles
│   └── test/                # Unit tests
├── server.js                # Local Express server
├── vercel.json              # Vercel configuration
└── package.json
```

## Screenshots

![Unit Tests](public/image/unittest.png)

## Sample Video

You can watch a demo video here:
[Demo (QuickTime Movie)](https://drive.google.com/file/d/10H8zVbAEVDTrGYhl-4p1OLogKYXSvaxw/view)

## Sample Screenshot

![Sample Chat UI](public/image/images.png)

## Development Notes

- The application uses ES modules throughout
- Environment variables are prefixed with `VITE_` for frontend access
- Dynamic API URL automatically switches between local and production endpoints
- Vercel serverless functions handle the backend in production
- CORS is properly configured for both local and production environments
