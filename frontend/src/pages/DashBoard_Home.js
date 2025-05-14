import React, { useState } from "react";
import { AlertCircle, Mail, Globe, Filter, PieChart, Bell, Settings, RefreshCw } from "lucide-react";

const DashboardHome = () => {
  const [emailStats, setEmailStats] = useState({
    total: 856,
    filtered: 128,
    suspicious: 43,
    countries: [
      { name: "United States", count: 312, color: "#3b82f6" },
      { name: "India", count: 187, color: "#10b981" },
      { name: "China", count: 156, color: "#ef4444" },
      { name: "United Kingdom", count: 89, color: "#8b5cf6" },
      { name: "Germany", count: 79, color: "#f59e0b" },
      { name: "Others", count: 33, color: "#6b7280" }
    ]
  });

  const [recentEmails, setRecentEmails] = useState([
    { id: 1, sender: "john.doe@company.us", country: "United States", subject: "Meeting schedule for next week", status: "safe", time: "10:45 AM" },
    { id: 2, sender: "support@unknown-service.cn", country: "China", subject: "Your account requires verification", status: "suspicious", time: "9:32 AM" },
    { id: 3, sender: "marketing@newsletter.in", country: "India", subject: "Weekly newsletter: Tech updates", status: "filtered", time: "8:15 AM" },
    { id: 4, sender: "david.smith@partner.co.uk", country: "United Kingdom", subject: "Project proposal documents", status: "safe", time: "Yesterday" },
    { id: 5, sender: "noreply@service.de", country: "Germany", subject: "Order confirmation #38291", status: "safe", time: "Yesterday" }
  ]);

  // Inline CSS Styles
  const styles = {
    dashboard: {
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
    },
    alertBanner: {
      backgroundColor: "#fffbeb",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #fcd34d",
    },
    alertIcon: {
      color: "#f59e0b",
      marginRight: "8px",
    },
    alertText: {
      color: "#92400e",
      fontSize: "14px",
    },
    alertAction: {
      marginLeft: "8px",
      textDecoration: "underline",
      fontWeight: "500",
      cursor: "pointer",
    },
    dashboardContainer: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "24px",
    },
    dashboardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    dashboardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1f2937",
    },
    dashboardActions: {
      display: "flex",
      alignItems: "center",
    },
    btnPrimary: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
    },
    btnSecondary: {
      backgroundColor: "white",
      color: "#374151",
      padding: "8px 12px",
      borderRadius: "6px",
      fontSize: "14px",
      border: "1px solid #d1d5db",
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
      cursor: "pointer",
    },
    btnIcon: {
      marginRight: "8px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginBottom: "24px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
    },
    statCardContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    statLabel: {
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "500",
      margin: "0",
    },
    statValue: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#1f2937",
      margin: "4px 0 0 0",
    },
    statIconContainerBlue: {
      padding: "12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#dbeafe",
    },
    statIconContainerGreen: {
      padding: "12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#d1fae5",
    },
    statIconContainerRed: {
      padding: "12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fee2e2",
    },
    statIconContainerPurple: {
      padding: "12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ede9fe",
    },
    statIconBlue: {
      color: "#3b82f6",
    },
    statIconGreen: {
      color: "#10b981",
    },
    statIconRed: {
      color: "#ef4444",
    },
    statIconPurple: {
      color: "#8b5cf6",
    },
    statTrend: {
      fontSize: "12px",
      color: "#6b7280",
      marginTop: "16px",
      marginBottom: "0",
    },
    trendUp: {
      color: "#10b981",
    },
    trendDown: {
      color: "#ef4444",
    },
    widgetsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
      marginBottom: "24px",
    },
    widget: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
    },
    widgetTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#1f2937",
      marginTop: "0",
      marginBottom: "16px",
    },
    widgetHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    widgetAction: {
      fontSize: "14px",
      color: "#2563eb",
      fontWeight: "500",
      background: "none",
      border: "none",
      padding: "0",
      marginTop: "24px",
      cursor: "pointer",
      textAlign: "left",
    },
    countriesList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    countryItem: {
      marginBottom: "4px",
    },
    countryHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    countryName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
    countryCount: {
      fontSize: "14px",
      color: "#6b7280",
    },
    progressBarBg: {
      width: "100%",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      height: "10px",
    },
    progressBar: (width, color) => ({
      height: "10px",
      width: width,
      backgroundColor: color,
      borderRadius: "9999px",
    }),
    tableContainer: {
      overflowX: "auto",
    },
    emailsTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHead: {
      padding: "12px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "500",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      backgroundColor: "#f9fafb",
    },
    tableCell: {
      padding: "12px 16px",
      fontSize: "14px",
      color: "#1f2937",
      borderBottom: "1px solid #e5e7eb",
    },
    tableCellMuted: {
      padding: "12px 16px",
      fontSize: "14px",
      color: "#6b7280",
      borderBottom: "1px solid #e5e7eb",
    },
    statusBadge: (status) => ({
      padding: "4px 8px",
      fontSize: "12px",
      fontWeight: "500",
      borderRadius: "9999px",
      display: "inline-block",
      backgroundColor: status === "safe" ? "#d1fae5" : status === "filtered" ? "#dbeafe" : "#fee2e2",
      color: status === "safe" ? "#065f46" : status === "filtered" ? "#1e40af" : "#991b1b",
    }),
    rulesList: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    ruleItem: {
      display: "flex",
      alignItems: "center",
    },
    ruleStatusGreen: {
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      marginRight: "12px",
      backgroundColor: "#10b981",
    },
    ruleStatusYellow: {
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      marginRight: "12px",
      backgroundColor: "#f59e0b",
    },
    ruleStatusRed: {
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      marginRight: "12px",
      backgroundColor: "#ef4444",
    },
    ruleName: {
      fontSize: "14px",
      color: "#374151",
    },
    notificationsList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    notificationCritical: {
      padding: "12px",
      borderRadius: "4px",
      backgroundColor: "#fee2e2",
      borderLeft: "4px solid #ef4444",
    },
    notificationWarning: {
      padding: "12px",
      borderRadius: "4px",
      backgroundColor: "#fffbeb",
      borderLeft: "4px solid #f59e0b",
    },
    notificationInfo: {
      padding: "12px",
      borderRadius: "4px",
      backgroundColor: "#dbeafe",
      borderLeft: "4px solid #3b82f6",
    },
    notificationLevelCritical: {
      fontSize: "14px",
      fontWeight: "500",
      margin: "0 0 4px 0",
      color: "#991b1b",
    },
    notificationLevelWarning: {
      fontSize: "14px",
      fontWeight: "500",
      margin: "0 0 4px 0",
      color: "#92400e",
    },
    notificationLevelInfo: {
      fontSize: "14px",
      fontWeight: "500",
      margin: "0 0 4px 0",
      color: "#1e40af",
    },
    notificationText: {
      fontSize: "14px",
      color: "#374151",
      margin: "4px 0",
    },
    notificationTime: {
      fontSize: "12px",
      color: "#6b7280",
      margin: "4px 0 0 0",
    },
    actionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "12px",
    },
    actionButton: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      backgroundColor: "white",
      cursor: "pointer",
    },
    actionIcon: {
      color: "#2563eb",
      marginBottom: "8px",
    },
    actionText: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* Header with Alert Banner */}
      <div style={styles.alertBanner}>
        <AlertCircle style={styles.alertIcon} size={20} />
        <span style={styles.alertText}>
          Security Alert: 28 suspicious emails detected in the last 24 hours from new IP addresses. 
          <span style={styles.alertAction}>Review Now</span>
        </span>
      </div>
      
      {/* Main Content */}
      <div style={styles.dashboardContainer}>
        <div style={styles.dashboardHeader}>
          <h1 style={styles.dashboardTitle}>Email Filtering Dashboard</h1>
          <div style={styles.dashboardActions}>
            <button style={styles.btnSecondary}>
              <RefreshCw style={styles.btnIcon} size={16} />
              Refresh Data
            </button>
            <button style={styles.btnPrimary}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Total Emails</p>
                <h2 style={styles.statValue}>{emailStats.total}</h2>
              </div>
              <div style={styles.statIconContainerBlue}>
                <Mail style={styles.statIconBlue} size={24} />
              </div>
            </div>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>↑ 12%</span> from last week
            </p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Filtered Emails</p>
                <h2 style={styles.statValue}>{emailStats.filtered}</h2>
              </div>
              <div style={styles.statIconContainerGreen}>
                <Filter style={styles.statIconGreen} size={24} />
              </div>
            </div>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>↑ 5%</span> from last week
            </p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Suspicious Emails</p>
                <h2 style={styles.statValue}>{emailStats.suspicious}</h2>
              </div>
              <div style={styles.statIconContainerRed}>
                <AlertCircle style={styles.statIconRed} size={24} />
              </div>
            </div>
            <p style={styles.statTrend}>
              <span style={styles.trendDown}>↑ 23%</span> from last week
            </p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Source Countries</p>
                <h2 style={styles.statValue}>{emailStats.countries.length}</h2>
              </div>
              <div style={styles.statIconContainerPurple}>
                <Globe style={styles.statIconPurple} size={24} />
              </div>
            </div>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>+2</span> new countries this week
            </p>
          </div>
        </div>

        {/* Main Widgets Row */}
        <div style={styles.widgetsGrid}>
          {/* Countries Distribution */}
          <div style={styles.widget}>
            <h2 style={styles.widgetTitle}>Email Sources by Country</h2>
            <div style={styles.countriesList}>
              {emailStats.countries.map((country, index) => (
                <div key={index} style={styles.countryItem}>
                  <div style={styles.countryHeader}>
                    <span style={styles.countryName}>{country.name}</span>
                    <span style={styles.countryCount}>{country.count} emails</span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <div 
                      style={styles.progressBar(
                        `${(country.count / emailStats.total) * 100}%`,
                        country.color
                      )}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.widgetAction}>
              View Detailed Report →
            </button>
          </div>

          {/* Recent Emails */}
          <div style={{...styles.widget, gridColumn: "span 2"}}>
            <div style={styles.widgetHeader}>
              <h2 style={styles.widgetTitle}>Recent Emails</h2>
              <button style={styles.widgetAction}>
                View All →
              </button>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.emailsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHead}>Sender</th>
                    <th style={styles.tableHead}>Country</th>
                    <th style={styles.tableHead}>Subject</th>
                    <th style={styles.tableHead}>Status</th>
                    <th style={styles.tableHead}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmails.map(email => (
                    <tr key={email.id}>
                      <td style={styles.tableCell}>{email.sender}</td>
                      <td style={styles.tableCellMuted}>{email.country}</td>
                      <td style={styles.tableCell}>{email.subject}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.statusBadge(email.status)}>
                          {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                        </span>
                      </td>
                      <td style={styles.tableCellMuted}>{email.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Widgets Row */}
        <div style={styles.widgetsGrid}>
          {/* Filtering Rules */}
          <div style={styles.widget}>
            <h2 style={styles.widgetTitle}>Active Filtering Rules</h2>
            <ul style={styles.rulesList}>
              <li style={styles.ruleItem}>
                <div style={styles.ruleStatusGreen}></div>
                <span style={styles.ruleName}>External domain verification</span>
              </li>
              <li style={styles.ruleItem}>
                <div style={styles.ruleStatusGreen}></div>
                <span style={styles.ruleName}>Suspicious attachment scanner</span>
              </li>
              <li style={styles.ruleItem}>
                <div style={styles.ruleStatusGreen}></div>
                <span style={styles.ruleName}>Country-based IP filtering</span>
              </li>
              <li style={styles.ruleItem}>
                <div style={styles.ruleStatusYellow}></div>
                <span style={styles.ruleName}>Content analysis (updating)</span>
              </li>
              <li style={styles.ruleItem}>
                <div style={styles.ruleStatusRed}></div>
                <span style={styles.ruleName}>Phishing link detection (needs attention)</span>
              </li>
            </ul>
            <button style={styles.widgetAction}>
              Manage Rules →
            </button>
          </div>

          {/* System Notifications */}
          <div style={styles.widget}>
            <div style={styles.widgetHeader}>
              <h2 style={styles.widgetTitle}>System Notifications</h2>
              <Bell size={18} style={{color: "#6b7280"}} />
            </div>
            <div style={styles.notificationsList}>
              <div style={styles.notificationCritical}>
                <p style={styles.notificationLevelCritical}>Critical</p>
                <p style={styles.notificationText}>Database backup failed last night. Please check server logs.</p>
                <p style={styles.notificationTime}>2 hours ago</p>
              </div>
              <div style={styles.notificationWarning}>
                <p style={styles.notificationLevelWarning}>Warning</p>
                <p style={styles.notificationText}>Filter rules for East Asia need updating.</p>
                <p style={styles.notificationTime}>Yesterday</p>
              </div>
              <div style={styles.notificationInfo}>
                <p style={styles.notificationLevelInfo}>Info</p>
                <p style={styles.notificationText}>System update scheduled for this weekend.</p>
                <p style={styles.notificationTime}>2 days ago</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.widget}>
            <h2 style={styles.widgetTitle}>Quick Actions</h2>
            <div style={styles.actionsGrid}>
              <button style={styles.actionButton}>
                <Filter size={20} style={styles.actionIcon} />
                <span style={styles.actionText}>Update Filters</span>
              </button>
              <button style={styles.actionButton}>
                <PieChart size={20} style={styles.actionIcon} />
                <span style={styles.actionText}>Analytics</span>
              </button>
              <button style={styles.actionButton}>
                <Settings size={20} style={styles.actionIcon} />
                <span style={styles.actionText}>Settings</span>
              </button>
              <button style={styles.actionButton}>
                <AlertCircle size={20} style={styles.actionIcon} />
                <span style={styles.actionText}>Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;