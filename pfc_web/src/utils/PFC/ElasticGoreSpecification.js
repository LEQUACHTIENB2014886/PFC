import { copyPageInSameSheet, getCellValue, getURLImage, insertImageIntoFileExcel } from "./ExcelFunction";
import { GetAllPFCItemElasticGoreSpecification, GetAllPFCElasticGoreSpecification } from "@/hooks/PFC/useElasticGoreSpecification";

const insertDataInFileExcelSheetElasticGoreSpecification = async (
    sheet,
    pfcModel,
    pageSetup
) => {
    const promises = [];
    const res = await GetAllPFCElasticGoreSpecification(pfcModel);
    const arrPFCElasticGoreSpecification = res.data.data;
    if (arrPFCElasticGoreSpecification.length < 1) {
        return;
    }

    const promise = await copyPageInSameSheet(sheet, [1, 1, 64, 42], arrPFCElasticGoreSpecification.length)
    if (promise) {
        promises.push(promise);
    }
    const promise1 = await insertData(sheet, pfcModel, [1, 1, 64, 42], arrPFCElasticGoreSpecification)
    if (promise1) {
        promises.push(promise1);
    }
    await Promise.all(promises);
}

const insertData = async (
    sheet,
    pfcModel,
    range,
    arrPFCElasticGoreSpecification
) => {
    for (let i = 0; i < arrPFCElasticGoreSpecification.length; i++) {
        let pfcElasticGoreSpecification = arrPFCElasticGoreSpecification[i];
        const ModelTypeCell = getCellValue(sheet, range, i, "B1")
        ModelTypeCell.value = pfcModel.ModelType

        const ModelNameCell = getCellValue(sheet, range, i, "B2")
        ModelNameCell.value = pfcModel.ModelName

        const MaterialNumberCell = getCellValue(sheet, range, i, "B3")
        MaterialNumberCell.value = pfcModel.MaterialNumber

        const TitleCell = getCellValue(sheet, range, i, "Q1")
        TitleCell.value = pfcElasticGoreSpecification.Title

        const res = await GetAllPFCItemElasticGoreSpecification(pfcElasticGoreSpecification);
        const arrPFCItemElasticGoreSpecification = res.data.data;
        if (arrPFCItemElasticGoreSpecification.length > 0) {
            for (let j = 0; j < arrPFCItemElasticGoreSpecification.length; j++) {
                let pfcItemElasticGoreSpecification = arrPFCItemElasticGoreSpecification[j];

                let addressComponent = getAddressComponent(pfcItemElasticGoreSpecification.ItemIndex)
                const addressComponentCell = getCellValue(sheet, range, i, addressComponent)
                addressComponentCell.value = pfcItemElasticGoreSpecification.Component

                let addressVendor = getAddressVendor(pfcItemElasticGoreSpecification.ItemIndex)
                const addressVendorCell = getCellValue(sheet, range, i, addressVendor)
                addressVendorCell.value = pfcItemElasticGoreSpecification.Vendor

                let addressMaterial = getAddressMaterial(pfcItemElasticGoreSpecification.ItemIndex)
                const addressMaterialCell = getCellValue(sheet, range, i, addressMaterial)
                addressMaterialCell.value = pfcItemElasticGoreSpecification.Material

                const elasticGore1 = JSON.parse(pfcItemElasticGoreSpecification.TableRow1)
                let addressModel = getAddressModel(pfcItemElasticGoreSpecification.ItemIndex)
                const addressModelCell = getCellValue(sheet, range, i, addressModel)
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 0).value = elasticGore1.Model
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 3).value = elasticGore1.SIZE
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 6).value = elasticGore1.A
                sheet.getCell(addressModelCell.row + 1, addressModelCell.col + 9).value = elasticGore1.B

                const elasticGore2 = JSON.parse(pfcItemElasticGoreSpecification.TableRow2)
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 3).value = elasticGore2.SIZE
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 6).value = elasticGore2.A
                sheet.getCell(addressModelCell.row + 2, addressModelCell.col + 9).value = elasticGore2.B

                const elasticGore3 = JSON.parse(pfcItemElasticGoreSpecification.TableRow3)
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 3).value = elasticGore3.SIZE
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 6).value = elasticGore3.A
                sheet.getCell(addressModelCell.row + 3, addressModelCell.col + 9).value = elasticGore3.B

                const elasticGore4 = JSON.parse(pfcItemElasticGoreSpecification.TableRow4)
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 3).value = elasticGore4.SIZE
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 6).value = elasticGore4.A
                sheet.getCell(addressModelCell.row + 4, addressModelCell.col + 9).value = elasticGore4.B

                const elasticGore5 = JSON.parse(pfcItemElasticGoreSpecification.TableRow5)
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 3).value = elasticGore5.SIZE
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 6).value = elasticGore5.A
                sheet.getCell(addressModelCell.row + 5, addressModelCell.col + 9).value = elasticGore5.B

                let addressImageContent = getAddressImageContent(pfcItemElasticGoreSpecification.ItemIndex)
                const imageContentCell = getCellValue(sheet, range, i, addressImageContent)
                imageContentCell.value = ""
                await insertImageIntoFileExcel(getURLImage(pfcItemElasticGoreSpecification.ImageContent, pfcModel), imageContentCell, sheet, imageContentCell.row, imageContentCell.col, 450, 150);
            }
        }
    }
}

const getAddressComponent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "J5"
    }

    if (ItemIndex === "2") {
        return "AO5"
    }

    if (ItemIndex === "3") {
        return "J24"
    }

    if (ItemIndex === "4") {
        return "AO24"
    }
}

const getAddressVendor = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "J6"
    }

    if (ItemIndex === "2") {
        return "AO6"
    }

    if (ItemIndex === "3") {
        return "J25"
    }

    if (ItemIndex === "4") {
        return "AO25"
    }
}

const getAddressMaterial = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "B20"
    }

    if (ItemIndex === "2") {
        return "AG20"
    }

    if (ItemIndex === "3") {
        return "B39"
    }

    if (ItemIndex === "4") {
        return "AG39"
    }
}

const getAddressModel = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "V17"
    }

    if (ItemIndex === "2") {
        return "BA17"
    }

    if (ItemIndex === "3") {
        return "V36"
    }

    if (ItemIndex === "4") {
        return "BA36"
    }
}

const getAddressImageContent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "C7"
    }

    if (ItemIndex === "2") {
        return "AH7"
    }

    if (ItemIndex === "3") {
        return "C26"
    }

    if (ItemIndex === "4") {
        return "AH26"
    }
}

export {
    insertDataInFileExcelSheetElasticGoreSpecification
}