import { jsPDF } from "jspdf";
import "jspdf-autotable";

const displaySheetAsPDF = async (sheetName, workbook) => {
    if (!workbook) {
        console.log("No workbook loaded.");
        return;
    }

    try {
        const sheet = workbook.getWorksheet(sheetName);
        if (!sheet) {
            console.error(`Sheet with name "${sheetName}" not found.`);
            return;
        }

        const rows = [];
        sheet.eachRow({ includeEmpty: false }, (row) => {
            rows.push(row.values.slice(1));
        });

        const pdf = new jsPDF();
        pdf.autoTable({
            head: [rows[0]],
            body: rows.slice(1),
        });

        const pdfBlob = pdf.output("blob");

        const iframe = document.createElement("iframe");
        iframe.src = URL.createObjectURL(pdfBlob);
        iframe.width = "80vw";
        iframe.height = "80vh";
        iframe.style.border = "1px solid #ddd";

        const container = document.getElementById("pdf-container");
        if (!container) {
            console.error("Element with id 'pdf-container' not found.");
            return;
        }

        container.innerHTML = "";
        container.appendChild(iframe);
    } catch (error) {
        console.error("Error during PDF generation:", error);
    }
};

export { displaySheetAsPDF };
