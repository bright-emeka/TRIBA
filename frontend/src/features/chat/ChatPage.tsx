import { useAIChat } from './useAIChat'

export function ChatPage() {
  const { messages, sendMessage, clearHistory, message, setMessage, isLoading } = useAIChat()

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>TRIBA Assistant</h2>
        <button onClick={() => clearHistory()}>Clear history</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg: any) => (
          <div key={msg.message_id} className={`chat-message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && <div className="chat-message assistant">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask about your activity..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
