import React, { useState, useEffect } from "react";

const ViewExtractedData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:8081/Text/all");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData.data || []); // Ensure data is an array
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      maxWidth: "100%",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to bottom, #f0f8ff, #e6f2ff)",
      borderRadius: "10px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
    }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#1a56db",
        textAlign: "center",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
      }}>Extracted Data</h2>
      
      {loading && (
        <div style={{
          padding: "30px",
          textAlign: "center",
          color: "#4a5568",
          fontSize: "18px"
        }}>
          <div style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "5px solid rgba(0, 0, 0, 0.1)",
            borderTopColor: "#3182ce",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
          <p style={{ marginTop: "15px" }}>Loading...</p>
        </div>
      )}
      
      {error && (
        <div style={{
          padding: "20px",
          textAlign: "center",
          color: "white",
          backgroundColor: "#e53e3e",
          borderRadius: "8px",
          marginTop: "20px",
          boxShadow: "0 4px 8px rgba(229, 62, 62, 0.3)"
        }}>
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Error!</p>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && data.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0",
            marginTop: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden"
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Date</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Time</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Intrusion Observed</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Device Name</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Source IP</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Destination IP</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Destination Country</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Critical Level</th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  backgroundColor: "#2c5282",
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1a365d"
                }}>Attack</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                // Determine critical level styling
                let criticalLevelStyle = {};
                if (item.crlevel) {
                  const levelLower = item.crlevel.toLowerCase();
                  if (levelLower.includes('critical')) {
                    criticalLevelStyle = {
                      backgroundColor: "#fecaca",
                      color: "#dc2626",
                      fontWeight: "bold"
                    };
                  } else if (levelLower.includes('high')) {
                    criticalLevelStyle = {
                      backgroundColor: "#fed7aa",
                      color: "#ea580c",
                      fontWeight: "bold"
                    };
                  } else if (levelLower.includes('medium')) {
                    criticalLevelStyle = {
                      backgroundColor: "#fef08a",
                      color: "#ca8a04",
                      fontWeight: "bold"
                    };
                  } else if (levelLower.includes('low')) {
                    criticalLevelStyle = {
                      backgroundColor: "#bbf7d0",
                      color: "#16a34a",
                      fontWeight: "bold"
                    };
                  }
                }

                // Determine row background color
                const rowBackground = index % 2 === 0 ? "#f0f9ff" : "#e0f2fe";
                
                return (
                  <tr key={index} style={{
                    backgroundColor: rowBackground,
                    transition: "background-color 0.2s"
                  }}>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1"
                    }}>{item.date || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1"
                    }}>{item.time || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1"
                    }}>{item.intrusion_observed || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1"
                    }}>{item.devname || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1",
                      color: "#1e40af",
                      fontFamily: "monospace",
                      fontWeight: "500"
                    }}>{item.srcip || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1",
                      color: "#1e40af",
                      fontFamily: "monospace",
                      fontWeight: "500"
                    }}>{item.dstip || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1"
                    }}>{item.dstcountry || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1",
                      ...criticalLevelStyle
                    }}>{item.crlevel || "N/A"}</td>
                    <td style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #cbd5e1",
                      color: "#7e22ce",
                      fontWeight: item.attack ? "bold" : "normal"
                    }}>{item.attack || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <div style={{
          padding: "30px",
          textAlign: "center",
          color: "#4b5563",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginTop: "20px",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
          border: "1px dashed #d1d5db"
        }}>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>No data available</p>
          <p style={{ marginTop: "8px", color: "#6b7280" }}>Try again later or check your connection settings</p>
        </div>
      )}
    </div>
  );
};

export default ViewExtractedData;