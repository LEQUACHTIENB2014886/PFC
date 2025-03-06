import { getPFCItemPerforationSpecification, getPFCPerforationSpecificationByModelID } from "@/hooks/PFC/usePerforationSpecification";
import { copyPageInSameSheet, getCellValue, getURLImage, insertImageIntoFileExcel } from "./ExcelFunction";

const insertDataInFileExcelSheetPerforationSpecification = async (
    sheet,
    pfcModel,
    pageSetup
) => {
    const promises = [];
    const { res, error } = await getPFCPerforationSpecificationByModelID(pfcModel);
    const arrPFCPerforationSpecification = res.data.data;
    if (arrPFCPerforationSpecification.length < 1) {
        return;
    }

    const promise = await copyPageInSameSheet(sheet, [1, 1, 70, 46], arrPFCPerforationSpecification.length)
    if (promise) {
        promises.push(promise);
    }
    const promise1 = await insertData(sheet, pfcModel, [1, 1, 70, 46], arrPFCPerforationSpecification)
    if (promise1) {
        promises.push(promise1);
    }
    await Promise.all(promises);
}

const insertData = async (
    sheet,
    pfcModel,
    range,
    arrPFCPerforationSpecification
) => {
    for (let i = 0; i < arrPFCPerforationSpecification.length; i++) {
        let pfcPerforationSpecification = arrPFCPerforationSpecification[i];
        const ModelTypeCell = getCellValue(sheet, range, i, "B1")
        ModelTypeCell.value = pfcModel.ModelType

        const ModelNameCell = getCellValue(sheet, range, i, "B2")
        ModelNameCell.value = pfcModel.ModelName

        const MaterialNumberCell = getCellValue(sheet, range, i, "B3")
        MaterialNumberCell.value = pfcModel.MaterialNumber

        const TitleCell = getCellValue(sheet, range, i, "S1")
        TitleCell.value = pfcPerforationSpecification.Title

        const { res, error } = await getPFCItemPerforationSpecification(pfcPerforationSpecification);
        const arrPFCItemPerforationSpecification = res.data.data;
        if (arrPFCItemPerforationSpecification.length > 0) {
            for (let j = 0; j < arrPFCItemPerforationSpecification.length; j++) {
                let pfcItemPerforationSpecification = arrPFCItemPerforationSpecification[j];

                let addressComponent = getAddressComponent(pfcItemPerforationSpecification.ItemIndex)
                const addressComponentCell = getCellValue(sheet, range, i, addressComponent)
                addressComponentCell.value = pfcItemPerforationSpecification.Component

                const SizeGroup1 = JSON.parse(pfcItemPerforationSpecification.SizeGroup1)
                let addressSizeGroup1 = getAddressSizeGroup1(pfcItemPerforationSpecification.ItemIndex)
                const addressSizeGroup1Cell = getCellValue(sheet, range, i, addressSizeGroup1)
                addressSizeGroup1Cell.value = SizeGroup1.SizeGroup;
                let addressA1 = getAddressA1(pfcItemPerforationSpecification.ItemIndex)
                const A1Cell = getCellValue(sheet, range, i, addressA1)
                A1Cell.value = SizeGroup1.A
                let addressB1 = getAddressB1(pfcItemPerforationSpecification.ItemIndex)
                const B1Cell = getCellValue(sheet, range, i, addressB1)
                B1Cell.value = SizeGroup1.B
                let addressC1 = getAddressC1(pfcItemPerforationSpecification.ItemIndex)
                const C1Cell = getCellValue(sheet, range, i, addressC1)
                C1Cell.value = SizeGroup1.C
                let addressD1 = getAddressD1(pfcItemPerforationSpecification.ItemIndex)
                const D1Cell = getCellValue(sheet, range, i, addressD1)
                D1Cell.value = SizeGroup1.D
                let addressE1 = getAddressE1(pfcItemPerforationSpecification.ItemIndex)
                const E1Cell = getCellValue(sheet, range, i, addressE1)
                E1Cell.value = SizeGroup1.E


                const SizeGroup2 = JSON.parse(pfcItemPerforationSpecification.SizeGroup2)
                const SizeGroup2Cell = sheet.getCell(addressSizeGroup1Cell.row + 1, addressSizeGroup1Cell.col);
                SizeGroup2Cell.value = SizeGroup2.SizeGroup
                const A2Cell = sheet.getCell(A1Cell.row + 1, A1Cell.col);
                A2Cell.value = SizeGroup2.A
                const B2Cell = sheet.getCell(B1Cell.row + 1, B1Cell.col);
                B2Cell.value = SizeGroup2.B
                const C2Cell = sheet.getCell(C1Cell.row + 1, C1Cell.col);
                C2Cell.value = SizeGroup2.C
                const D2Cell = sheet.getCell(D1Cell.row + 1, D1Cell.col);
                D2Cell.value = SizeGroup2.D
                const E2Cell = sheet.getCell(E1Cell.row + 1, E1Cell.col);
                E2Cell.value = SizeGroup2.E

                const SizeGroup3 = JSON.parse(pfcItemPerforationSpecification.SizeGroup3)
                const SizeGroup3Cell = sheet.getCell(SizeGroup2Cell.row + 1, SizeGroup2Cell.col);
                SizeGroup3Cell.value = SizeGroup3.SizeGroup
                const A3Cell = sheet.getCell(A2Cell.row + 1, A2Cell.col);
                A3Cell.value = SizeGroup3.A
                const B3Cell = sheet.getCell(B2Cell.row + 1, B2Cell.col);
                B3Cell.value = SizeGroup3.B
                const C3Cell = sheet.getCell(C2Cell.row + 1, C2Cell.col);
                C3Cell.value = SizeGroup3.C
                const D3Cell = sheet.getCell(D2Cell.row + 1, D2Cell.col);
                D3Cell.value = SizeGroup3.D
                const E3Cell = sheet.getCell(E2Cell.row + 1, E2Cell.col);
                E3Cell.value = SizeGroup3.E

                let addressImageContent = getAddressImageContent(pfcItemPerforationSpecification.ItemIndex)
                const imageContentCell = getCellValue(sheet, range, i, addressImageContent)
                imageContentCell.value = ""
                await insertImageIntoFileExcel(getURLImage(pfcItemPerforationSpecification.ImageContent, pfcModel), imageContentCell, sheet, imageContentCell.row, imageContentCell.col, 800, 300);
            }
        }
    }
}

const getAddressComponent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "M4"
    }

    if (ItemIndex === "2") {
        return "AU4"
    }

    if (ItemIndex === "3") {
        return "M25"
    }

    if (ItemIndex === "4") {
        return "AU25"
    }
}

const getAddressSizeGroup1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "B22"
    }

    if (ItemIndex === "2") {
        return "AJ22"
    }

    if (ItemIndex === "3") {
        return "B43"
    }

    if (ItemIndex === "4") {
        return "AJ43"
    }
}

const getAddressA1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "H22"
    }

    if (ItemIndex === "2") {
        return "AP22"
    }

    if (ItemIndex === "3") {
        return "H43"
    }

    if (ItemIndex === "4") {
        return "AP43"
    }
}

const getAddressB1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "K22"
    }

    if (ItemIndex === "2") {
        return "AS22"
    }

    if (ItemIndex === "3") {
        return "K43"
    }

    if (ItemIndex === "4") {
        return "AS43"
    }
}

const getAddressC1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "N22"
    }

    if (ItemIndex === "2") {
        return "AV22"
    }

    if (ItemIndex === "3") {
        return "N43"
    }

    if (ItemIndex === "4") {
        return "AV43"
    }
}

const getAddressD1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "Q22"
    }

    if (ItemIndex === "2") {
        return "AY22"
    }

    if (ItemIndex === "3") {
        return "Q43"
    }

    if (ItemIndex === "4") {
        return "AY43"
    }
}

const getAddressE1 = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "T22"
    }

    if (ItemIndex === "2") {
        return "BB22"
    }

    if (ItemIndex === "3") {
        return "T43"
    }

    if (ItemIndex === "4") {
        return "BB43"
    }
}

const getAddressImageContent = (ItemIndex) => {
    if (ItemIndex === "1") {
        return "B5"
    }

    if (ItemIndex === "2") {
        return "AJ5"
    }

    if (ItemIndex === "3") {
        return "B26"
    }

    if (ItemIndex === "4") {
        return "AJ26"
    }
}

export {
    insertDataInFileExcelSheetPerforationSpecification
}