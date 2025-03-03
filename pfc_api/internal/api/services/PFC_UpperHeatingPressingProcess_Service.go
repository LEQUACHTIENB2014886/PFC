package services

import (
	"database/sql"
	"fmt"
	"web-api/internal/pkg/database"
	"web-api/internal/pkg/models/types"
)

type PFCUpperHeatingPressingProcessService struct {
	*BaseService
}

var PFCUpperHeatingPressingProcess = &PFCUpperHeatingPressingProcessService{}

func (s *PFCUpperHeatingPressingProcessService) GetAllPFCUpperHeatingPressingProcess(pfcModel *types.PFCModel) (*[]types.PFC_UpperHeatingPressingProcess, error) {
	var arrUpperHeatingPressingProcess *[]types.PFC_UpperHeatingPressingProcess
	db, err := database.DatabaseConnection()
	if err != nil {
		fmt.Println("Database connection error:", err)
		return nil, err
	}
	dbInstance, _ := db.DB()
	query := `
	SELECT 
		CAST(UpperHeatingPressingProcessID AS NVARCHAR(36)) AS UpperHeatingPressingProcessID,
		ModelType,
		ModelName,
		MaterialNumber,
		Title,
		ComponentName,
		BOM,
		Material,
		Vendor,
		Process,
		ImageRemark,
		RemarksA,
		RemarksB,
		RemarksSize
	FROM PFC_UpperHeatingPressingProcess
	WHERE
		ModelType = @ModelType
		AND ModelName = @ModelName
		AND MaterialNumber = @MaterialNumber
	ORDER BY ItemIndex ASC
`
	err = db.Raw(query,
		sql.Named("ModelType", pfcModel.ModelType),
		sql.Named("ModelName", pfcModel.ModelName),
		sql.Named("MaterialNumber", pfcModel.MaterialNumber),
	).Scan(&arrUpperHeatingPressingProcess).Error
	if err != nil {
		fmt.Println("Query error:", err)
		return nil, err
	}
	dbInstance.Close()

	return arrUpperHeatingPressingProcess, nil
}

func (s *PFCUpperHeatingPressingProcessService) InsertNewPFCUpperHeatingPressingProcess(req *types.PFC_UpperHeatingPressingProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var UpperHeatingPressingProcessID string

	query := `
		INSERT INTO PFC_UpperHeatingPressingProcess(UpperHeatingPressingProcessID, ModelType, ModelName, MaterialNumber, Title, ComponentName, BOM, Material, Vendor, Process, ImageRemark, RemarksA, RemarksB, RemarksSize, ItemIndex)
		OUTPUT CAST(INSERTED.UpperHeatingPressingProcessID AS NVARCHAR(36)) AS UpperHeatingPressingProcessID
		VALUES (NEWID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`
	if err := tx.Raw(
		query,
		req.ModelType,
		req.ModelName,
		req.MaterialNumber,
		req.Title,
		req.ComponentName,
		req.BOM,
		req.Material,
		req.Vendor,
		req.Process,
		req.ImageRemark,
		req.RemarksA,
		req.RemarksB,
		req.RemarksSize,
		req.ItemIndex,
	).Scan(
		&UpperHeatingPressingProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return UpperHeatingPressingProcessID, nil
}

func (s *PFCUpperHeatingPressingProcessService) UpdatePFCUpperHeatingPressingProcess(req *types.PFC_UpperHeatingPressingProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var UpperHeatingPressingProcessID string

	query := `
		UPDATE PFC_UpperHeatingPressingProcess
		SET Title = ?,
			ComponentName = ?,
			BOM = ?,
			Material = ?,
			Vendor = ?,
			Process = ?,
			ImageRemark  = ?,
			RemarksA = ?,
			RemarksB = ?,
			RemarksSize = ?
		OUTPUT CAST(INSERTED.UpperHeatingPressingProcessID AS NVARCHAR(36)) AS UpperHeatingPressingProcessID
		WHERE UpperHeatingPressingProcessID = ?
	`
	if err := tx.Raw(
		query,
		req.Title,
		req.ComponentName,
		req.BOM,
		req.Material,
		req.Vendor,
		req.Process,
		req.ImageRemark,
		req.RemarksA,
		req.RemarksB,
		req.RemarksSize,
		req.UpperHeatingPressingProcessID,
	).Scan(
		&UpperHeatingPressingProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return UpperHeatingPressingProcessID, nil
}

func (s *PFCUpperHeatingPressingProcessService) DeletePFCUpperHeatingPressingProcess(req *types.PFC_UpperHeatingPressingProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	query := `
		DELETE FROM PFC_UpperHeatingPressingProcess
		WHERE UpperHeatingPressingProcessID = ?
	`

	if err := tx.Exec(query,
		req.UpperHeatingPressingProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute delete query: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return "delete success", nil
}
