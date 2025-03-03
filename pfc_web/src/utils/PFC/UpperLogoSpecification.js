import { copyPageInSameSheet, getCellValue, getURLImage, insertImageIntoFileExcel } from "./ExcelFunction";
import { GetAllPFCItemUpperLogoSpecification, GetAllPFCUpperLogoSpecification } from "@/hooks/PFC/useUpperLogoSpecification";

const insertDataInFileExcelSheetUpperLogoSpecification = async (
    sheet,
    pfcModel,
    pageSetup
) => {
    const promises = [];
    const res = await GetAllPFCUpperLogoSpecification(pfcModel);
    const arrPFCUpperLogoSpecification = res.data.data;
    if (arrPFCUpperLogoSpecification.length < 1) {
        return;
    }

    const promise = await copyPageInSameSheet(sheet, [1, 1, 64, 42], arrPFCUpperLogoSpecification.length)
    if (promise) {
        promises.push(promise);
    }
    const promise1 = await insertData(sheet, pfcModel, [1, 1, 64, 42], arrPFCUpperLogoSpecification)
    if (promise1) {
        promises.push(promise1);
    }
    await Promise.all(promises);
}

const insertData = async (
    sheet,
    pfcModel,
    range,
    arrPFCUpperLogoSpecification
) => {
    for (let i = 0; i < arrPFCUpperLogoSpecification.length; i++) {
        let pfcUpperLogoSpecification = arrPFCUpperLogoSpecification[i];
        const ModelTypeCell = getCellValue(sheet, range, i, "B1")
        ModelTypeCell.value = pfcModel.ModelType

        const ModelNameCell = getCellValue(sheet, range, i, "B2")
        ModelNameCell.value = pfcModel.ModelName

        const MaterialNumberCell = getCellValue(sheet, range, i, "B3")
        MaterialNumberCell.value = pfcModel.MaterialNumber

        const TitleCell = getCellValue(sheet, range, i, "Q1")
        TitleCell.value = pfcUpperLogoSpecification.Title

        const res = await GetAllPFCItemUpperLogoSpecification(pfcUpperLogoSpecification);
        const arrPFCItemUpperLogoSpecification = res.data.data;
        if (arrPFCItemUpperLogoSpecification.length > 0) {
            for (let j = 0; j < arrPFCItemUpperLogoSpecification.length; j++) {
                let pfcItemUpperLogoSpecification = arrPFCItemUpperLogoSpecification[j];

                let addressComponent = getAddressComponent(pfcItemUpperLogoSpecification.ItemIndex)
                const addressComponentCell = getCellValue(sheet, range, i, addressComponent)
                addressComponentCell.value = pfcItemUpperLogoSpecification.Component

                let addressVendor = getAddressVendor(pfcItemUpperLogoSpecification.ItemIndex)
                const addressVendorCell = getCellValue(sheet, range, i, addressVendor)
                addressVendorCell.value = pfcItemUpperLogoSpecification.Vendor

                let addressMaterial = getAddressMaterial(pfcItemUpperLogoSpecification.ItemIndex)
                const addressMaterialCell = getCellValue(sheet, range, i, addressMaterial)
                addressMaterialCell.value = pfcItemUpperLogoSpecification.Material

                const upperLogo1 = JSON.parse(pfcItemUpperLogoSpecification.TableRow1)
                let addressModel = getAddressModel(pfcItemUpperLogoSpecification.ItemIndex)
                const addressModelCell = getCellValue(sheet, range, i, addressModel)
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 0).value = upperLogo1.Model
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 3).value = upperLogo1.SIZE
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 5).value = upperLogo1.A
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 8).value = upperLogo1.B

                const upperLogo2 = JSON.parse(pfcItemUpperLogoSpecification.TableRow2)
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col).value = upperLogo2.Model
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 3).value = upperLogo2.SIZE
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 5).value = upperLogo2.A
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 8).value = upperLogo2.B

                const upperLogo3 = JSON.parse(pfcItemUpperLogoSpecification.TableRow3)
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col).value = upperLogo3.Model
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 3).value = upperLogo3.SIZE
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 5).value = upperLogo3.A
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 8).value = upperLogo3.B

                const upperLogo4 = JSON.parse(pfcItemUpperLogoSpecification.TableRow4)
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col).value = upperLogo4.Model
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 3).value = upperLogo4.SIZE
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 5).value = upperLogo4.A
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 8).value = upperLogo4.B

                const upperLogo5 = JSON.parse(pfcItemUpperLogoSpecification.TableRow5)
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col).value = upperLogo5.Model
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 3).value = upperLogo5.SIZE
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 5).value = upperLogo5.A
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 8).value = upperLogo5.B

                const upperLogo6 = JSON.parse(pfcItemUpperLogoSpecification.TableRow6)
                sheet.getCell(addressModelCell.row + 6, addressModelCell.col).value = upperLogo6.Model
                sheet.getCell(addressModelCell.row + 6, addressModelCell.col + 3).value = upperLogo6.SIZE
                sheet.getCell(addressModelCell.row + 6, addressModelCell.col + 5).value = upperLogo6.A
                sheet.getCell(addressModelCell.row + 6, addressModelCell.col + 8).value = upperLogo6.B

                let addressImageContent = getAddressImageContent(pfcItemUpperLogoSpecification.ItemIndex)
                const imageContentCell = getCellValue(sheet, range, i, addressImageContent)
                imageContentCell.value = ""
                await insertImageIntoFileExcel(getURLImage(pfcItemUpperLogoSpecification.ImageContent, pfcModel), imageContentCell, sheet, imageContentCell.row, imageContentCell.col, 450, 200);
            }
        }
    }
}

const getAddressComponent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "J5"
    }

    if (ItemIndex === "2") {
        return "AN5"
    }

    if (ItemIndex === "3") {
        return "J24"
    }

    if (ItemIndex === "4") {
        return "AN24"
    }
}

const getAddressVendor = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "J6"
    }

    if (ItemIndex === "2") {
        return "AN6"
    }

    if (ItemIndex === "3") {
        return "J25"
    }

    if (ItemIndex === "4") {
        return "AN25"
    }
}

const getAddressMaterial = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "B20"
    }

    if (ItemIndex === "2") {
        return "AF20"
    }

    if (ItemIndex === "3") {
        return "B39"
    }

    if (ItemIndex === "4") {
        return "AF39"
    }
}

const getAddressModel = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "V16"
    }

    if (ItemIndex === "2") {
        return "AZ16"
    }

    if (ItemIndex === "3") {
        return "V35"
    }

    if (ItemIndex === "4") {
        return "AZ35"
    }
}

const getAddressImageContent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "C7"
    }

    if (ItemIndex === "2") {
        return "AG7"
    }

    if (ItemIndex === "3") {
        return "C26"
    }

    if (ItemIndex === "4") {
        return "AG26"
    }
}

export {
    insertDataInFileExcelSheetUpperLogoSpecification
}