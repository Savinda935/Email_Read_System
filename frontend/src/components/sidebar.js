import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigate = (item, path) => {
    setActiveItem(item);
    navigate(path); // Navigate to the specified path
  };

  return (
    <div style={{
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      width: "250px",
      backgroundColor: "#1e293b",
      color: "#e2e8f0",
      padding: "20px 0",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      zIndex: 100,
      overflow: "hidden",
      transition: "width 0.3s ease"
    }}>
      {/* Header */}
      <div style={{
        padding: "0 24px 24px 24px",
        borderBottom: "1px solid #334155",
        marginBottom: "20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 0"
        }}>
          {/* Logo Circle */}
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)"
          }}>
            ED
          </div>
          <div style={{
            marginLeft: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            letterSpacing: "0.5px"
          }}>
            Email Detector
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        flex: 1
      }}>
        <div style={{
          padding: "0 16px",
          marginBottom: "16px"
        }}>
          <div style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "0 8px",
            marginBottom: "8px"
          }}>
            Menu
          </div>
          
          {/* Dashboard Menu Item */}
          <NavItem 
            icon="📊" 
            label="Dashboard" 
            isActive={activeItem === 'Dashboard'} 
            onClick={() => handleNavigate('Dashboard', '/')}
          />
          
          {/* Add Email Menu Item */}
          <NavItem 
            icon="✉️" 
            label="Add Email & Extract" 
            isActive={activeItem === 'Add Email & Extract'} 
            onClick={() => handleNavigate('Add Email & Extract', '/addemail')}
          />
          
          {/* View Data Menu Item */}
          <NavItem 
            icon="🔍" 
            label="View Extracted Data" 
            isActive={activeItem === 'View Extracted Data'} 
            onClick={() => handleNavigate('View Extracted Data', '/extractdata')}
          />

          {/* New Page Menu Item */}
          <NavItem 
            icon="🆕" 
            label="My New Page" 
            isActive={activeItem === 'My New Page'} 
            onClick={() => handleNavigate('My New Page', '/newpage')}
          />
        </div>
        
        {/* Settings Section */}
        <div style={{
          padding: "0 16px",
          marginTop: "24px"
        }}>
          <div style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "0 8px",
            marginBottom: "8px"
          }}>
            Settings
          </div>
          
          <NavItem 
            icon="⚙️" 
            label="Settings" 
            isActive={activeItem === 'Settings'} 
            onClick={() => handleNavigate('Settings', '/settings')}
          />
          
          <NavItem 
            icon="❓" 
            label="Help & Support" 
            isActive={activeItem === 'Help & Support'} 
            onClick={() => handleNavigate('Help & Support', '/help')}
          />
        </div>
      </div>
      
      {/* User Profile */}
      <div style={{
        padding: "16px 24px",
        borderTop: "1px solid #334155",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: "#60a5fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px"
        }}>
          US
        </div>
        <div style={{
          marginLeft: "12px"
        }}>
          <div style={{
            fontSize: "14px",
            fontWeight: "500"
          }}>
            User Admin
          </div>
          <div style={{
            fontSize: "12px",
            color: "#94a3b8"
          }}>
            Administrator
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for navigation items
const NavItem = ({ icon, label, isActive, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "12px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isActive ? "#2c3e50" : "transparent",
      color: isActive ? "#ffffff" : "#cbd5e1",
      fontWeight: isActive ? "500" : "normal",
      marginBottom: "4px",
      transition: "all 0.2s ease",
      userSelect: "none"
    }}
  >
    <span style={{ 
      marginRight: "12px",
      fontSize: "18px",
      width: "24px",
      textAlign: "center"
    }}>
      {icon}
    </span>
    <span style={{ 
      fontSize: "15px"
    }}>
      {label}
    </span>
    {isActive && (
      <div style={{
        width: "4px",
        height: "20px",
        backgroundColor: "#3b82f6",
        borderRadius: "2px",
        marginLeft: "auto"
      }} />
    )}
  </div>
);

export default Sidebar;