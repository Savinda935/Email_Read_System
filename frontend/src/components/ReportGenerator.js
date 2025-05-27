import React, { useState } from 'react';
import { FileText, Download, AlertCircle, CheckCircle } from 'lucide-react';

const ReportGenerator = ({ data, onGenerateIndividual, onGenerateBulk }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleBulkReport = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await onGenerateBulk();
            setSuccess('Bulk report generated successfully!');
        } catch (error) {
            setError(error.message || 'Failed to generate bulk report');
        } finally {
            setLoading(false);
        }
    };

    const handleIndividualReport = async (item) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await onGenerateIndividual(item);
            setSuccess('Individual report generated successfully!');
        } catch (error) {
            setError(error.message || 'Failed to generate individual report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-generator" style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2 style={{
                    fontSize: '24px',
                    color: '#1a365d',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FileText size={24} />
                    Report Generator
                </h2>
                <button
                    onClick={handleBulkReport}
                    disabled={loading || !data.length}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: loading || !data.length ? 'not-allowed' : 'pointer',
                        opacity: loading || !data.length ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        if (!loading && data.length) {
                            e.currentTarget.style.backgroundColor = '#1d4ed8';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!loading && data.length) {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                        }
                    }}
                >
                    <Download size={18} />
                    Generate Bulk Report
                </button>
            </div>

            {error && (
                <div style={{
                    padding: '12px',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#dc2626'
                }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div style={{
                    padding: '12px',
                    backgroundColor: '#dcfce7',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#16a34a'
                }}>
                    <CheckCircle size={18} />
                    <span>{success}</span>
                </div>
            )}

            {loading && (
                <div style={{
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    color: '#4b5563'
                }}>
                    <div style={{
                        display: 'inline-block',
                        width: '24px',
                        height: '24px',
                        border: '3px solid #e5e7eb',
                        borderTopColor: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: '8px'
                    }}></div>
                    Generating report...
                </div>
            )}

            <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '15px'
            }}>
                {data.length > 0 ? (
                    <span>Found {data.length} records available for report generation</span>
                ) : (
                    <span>No data available for report generation</span>
                )}
            </div>

            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default ReportGenerator; 