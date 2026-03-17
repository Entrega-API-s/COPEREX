import ExcelJS from "exceljs";
import Business from "../businesses/businesses.model.js";

export const exportBusinessReport = async (req, res) => {
    try {
        const businesses = await Business.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Business Report");

        worksheet.columns = [
            { header: "Business Name", key: "businessName", width: 25 },
            { header: "Sector", key: "sector", width: 20 },
            { header: "Impact Score", key: "impactScore", width: 15 },
            { header: "Experience", key: "experienceYears", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 20 }
        ];

        businesses.forEach(b => {
            worksheet.addRow({
                businessName: b.businessName,
                sector: b.sector,
                impactScore: b.impactScore,
                experienceYears: b.experienceYears,
                email: b.email,
                phone: b.phone
            });
        });

        worksheet.getRow(1).font = { bold: true };

        worksheet.getRow(1).eachCell(cell => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "00FF00" } // verde (cambiado)
            };
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=business-report.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error exporting report",
            error: error.message
        });
    }
};