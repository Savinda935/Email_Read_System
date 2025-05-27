import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Import logo
import fitLogo from '../images/fitlogo.png';

// Helper function to load image
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Helper function to draw rounded rectangle
const drawRoundedRect = (doc, x, y, width, height, radius, fillColor, strokeColor) => {
    if (fillColor) {
        doc.setFillColor(fillColor);
        doc.roundedRect(x, y, width, height, radius, radius, 'F');
    }
    if (strokeColor) {
        doc.setDrawColor(strokeColor);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y, width, height, radius, radius, 'S');
    }
};

// Helper function to add section header with Hayleys colors
const addSectionHeader = (doc, title, y, colors) => {
    // Add section background with green
    drawRoundedRect(doc, 15, y - 5, doc.internal.pageSize.width - 30, 12, 2, colors.secondary, colors.darkGreen);
    
    // Add section title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white);
    doc.text(title, 20, y + 2);
    
    return y + 15;
};

export const generateIndividualReport = async (data) => {
    try {
        // Create new PDF document with proper initialization
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        // Set default font
        doc.setFont('helvetica');
        doc.setFontSize(10);
        
        // Set document properties
        doc.setProperties({
            title: 'Security Incident Report',
            subject: 'Individual Security Report',
            author: 'Email Filter System',
            keywords: 'security, incident, report',
            creator: 'Email Filter System'
        });

        // Hayleys Fentons color palette - Orange and Green
        const colors = {
            primary: '#ff6600',      // Hayleys Orange (Primary)
            secondary: '#4a7c59',    // Hayleys Green (Secondary)
            accent: '#228b22',       // Forest Green
            darkGreen: '#2d5016',    // Dark Green
            lightOrange: '#fff3e6',  // Very light orange
            lightGreen: '#f0f8f0',   // Very light green
            text: '#2d3748',         // Dark gray text
            lightText: '#6b7280',    // Medium gray text
            lightGray: '#f8fafc',    // Very light gray
            white: '#ffffff',        // White
            border: '#d1d5db',       // Light border
            success: '#10b981',      // Success green
            warning: '#f59e0b',      // Warning amber
            danger: '#ef4444'        // Danger red
        };

        // Add main document border
        doc.setDrawColor(colors.border);
        doc.setLineWidth(1);
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

        // Add header with green background
        drawRoundedRect(doc, 15, 15, doc.internal.pageSize.width - 30, 25, 3, colors.secondary);

        try {
            // Load and add logo
            const logo = await loadImage(fitLogo);
            const logoWidth = 20;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            const logoX = 25;
            const logoY = 17 + (21 - logoHeight) / 2;
            
            doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
            
            // Enhanced title styling with white text on green
            doc.setTextColor(colors.white);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('HAYLEYS FENTONS', logoX + logoWidth + 10, 25);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Security Incident Report', logoX + logoWidth + 10, 32);
        } catch (logoError) {
            console.warn('Could not load logo:', logoError);
            doc.setTextColor(colors.white);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('HAYLEYS FENTONS', 25, 25);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Security Incident Report', 25, 32);
        }

        // Add enhanced generation info box with orange accent
        const infoBoxX = doc.internal.pageSize.width - 65;
        drawRoundedRect(doc, infoBoxX, 17, 50, 21, 2, colors.white, colors.primary);
        doc.setFontSize(8);
        doc.setTextColor(colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text('Generated:', infoBoxX + 2, 22);
        doc.setFont('helvetica', 'normal');
        doc.text(new Date().toLocaleDateString(), infoBoxX + 2, 26);
        doc.text(new Date().toLocaleTimeString(), infoBoxX + 2, 30);
        
        // Add report ID
        doc.setFont('helvetica', 'bold');
        doc.text('ID:', infoBoxX + 2, 34);
        doc.setFont('helvetica', 'normal');
        const reportId = `RPT-${Date.now().toString().slice(-6)}`;
        doc.text(reportId, infoBoxX + 12, 34);

        // Reset text color
        doc.setTextColor(colors.text);

        // Add Incident Overview section with enhanced styling - compact
        let currentY = addSectionHeader(doc, ' INCIDENT OVERVIEW', 50, colors);

        // Create severity indicator with orange
        const severityColor = data.crlevel === 'High' ? colors.danger : 
                             data.crlevel === 'Medium' ? colors.warning : colors.success;
        
        // Severity badge
        drawRoundedRect(doc, 140, currentY - 4, 35, 6, 1, severityColor);
        doc.setTextColor(colors.white);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.crlevel || 'Unknown'} Risk`, 142, currentY);

        const overviewData = [
            ['Incident Type', data.intrusion_observed || 'Unknown Detection'],
            ['Severity Level', data.crlevel || 'N/A'],
            ['Date & Time', `${data.date || 'N/A'} at ${data.time || 'N/A'}`],
            ['Device Name', data.devname || 'N/A'],
            ['Status', 'Under Investigation']
        ];

        autoTable(doc, {
            startY: currentY + 2,
            head: [['Field', 'Value']],
            body: overviewData,
            theme: 'grid',
            headStyles: {
                fillColor: colors.primary,
                textColor: colors.white,
                fontStyle: 'bold',
                fontSize: 9
            },
            alternateRowStyles: {
                fillColor: colors.lightGray
            },
            styles: {
                fontSize: 8,
                cellPadding: 3,
                font: 'helvetica',
                lineColor: colors.border,
                lineWidth: 0.3
            },
            columnStyles: {
                0: { 
                    fontStyle: 'bold', 
                    width: 50,
                    fillColor: colors.lightOrange,
                    textColor: colors.text
                },
                1: { width: 100 }
            }
        });

        // Add Technical Details section with more compact spacing
        currentY = addSectionHeader(doc, ' TECHNICAL DETAILS', doc.lastAutoTable.finalY + 8, colors);

        const technicalData = [
            ['Source IP Address', data.srcip || 'N/A'],
            ['Destination IP', data.dstip || 'N/A'],
            ['Geographic Location', data.dstcountry || 'N/A'],
            ['Attack Vector', data.attack || 'N/A'],
            ['Target URL', data.url || 'N/A'],
            ['Response Action', data.action || 'N/A']
        ];

        autoTable(doc, {
            startY: currentY,
            head: [['Technical Parameter', 'Value']],
            body: technicalData,
            theme: 'grid',
            headStyles: {
                fillColor: colors.primary,
                textColor: colors.white,
                fontStyle: 'bold',
                fontSize: 9
            },
            alternateRowStyles: {
                fillColor: colors.lightGray
            },
            styles: {
                fontSize: 8,
                cellPadding: 3,
                font: 'helvetica',
                lineColor: colors.border,
                lineWidth: 0.3
            },
            columnStyles: {
                0: { 
                    fontStyle: 'bold', 
                    width: 50,
                    fillColor: colors.lightOrange,
                    textColor: colors.text
                },
                1: { width: 100 }
            }
        });

        // Calculate footer position dynamically
        const minFooterSpace = 25; // Minimum space needed for footer
        const contentEnd = doc.lastAutoTable.finalY;
        const footerY = Math.max(
            contentEnd + 10, // At least 10mm after content
            doc.internal.pageSize.height - minFooterSpace // Or at least 25mm from bottom
        );

        // Add enhanced footer with orange colors
        drawRoundedRect(doc, 15, footerY, doc.internal.pageSize.width - 30, 20, 3, colors.lightOrange, colors.primary);
        
        // Add confidentiality notice with updated styling
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(colors.text);
        doc.text('🔒 CONFIDENTIAL - Hayleys Fentons Security Report', doc.internal.pageSize.width / 2, footerY + 5, { align: 'center' });
        doc.text('Generated by Hayleys Fentons Security Monitoring System', doc.internal.pageSize.width / 2, footerY + 10, { align: 'center' });
        doc.text('For authorized personnel only - Handle with appropriate security measures', doc.internal.pageSize.width / 2, footerY + 15, { align: 'center' });

        // Add page numbers with orange
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            // Position page number above the confidentiality notice
            const pageNumberY = footerY - 5; // Adjust this value as needed
            drawRoundedRect(doc, doc.internal.pageSize.width / 2 - 15, doc.internal.pageSize.height - 15, 30, 8, 2, colors.primary);
            doc.setFontSize(10);
            doc.setTextColor(colors.white);
            doc.setFont('helvetica', 'bold');
            doc.text(`${i} / ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        }

        // Generate filename
        const filename = `security-report-${data.date || 'unknown'}-${data.devname || 'device'}.pdf`
            .replace(/[^a-z0-9]/gi, '-').toLowerCase();

        // Save the PDF
        doc.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF report');
    }
};

export const generateBulkReport = async (data) => {
    try {
        // Create new PDF document with proper initialization
        const doc = new jsPDF({
            orientation: 'landscape', // Changed to landscape for better table display
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        // Set default font
        doc.setFont('helvetica');
        doc.setFontSize(10);
        
        // Set document properties
        doc.setProperties({
            title: 'Security Incidents Report',
            subject: 'Bulk Security Report',
            author: 'Email Filter System',
            keywords: 'security, incidents, report',
            creator: 'Email Filter System'
        });

        // FIT brand color palette
        const colors = {
            primary: '#003366',      // FIT Dark Blue
            secondary: '#0066cc',    // FIT Medium Blue
            accent: '#ff6600',       // FIT Orange
            success: '#009933',      // Green
            warning: '#ffaa00',      // Orange/Yellow
            text: '#2d3748',         // Dark gray
            lightText: '#4a5568',    // Medium gray
            lightGray: '#f7f9fc',    // Very light gray
            lightBlue: '#e6f2ff',    // Very light FIT blue
            white: '#ffffff',        // White
            border: '#ccd9e6'        // Light FIT border
        };

        // Add main document border
        doc.setDrawColor(colors.border);
        doc.setLineWidth(1);
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

        // Add header with enhanced styling
        drawRoundedRect(doc, 15, 15, doc.internal.pageSize.width - 30, 30, 5, colors.primary);

        try {
            // Load and add logo
            const logo = await loadImage(fitLogo);
            const logoWidth = 25;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            const logoX = 25;
            const logoY = 20 + (20 - logoHeight) / 2;
            
            doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
            
            // Enhanced title styling
            doc.setTextColor(colors.white);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('FIT SECURITY DASHBOARD', logoX + logoWidth + 15, 27);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Comprehensive Security Incidents Report', logoX + logoWidth + 15, 35);
        } catch (logoError) {
            console.warn('Could not load logo:', logoError);
            doc.setTextColor(colors.white);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('FIT SECURITY DASHBOARD', 25, 27);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Comprehensive Security Incidents Report', 25, 35);
        }

        // Add enhanced stats box
        const statsBoxX = doc.internal.pageSize.width - 100;
        drawRoundedRect(doc, statsBoxX, 20, 85, 20, 3, colors.white, colors.secondary);
        
        doc.setFontSize(10);
        doc.setTextColor(colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text('Report Summary', statsBoxX + 5, 27);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total Incidents: ${data.length}`, statsBoxX + 5, 32);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, statsBoxX + 5, 37);

        // Calculate statistics
        const highSeverity = data.filter(item => item.crlevel === 'High').length;
        const mediumSeverity = data.filter(item => item.crlevel === 'Medium').length;
        const lowSeverity = data.filter(item => item.crlevel === 'Low').length;

        // Add statistics section
        let currentY = 60;
        drawRoundedRect(doc, 20, currentY, doc.internal.pageSize.width - 40, 25, 3, colors.lightBlue, colors.border);
        
        doc.setTextColor(colors.primary);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('📊 THREAT LEVEL DISTRIBUTION', 25, currentY + 8);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.text);
        
        // Severity indicators
        const indicators = [
            { label: 'High Risk', count: highSeverity, color: colors.accent, x: 25 },
            { label: 'Medium Risk', count: mediumSeverity, color: colors.warning, x: 100 },
            { label: 'Low Risk', count: lowSeverity, color: colors.success, x: 175 }
        ];
        
        indicators.forEach(indicator => {
            drawRoundedRect(doc, indicator.x, currentY + 12, 60, 8, 2, indicator.color);
            doc.setTextColor(colors.white);
            doc.setFont('helvetica', 'bold');
            doc.text(`${indicator.label}: ${indicator.count}`, indicator.x + 2, currentY + 17);
        });

        // Reset text color
        doc.setTextColor(colors.text);

        // Prepare enhanced data for the table
        const tableData = data.map(item => [
            item.date || 'N/A',
            item.time || 'N/A',
            item.intrusion_observed || 'N/A',
            item.devname || 'N/A',
            item.srcip || 'N/A',
            item.dstip || 'N/A',
            item.dstcountry || 'N/A',
            item.crlevel || 'N/A',
            item.attack || 'N/A',
            item.action || 'N/A'
        ]);

        // Add main table with enhanced styling
        autoTable(doc, {
            startY: currentY + 35,
            head: [['Date', 'Time', 'Incident Type', 'Device', 'Source IP', 'Dest IP', 'Country', 'Risk Level', 'Attack Vector', 'Action Taken']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: colors.secondary,
                textColor: colors.white,
                fontStyle: 'bold',
                fontSize: 9,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: colors.lightGray
            },
            styles: {
                fontSize: 8,
                cellPadding: 3,
                font: 'helvetica',
                lineColor: colors.border,
                lineWidth: 0.3
            },
            columnStyles: {
                0: { width: 22 },
                1: { width: 20 },
                2: { width: 35 },
                3: { width: 25 },
                4: { width: 30 },
                5: { width: 30 },
                6: { width: 20 },
                7: { width: 20, fontStyle: 'bold' },
                8: { width: 30 },
                9: { width: 25 }
            },
            didParseCell: function(data) {
                // Color code severity levels
                if (data.column.index === 7) { // Risk Level column
                    if (data.cell.text[0] === 'High') {
                        data.cell.styles.fillColor = colors.accent;
                        data.cell.styles.textColor = colors.white;
                    } else if (data.cell.text[0] === 'Medium') {
                        data.cell.styles.fillColor = colors.warning;
                        data.cell.styles.textColor = colors.white;
                    } else if (data.cell.text[0] === 'Low') {
                        data.cell.styles.fillColor = colors.success;
                        data.cell.styles.textColor = colors.white;
                    }
                }
            }
        });

        // Calculate footer position dynamically
        const minFooterSpace = 25; // Minimum space needed for footer
        const contentEnd = doc.lastAutoTable.finalY;
        const footerY = Math.max(
            contentEnd + 10, // At least 10mm after content
            doc.internal.pageSize.height - minFooterSpace // Or at least 25mm from bottom
        );

        // Add enhanced footer with orange colors
        drawRoundedRect(doc, 15, footerY, doc.internal.pageSize.width - 30, 20, 3, colors.lightOrange, colors.primary);
        
        // Add confidentiality notice with updated styling
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(colors.text);
        doc.text('🔒 CONFIDENTIAL - Hayleys Fentons Security Report', doc.internal.pageSize.width / 2, footerY + 5, { align: 'center' });
        doc.text('Generated by Hayleys Fentons Security Monitoring System', doc.internal.pageSize.width / 2, footerY + 10, { align: 'center' });
        doc.text('For authorized personnel only - Handle with appropriate security measures', doc.internal.pageSize.width / 2, footerY + 15, { align: 'center' });

        // Add page numbers with orange
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            // Position page number above the confidentiality notice
            const pageNumberY = footerY - 5; // Adjust this value as needed
            drawRoundedRect(doc, doc.internal.pageSize.width / 2 - 15, doc.internal.pageSize.height - 15, 30, 8, 2, colors.primary);
            doc.setFontSize(10);
            doc.setTextColor(colors.white);
            doc.setFont('helvetica', 'bold');
            doc.text(`${i} / ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        }

        // Generate filename
        const filename = `security-incidents-report-${new Date().toISOString().split('T')[0]}.pdf`;

        // Save the PDF
        doc.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF report');
    }
};