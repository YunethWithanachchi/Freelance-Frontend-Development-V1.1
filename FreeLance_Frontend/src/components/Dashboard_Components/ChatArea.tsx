import React, { useState } from "react";

export function ChatArea() {
  const [message, setMessage] = useState("");

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: 320,
      backgroundColor: "#ffffff",
      borderLeft: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column",
      padding: "24px",
      boxSizing: "border-box",
      flexShrink: 0,
      boxShadow: "-4px 0 15px rgba(0,0,0,0.02)",
      zIndex: 10,
    },
    header: {
      fontSize: "16px",
      fontWeight: 600,
      marginBottom: "20px",
      color: "#1e293b",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "16px",
      borderBottom: "1px solid #f1f5f9",
    },
    chatList: {
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    messageItem: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    sender: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#64748b",
    },
    bubble: {
      padding: "10px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      lineHeight: "1.4",
      maxWidth: "90%",
    },
    inputArea: {
      marginTop: "20px",
      display: "flex",
      gap: "8px",
      paddingTop: "16px",
      borderTop: "1px solid #f1f5f9",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "13px",
      outline: "none",
    },
    sendBtn: {
      background: "#0f172a",
      color: "white",
      border: "none",
      borderRadius: "8px",
      width: "36px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <aside style={styles.container}>
      <div style={styles.header}>
        <span>Quick Chat</span>
        <span style={{ fontSize: "12px", color: "#3b82f6", cursor: "pointer" }}>View All</span>
      </div>

      <div style={styles.chatList}>
        <div style={styles.messageItem}>
          <span style={styles.sender}>Sarah (Client)</span>
          <div style={{ ...styles.bubble, background: "#f1f5f9", color: "#334155", borderTopLeftRadius: 2 }}>
            Hi! Just checking in on the latest mockups.
          </div>
        </div>

        <div style={{ ...styles.messageItem, alignItems: "flex-end" }}>
          <span style={styles.sender}>You</span>
          <div style={{ ...styles.bubble, background: "#3b82f6", color: "white", borderTopRightRadius: 2 }}>
            Hey Sarah! Almost done, sending them in an hour.
          </div>
        </div>

        <div style={styles.messageItem}>
          <span style={styles.sender}>Sarah (Client)</span>
          <div style={{ ...styles.bubble, background: "#f1f5f9", color: "#334155", borderTopLeftRadius: 2 }}>
            Perfect, thanks!
          </div>
        </div>
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={styles.sendBtn}>➤</button>
      </div>
    </aside>
  );
}