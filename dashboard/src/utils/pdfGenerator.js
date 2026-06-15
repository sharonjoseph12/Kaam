import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export async function generateWageSlipPDF(wageData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 51, 153);
  doc.text('KAAM Setu - Verified Wage Slip', pageWidth / 2, 20, { align: 'center' });

  // Verification URL & QR
  const verifyUrl = `${window.location.origin}/verify/${wageData.hash_id}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1 });

  doc.addImage(qrDataUrl, 'PNG', pageWidth - 50, 10, 40, 40);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Hash: ${wageData.hash_id.substring(0, 16)}...`, pageWidth - 50, 55);

  // Worker Info
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Worker: ${wageData.worker_name}`, 20, 40);
  doc.setFontSize(12);
  doc.text(`Site: ${wageData.site_name}`, 20, 48);
  doc.text(`Contractor: ${wageData.contractor_name}`, 20, 56);
  doc.text(`Period: ${wageData.period}`, 20, 64);
  doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 20, 72);

  // Calculation Table
  doc.setLineWidth(0.5);
  doc.line(20, 80, pageWidth - 20, 80);

  let y = 90;
  const col1 = 20;
  const col2 = pageWidth - 60;

  const addRow = (label, value, bold = false) => {
    if (bold) doc.setFont('helvetica', 'bold');
    else doc.setFont('helvetica', 'normal');
    doc.text(label, col1, y);
    doc.text(`Rs. ${value}`, col2, y, { align: 'right' });
    y += 10;
  };

  addRow('Days Worked:', wageData.days_worked);
  addRow('Daily Wage Rate:', wageData.daily_wage);
  addRow('Base Pay:', wageData.base_pay);
  addRow('Overtime:', wageData.overtime);
  addRow('Gross Pay:', wageData.gross_pay, true);
  
  y += 5;
  doc.line(20, y - 10, pageWidth - 20, y - 10);
  
  addRow('Advances Given:', `-${wageData.advances}`);
  addRow('Other Deductions:', `-${wageData.deductions}`);

  y += 5;
  doc.line(20, y - 10, pageWidth - 20, y - 10);

  doc.setFontSize(16);
  addRow('NET PAY:', wageData.net_pay, true);

  // Footer
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150);
  doc.text('Scan the QR code to verify this document cryptographically on KAAM Setu.', pageWidth / 2, 280, { align: 'center' });

  // Return PDF as Blob
  return doc.output('blob');
}
