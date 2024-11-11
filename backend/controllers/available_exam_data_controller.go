package controllers

import (
	"backend/models"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AvailableExamController struct {
	Collection *mongo.Collection
}

type Collector struct {
	AvaliableExamDataController *AvailableExamController
	ExamController              *ExamController
}

// @Summary Get all available exams
// @Description Get a list of available exam
// @Tags Available_Exams
// @Accept json
// @Produce json
// @Success 200 {array} models.AvailableExams
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/available_exams/get_all_available_exams [get]
func (uc *AvailableExamController) GetAvailableExams(c *gin.Context) {
	var available_exams []models.AvailableExams

	cursor, err := uc.Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching available exams"})
		return
	}

	if err := cursor.All(context.TODO(), &available_exams); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding available exams"})
		return
	}

	fmt.Println(available_exams, "this is exams......")

	if available_exams == nil {
		available_exams = []models.AvailableExams{}
	}

	c.JSON(http.StatusOK, available_exams)
}

// @Summary Create a new available exam
// @Description Create a new available exam in the system
// @Tags Available_Exams
// @Accept json
// @Produce json
// @Param available_exam body models.CreateAvailableExamRequest true "Available_Exams"
// @Success 200 {object} models.AvailableExams
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/available_exams/create_available_exam [post]
func (uc *Collector) CreateAvaliableExam(c *gin.Context) {
	var create_available_exam models.CreateAvailableExamRequest
	if err := c.ShouldBindJSON(&create_available_exam); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	objID, err := primitive.ObjectIDFromHex(create_available_exam.Exam_Type)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid exam ID"})
		return
	}

	var examData models.Exam
	err = uc.ExamController.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&examData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exam not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching admin"})
		}
		return
	}

	available_exam := models.RequestAvailableExam{
		Exam_Type: models.ExamTypeDetails{
			Id:        examData.Id,
			Exam_Type: examData.Exam_Type,
			Section:   examData.Section,
		},
		Months:    create_available_exam.Months,
		Dates:     create_available_exam.Dates,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err = uc.AvaliableExamDataController.Collection.InsertOne(context.TODO(), available_exam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, available_exam)
}

// @Summary Get available exam
// @Description Get available exam detail
// @Tags Available_Exams
// @Accept json
// @Produce json
// @Param id path string true "Available Exam ID"
// @Success 200 {object} models.AvailableExams
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/available_exams/{id}/get_available_exam [get]
func (uc *AvailableExamController) GetAvailableExam(c *gin.Context) {
	available_exam_id := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(available_exam_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid available exam id"})
		return
	}

	var available_exam_data models.AvailableExams
	err = uc.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&available_exam_data)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Available exam not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching  available exam"})
		}
		return
	}

	c.JSON(http.StatusOK, available_exam_data)
}

// @Summary Delete a available exam
// @Description Delete a available exam
// @Tags Available_Exams
// @Accept json
// @Produce json
// @Param id path string true "Available Exam ID"
// @Success 200 {string} string "Available exam data deleted successfully"
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/available_exams/{id}/delete_available_exam [delete]
func (uc *AvailableExamController) DeleteAvailableExam(c *gin.Context) {
	available_exam_id := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(available_exam_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid available exam ID"})
		return
	}

	result, err := uc.Collection.DeleteOne(context.TODO(), bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting available exam"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Available exam not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Available exam deleted successfully"})
}
