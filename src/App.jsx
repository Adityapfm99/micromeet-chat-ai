import React, { useState } from "react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [messages, setMessages] = useState([]);
  const [doctorInput, setDoctorInput] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [record, setRecord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [typingRole, setTypingRole] = useState("");

  const handleDoctorInput = (e) => {
    setDoctorInput(e.target.value);
    setTypingRole(e.target.value ? "Doctor" : "");
  };

  const handlePatientInput = (e) => {
    setPatientInput(e.target.value);
    setTypingRole(e.target.value ? "Patient" : "");
  };

  const sendMessage = (role) => {
    const text = role === "Doctor" ? doctorInput.trim() : patientInput.trim();
    if (!text) return;
    setMessages([...messages, { role, content: text }]);
    if (role === "Doctor") setDoctorInput("");
    else setPatientInput("");
    setTypingRole("");
    setError("");
  };

  const generateMedicalRecord = async () => {
    setLoading(true);
    setError("");
    setRecord("");
    const history = messages.map(m => `${m.role}: ${m.content}`).join("\n");
    const prompt = `Given the following doctor-patient conversation, generate a simple medical record with:\n- Chief Complaint\n- Symptoms\n- Assessment\n- Plan\n\nConversation:\n${history}\n\nMedical Record:`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful medical assistant. Only answer medical questions. If the topic is not medical, politely say you can only discuss health-related matters." },
            { role: "user", content: prompt }
          ],
          max_tokens: 256,
          temperature: 0.2,
        }),
      });
      if (!response.ok) {
        let errorMsg = "API error: " + response.statusText;
        try {
          const errorData = await response.json();
          if (errorData.error && errorData.error.message) {
            errorMsg += `\nDetails: ${errorData.error.message}`;
          }
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("No valid response from OpenAI API.");
      }
      setRecord(data.choices[0].message.content.trim());
    } catch (e) {
      setError("Error generating medical record: " + e.message + "\nPlease check your API key, network connection, and model access.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bg">
      <div className="chat-card">
        <h2 className="chat-title">🩺 Doctor-Patient Chat</h2>
        <div className="chat-history">
          {messages.length === 0 && (
            <div className="chat-empty">No messages yet. Start the conversation!</div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role.toLowerCase()}`}> 
              <span className="chat-role">{m.role === "Doctor" ? "👨‍⚕️" : "🧑‍🤝‍🧑"}</span>
              <span className="bubble-content">{m.content}</span>
            </div>
          ))}
          {typingRole && (
            <div className={`chat-bubble typing ${typingRole.toLowerCase()}`}>
              <span className="chat-role">{typingRole === "Doctor" ? "👨‍⚕️" : "🧑‍🤝‍🧑"}</span>
              <span className="bubble-content">{typingRole} is typing...</span>
            </div>
          )}
        </div>
        <div className="chat-inputs">
          <div className="input-row">
            <input
              id="doctor"
              type="text"
              className="chat-input"
              value={doctorInput}
              onChange={handleDoctorInput}
              onKeyDown={e => e.key === "Enter" ? sendMessage("Doctor") : null}
              placeholder="Type as Doctor..."
            />
            <button className="chat-btn" onClick={() => sendMessage("Doctor")}>Send</button>
          </div>
          <div className="input-row">
            <input
              id="patient"
              type="text"
              className="chat-input"
              value={patientInput}
              onChange={handlePatientInput}
              onKeyDown={e => e.key === "Enter" ? sendMessage("Patient") : null}
              placeholder="Type as Patient..."
            />
            <button className="chat-btn" onClick={() => sendMessage("Patient")}>Send</button>
          </div>
        </div>
        <div className="divider" />
        <button
          className="record-btn"
          onClick={generateMedicalRecord}
          disabled={loading || messages.length === 0}
        >
          {loading ? "Generating..." : "Generate Medical Record"}
        </button>
        {record && (
          <div className="record-card">
            <h3>📝 Medical Record</h3>
            <pre className="record-output">{record}</pre>
          </div>
        )}
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}

export default App;