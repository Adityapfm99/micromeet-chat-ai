# Micromeet AI Doctor-Patient Chat & Medical Record Generator

## Features

- Doctor/Patient chat interface
- Conversation history display
- "Generate Medical Record" button (uses OpenAI API)
- Medical record includes: Chief Complaint, Symptoms, Assessment, Plan

## Tech Stack

- React (Vite)
- LLM API: OpenAI (gpt-3.5-turbo)

## How to Run

1. **Clone or download this repo**
2. **Install dependencies:**  
   `npm install`
3. **Add OpenAI API key to `.env`:**  
   ```
   VITE_OPENAI_API_KEY=sk-...key...
   ```
4. **Start the app:**  
   `npm run dev`
5. **Open in browser:**  
   Visit the URL from terminal, usually [http://localhost:5173](http://localhost:5173)

## API Key

This project uses a personal OpenAI API key stored in the `.env` file:
```
VITE_OPENAI_API_KEY=sk-...your-key...
```

**Note:** This key is private and belongs to the developer. For demo and assessment purposes, it is used directly in the frontend. For production use, you should secure your API key using a backend proxy or environment variables that are not exposed to the client.

## Usage

- Enter messages as Doctor or Patient, click "Send"
- See the conversation build up
- Click "Generate Medical Record" to get a summary

## Running Unit Tests

To run unit tests:
```
npm test
```
All tests are located in `src/test/` and use Vitest + React Testing Library.

## ScreenShot 
![Unittest](public/image/unittest.png)

## Sample Video

You can watch a demo video here:
[Demo (QuickTime Movie)](https://drive.google.com/file/d/10H8zVbAEVDTrGYhl-4p1OLogKYXSvaxw/view)

## Sample Screenshot

![Sample Chat UI](public/image/images.png)

# micromeet-chat
