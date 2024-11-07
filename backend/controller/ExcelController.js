require("dotenv").config();
const {successResponse, errorResponse, formatedError} = require('./baseController');
const db = require('../config/db'); // Adjust the path to your actual db config
const { AssetRegister } = require('../models/assets/AssetRegister'); // Adjust the path as necessary
const { Furniture } = require('../models/assets/Furniture'); // Adjust based on your structure
const {Op} = require("sequelize");
const {Roads} = require("../models/assets/Roads");
const {BiologicalAsset} = require("../models/assets/BiologicalAsset");
const {MotorVehicle} = require("../models/assets/MotorVehicle");
const {Land} = require("../models/assets/Land");
const {Building} = require("../models/assets/Building");

// Get all Account Type
const UploadExcel = async (req, res) => {
    const { fileName, file_type, detail, asset_id, branch_id } = req.body; // Assuming your JSON data is sent in the request body
    const { icode } = req;
    // Start a transaction
console.log(req.body)
    if (Number(branch_id) !== Number(req.bid)){
        return errorResponse(res, 422, "File Signature and Branch you are trying to upload doesn't match");
    }

    // Check if fileName already exists in AssetRegister
    const existingFile = await AssetRegister.findOne({
        where: { file_name: fileName }
    });

    if (existingFile) {
        return errorResponse(res, 422, "The file name already exists in the Asset Register. Please use a different file name.");
    }
    const t = await db.transaction();
    try {
        for (const item of detail) {
            // Insert into AssetRegister and get the ID
            const ar_barcode = await generateBarcode(icode, t);
            const assetRegister = await AssetRegister.create({
                // Assuming mappings are done correctly here to match AssetRegister fields
                asset_item_id: item.item_name, // This should be an ID, ensure correct mapping
                branch_id: req.bid,
                ar_unit: item.unit, // Adjust as necessary
                ar_acquisition_date: new Date(item.acquisition_date), // Ensure date format is correct
                ar_capitalization_date: new Date(item.capitalization_date),
                ar_acquisition_cost: item.acquisition_cost,
                ar_department_name:  item.department, // Adjust as necessary
                ar_condition: item.condition,
                asset_type: item.item_type, // Ensure this is mapped correctly
                ar_remark: 'Okay', // Adjust as necessary
                ar_barcode: ar_barcode, // Adjust as necessary
                latitude: item.latitude.toString(),
                longitude: item.longitude.toString(),
                file_name: fileName
            }, {transaction: t});

            if (String(file_type) === "furniture") {
                // Now insert into Furniture using the AssetRegister ID
                console.log("Furniture uploaded");
                await Furniture.create({
                    asset_registrar_id: assetRegister.id,
                    af_desc_1: item.desc1.toString(),
                    af_desc_2: item.desc2.toString(),
                    af_desc_3: item.desc3.toString(),
                    af_desc_4: item.desc4.toString(),
                    af_desc_5: item.desc5.toString(),
                    af_desc_6: item.desc6.toString(),
                    // Map additional descriptions as needed
                    af_building: item.desc7.toString(), // Adjust as necessary
                    af_floor: item.desc8.toString(), // Adjust as necessary
                    af_room: item.desc9.toString(), // Adjust as necessary
                }, {transaction: t});
            }
            else if (String(file_type) === "roads") {
                // Now insert into Road using the AssetRegister ID
                console.log("Roads uploaded");
                await Roads.create({
                    asset_registrar_id: assetRegister.id,
                    ar_description: item.desc1.toString(),
                    ar_type: item.desc2.toString(),
                    ar_length: item.desc3.toString(),
                    ar_from: item.desc4.toString(),
                    ar_to: item.desc5.toString()
                }, {transaction: t});
            }
            else if (String(file_type) === "biological") {
                // Now insert into Biological using the AssetRegister ID
                console.log("Biological Asset uploaded");
                await BiologicalAsset.create({
                    asset_registrar_id: assetRegister.id,
                    description: item.desc1.toString(),
                    sex: item.desc2.toString(),
                    age: item.desc3.toString(),
                    quantity: item.desc4.toInt()
                }, {transaction: t});
            }
            else if (String(file_type) === "building") {
                // Now insert into Building using the AssetRegister ID
                console.log("Building uploaded");
                await Building.create({
                    asset_registrar_id: assetRegister.id,
                    ab_description: item.desc1.toString(),
                    detailed_description: item.desc2.toString(),
                    ab_floor: item.desc3.toString(),
                    ab_usage: item.desc4.toString(),
                    ab_plot_no: item.desc5.toString(),
                    description_type: item.desc6.toString()
                }, {transaction: t});
            }
            else if (String(file_type) === "land") {
                // Now insert into Building using the AssetRegister ID
                console.log("Land uploaded uploaded");
                await Land.create({
                    asset_registrar_id: assetRegister.id,
                    al_plot_no: item.desc1.toString(),
                    al_title_deed: item.desc2.toString(),
                    al_square_meter: item.desc3.toString(),
                    al_survey_status: item.desc5.toString(),
                    al_right_occupancy: item.desc5.toString(),
                    al_end_right_occupancy: item.desc5.toString()
                }, {transaction: t});
            }
            else if (String(file_type) === "motor_vehicle") {
                // Now insert into Building using the AssetRegister ID
                console.log("Motor vehicle uploaded");
                await MotorVehicle.create({
                    asset_registrar_id: assetRegister.id,
                    av_make: item.desc1.toString(),
                    av_model: item.desc2.toString(),
                    av_body_type: item.desc3.toString(),
                    av_capacity: item.desc4.toString(),
                    av_engine_no: item.desc5.toString(),
                    av_chesis_no: item.desc6.toString(),
                    av_manufacture_year: item.desc8.toString()
                }, {transaction: t});
            }
        }

        // If everything was successful, commit the transaction
        await t.commit();
        return successResponse(res, "Asset registers and furniture created successfully.")
    } catch (error) {
        // If an error occurs, rollback the transaction
        await t.rollback();

        console.error('Error creating asset registers and '+file_type, error);
        return errorResponse(res, 422, "Failed to create asset registers and "+file_type)
    }
};

// Helper function to pad the number
const padNumber = (num, size) => {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
};

const generateBarcode = async (icode, transaction) => {
    const latestRecord = await AssetRegister.findOne({
        where: {
            ar_barcode: {
                [Op.like]: `${icode}%`,
            },
        },
        order: [['ar_barcode', 'DESC']],
        transaction: transaction, // Use transaction if provided
    });

    let newBarcode;
    if (latestRecord) {
        const lastCode = parseInt(latestRecord.ar_barcode.slice(icode.length), 10);
        newBarcode = `${icode}${padNumber(lastCode + 1, 4)}`;
    } else {
        newBarcode = `${icode}0001`;
    }

    return newBarcode;
};

module.exports = {
    UploadExcel
}