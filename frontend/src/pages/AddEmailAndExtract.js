import React, { useState } from "react";

const AddEmailAndExtract = () => {
  const [emailMessage, setEmailMessage] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError("");
    setExtractedData(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8081'}/Text/extract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailMessage }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setExtractedData(data.data);
      setEmailMessage(""); // Clear the input field
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      marginLeft: "270px",
      padding: "30px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
      maxWidth: "800px"
    }}>
      <h1 style={{
        fontSize: "28px",
        color: "#1e3a8a",
        marginBottom: "25px",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "12px",
        fontWeight: "600"
      }}>
        Add Email Message and View Extracted Data
      </h1>
      
      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="emailMessage" style={{ 
            display: "block", 
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#334155"
          }}>
            Enter Email Message:
          </label>
          <textarea
            id="emailMessage"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
              transition: "border-color 0.3s, box-shadow 0.3s",
              outline: "none",
              resize: "vertical"
            }}
            placeholder="Paste the email message content here..."
          />
        </div>
        
        <div
          role="button"
          tabIndex={0}
          onClick={handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 4px 6px rgba(59, 130, 246, 0.25)",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            textAlign: "center"
          }}
        >
          {loading ? "Processing..." : "Extract Data"}
          {loading && (
            <span style={{
              display: "inline-block",
              width: "18px",
              height: "18px",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              borderTopColor: "#ffffff",
              marginLeft: "10px"
            }} />
          )}
        </div>
      </div>
      
      {loading && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#eff6ff",
          borderRadius: "6px",
          color: "#1e40af",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            border: "3px solid rgba(37, 99, 235, 0.3)",
            borderTopColor: "#2563eb",
            borderRadius: "50%",
            marginRight: "12px"
          }}></div>
          Processing your email message...
        </div>
      )}
      
      {error && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          borderRadius: "6px",
          borderLeft: "4px solid #dc2626",
          fontWeight: "500"
        }}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}
      
      {extractedData && (
        <div style={{
          marginTop: "30px",
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          border: "1px solid #bae6fd"
        }}>
          <h2 style={{
            fontSize: "22px",
            color: "#0369a1",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              backgroundColor: "#0ea5e9",
              borderRadius: "50%",
              marginRight: "10px"
            }}></div>
            Extracted Data
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "15px"
          }}>
            <DataCard 
              label="Date" 
              value={extractedData.date} 
              icon="📅" 
              color="#0891b2"
            />
            <DataCard 
              label="Time" 
              value={extractedData.time} 
              icon="⏰" 
              color="#0e7490"
            />
            <DataCard 
              label="Hostname" 
              value={extractedData.hostname} 
              icon="🖥️" 
              color="#0369a1"
            />
            <DataCard 
              label="URL" 
              value={extractedData.url} 
              icon="🔗" 
              color="#1d4ed8"
            />
            <DataCard 
              label="Action" 
              value={extractedData.action} 
              icon="⚡" 
              color="#4f46e5"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for data cards
const DataCard = ({ label, value, icon, color }) => (
  <div style={{
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0"
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px"
    }}>
      <span style={{ fontSize: "18px", marginRight: "8px" }}>{icon}</span>
      <span style={{
        fontWeight: "600",
        color: "#64748b",
        fontSize: "14px"
      }}>
        {label}:
      </span>
    </div>
    <div style={{
      fontWeight: "500",
      color: color,
      fontSize: "16px",
      wordBreak: "break-word"
    }}>
      {value || "N/A"}
    </div>
  </div>
);

export default AddEmailAndExtract;