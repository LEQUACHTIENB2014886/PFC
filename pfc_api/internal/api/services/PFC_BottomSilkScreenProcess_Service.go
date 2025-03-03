package services

import (
	"database/sql"
	"fmt"
	"web-api/internal/pkg/database"
	"web-api/internal/pkg/models/types"
)

type PFCBottomSilkScreenProcess struct {
	*BaseService
}

var PFCBottomSilkScreenProces = &PFCBottomSilkScreenProcess{}

func (s *PFCBottomSilkScreenProcess) GetAllPFCBottomSilkScreenProcess(pfcModel *types.PFCModel) (*[]types.PFC_BottomSilkScreenProcess, error) {
	var arrBottomSilkScreenProcess *[]types.PFC_BottomSilkScreenProcess
	db, err := database.DatabaseConnection()
	if err != nil {
		fmt.Println("Database connection error:", err)
		return nil, err
	}
	dbInstance, _ := db.DB()
	query := `
	SELECT 
		CAST(BottomSilkScreenProcessID AS NVARCHAR(36)) AS BottomSilkScreenProcessID,
		ModelType,
		ModelName,
		MaterialNumber,
		Title,
		Component,
		Material,
		Vendor,
		Remarks,
		RemarksImages,
		RemarksSize,
		TotalWBProcesses,
		TotalSBProcesses,
		ItemIndex
	FROM PFC_BottomSilkScreenProcess
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
	).Scan(&arrBottomSilkScreenProcess).Error
	if err != nil {
		fmt.Println("Query error:", err)
		return nil, err
	}
	dbInstance.Close()

	return arrBottomSilkScreenProcess, nil
}

func (s *PFCBottomSilkScreenProcess) InsertNewPFCBottomSilkScreenProcess(req *types.PFC_BottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var BottomSilkScreenProcessID string

	query := `
		INSERT INTO PFC_BottomSilkScreenProcess
		(
		BottomSilkScreenProcessID , ModelType, ModelName, MaterialNumber, Title, Component, Material, Vendor, Remarks, RemarksImages, RemarksSize,TotalWBProcesses,TotalSBProcesses, ItemIndex
		)
		OUTPUT CAST(INSERTED.BottomSilkScreenProcessID AS NVARCHAR(36)) AS BottomSilkScreenProcessID
		VALUES (NEWID(), ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?)

	`
	if err := tx.Raw(
		query,
		req.ModelType,
		req.ModelName,
		req.MaterialNumber,
		req.Title,
		req.Component,
		req.Material,
		req.Vendor,
		req.Remarks,
		req.RemarksImages,
		req.RemarksSize,
		req.TotalWBProcesses,
		req.TotalSBProcesses,
		req.ItemIndex,
	).Scan(
		&BottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return BottomSilkScreenProcessID, nil
}

func (s *PFCBottomSilkScreenProcess) UpdatePFCBottomSilkScreenProcess(req *types.PFC_BottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var BottomSilkScreenProcessID string

	query := `
		UPDATE PFC_BottomSilkScreenProcess
		SET Title = ?,
		Component = ?,
		Material = ?,
		Vendor = ?,
		Remarks = ?,
		RemarksImages = ?,
		RemarksSize = ?,
		TotalWBProcesses = ?,
		TotalSBProcesses = ?
		OUTPUT CAST(INSERTED.BottomSilkScreenProcessID AS NVARCHAR(36))
		WHERE BottomSilkScreenProcessID = ?;
		`

	if err := tx.Raw(
		query,
		req.Title,
		req.Component,
		req.Material,
		req.Vendor,
		req.Remarks,
		req.RemarksImages,
		req.RemarksSize,
		req.TotalWBProcesses,
		req.TotalSBProcesses,
		req.BottomSilkScreenProcessID,
	).Scan(
		&BottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return BottomSilkScreenProcessID, nil
}

func (s *PFCBottomSilkScreenProcess) DeletePFCBottomSilkScreenProcess(req *types.PFC_BottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	query := `
		DELETE FROM PFC_BottomSilkScreenProcess
		WHERE BottomSilkScreenProcessID = ?
	`

	if err := tx.Exec(query,
		req.BottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute delete query: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return "delete success", nil
}

// // ITEM PFC_BottomSilkScreenProcess

func (s *PFCBottomSilkScreenProcess) InsertNewPFCItemBottomSilkScreenProcess(req *types.PFC_ItemBottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var ItemBottomSilkScreenProcessID string

	query := `
		INSERT INTO PFC_ItemBottomSilkScreenProcess
		(
		ItemBottomSilkScreenProcessID ,BottomSilkScreenProcessID, ItemIndex, Process,Chemical,Hardener,WBSB, Temp, Time, Mesh
		)
		OUTPUT CAST(INSERTED.ItemBottomSilkScreenProcessID AS NVARCHAR(36)) AS ItemBottomSilkScreenProcessID
		VALUES (NEWID(), ?, ?, ?, ?, ?, ?, ?, ?, ?)

	`
	if err := tx.Raw(
		query,
		req.BottomSilkScreenProcessID,
		req.ItemIndex,
		req.Process,
		req.Chemical,
		req.Hardener,
		req.WBSB,
		req.Temp,
		req.Time,
		req.Mesh,
	).Scan(
		&ItemBottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return ItemBottomSilkScreenProcessID, nil
}

func (s *PFCBottomSilkScreenProcess) GetAllPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess *types.PFC_BottomSilkScreenProcess) (*[]types.PFC_ItemBottomSilkScreenProcess, error) {
	var arrItemBottomSilkScreenProcess *[]types.PFC_ItemBottomSilkScreenProcess
	db, err := database.DatabaseConnection()
	if err != nil {
		fmt.Println("Database connection error:", err)
		return nil, err
	}
	dbInstance, _ := db.DB()
	query := `
	SELECT
		CAST(ItemBottomSilkScreenProcessID AS NVARCHAR(36)) AS ItemBottomSilkScreenProcessID,
		CAST(BottomSilkScreenProcessID AS NVARCHAR(36)) AS BottomSilkScreenProcessID,
		ItemIndex, 
		Process,
		Chemical,
		Hardener,
		WBSB, 
		Temp, 
		Time, 
		Mesh
	FROM PFC_ItemBottomSilkScreenProcess
	WHERE BottomSilkScreenProcessID = @BottomSilkScreenProcessID
	ORDER BY ItemIndex ASC
`
	err = db.Raw(query,
		sql.Named("BottomSilkScreenProcessID", pfcBottomSilkScreenProcess.BottomSilkScreenProcessID),
	).Scan(&arrItemBottomSilkScreenProcess).Error
	if err != nil {
		fmt.Println("Query error:", err)
		return nil, err
	}
	dbInstance.Close()

	return arrItemBottomSilkScreenProcess, nil
}

func (s *PFCBottomSilkScreenProcess) UpdatePFCItemBottomSilkScreenProcess(req *types.PFC_ItemBottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	var ItemBottomSilkScreenProcessID string

	query := `
		UPDATE PFC_ItemBottomSilkScreenProcess
		SET 
		ItemIndex = ?, 
		Process = ?,
		Chemical = ?,
		Hardener = ?,
		WBSB = ?, 
		Temp = ?, 
		Time = ?, 
		Mesh = ?
		OUTPUT CAST(INSERTED.ItemBottomSilkScreenProcessID AS NVARCHAR(36)) AS ItemBottomSilkScreenProcessID
		WHERE ItemBottomSilkScreenProcessID = ?
	`
	if err := tx.Raw(
		query,
		req.ItemIndex,
		req.Process,
		req.Chemical,
		req.Hardener,
		req.WBSB,
		req.Temp,
		req.Time,
		req.Mesh,
		req.ItemBottomSilkScreenProcessID,
	).Scan(
		&ItemBottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute query: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return ItemBottomSilkScreenProcessID, nil
}

func (s *PFCBottomSilkScreenProcess) DeletePFCItemBottomSilkScreenProcess(req *types.PFC_ItemBottomSilkScreenProcess) (string, error) {
	db, err := database.DatabaseConnection()
	if err != nil {
		return "", fmt.Errorf("failed to connect database: %v", err)
	}

	tx := db.Begin()
	if tx.Error != nil {
		return "", fmt.Errorf("failed to begin transaction: %v", tx.Error)
	}

	query := `
		DELETE FROM PFC_ItemBottomSilkScreenProcess
		WHERE ItemBottomSilkScreenProcessID = ?
	`

	if err := tx.Exec(query,
		req.ItemBottomSilkScreenProcessID,
	).Error; err != nil {
		tx.Rollback()
		return "", fmt.Errorf("failed to execute delete query: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return "", fmt.Errorf("failed to commit transaction: %v", err)
	}

	return "delete success", nil
}

