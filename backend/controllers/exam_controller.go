package controllers

import (
	"backend/models"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ExamController struct {
	Collection *mongo.Collection
}

// GetExams - Get all exams from MongoDB
// @Summary Get all exams
// @Description Get a list of exams
// @Tags Exams
// @Accept json
// @Produce json
// @Success 200 {array} models.Exam
// @Router /api/exams/get_all_exams [get]
func (uc *ExamController) GetAllExams(c *gin.Context) {
	var exams []models.Exam

	cursor, err := uc.Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching users"})
		return
	}

	if err := cursor.All(context.TODO(), &exams); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding users"})
		return
	}

	c.JSON(http.StatusOK, exams)
}

// CreateExams - Create Exams
// @Summary Create exams
// @Description Create exams
// @Tags Exams
// @Accept json
// @Produce json
// @Success 200 {object} []models.Exam
// @Router /api/exams/create_exams [post]
func (uc *ExamController) CreateExams(c *gin.Context) {
	mockExams := []interface{}{
		models.Exam{
			Id:        primitive.NewObjectID(),
			Exam_Type: "Japan Foundation Test for Basic Japanese(JFT-Basic)",
			CreateAt:  time.Now(),
			UpdatedAt: time.Now(),
		},
		models.Exam{
			Id:        primitive.NewObjectID(),
			Exam_Type: "Kaigo / Nursing care skills evaluation test, Nursing care Japanese language evaluation test",
			Section:   []string{"JP", "MM"},
			CreateAt:  time.Now(),
			UpdatedAt: time.Now(),
		},
		models.Exam{
			Id:        primitive.NewObjectID(),
			Exam_Type: "Food service industry Specified Skilled Worker (i) test",
			CreateAt:  time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	_, err := uc.Collection.InsertMany(context.TODO(), mockExams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, mockExams)
}

// GetUser - Get exam from MongoDB
// @Summary Get exam
// @Description Get exam detail
// @Tags Exams
// @Accept json
// @Produce json
// @Param id path string true "Exam ID"
// @Success 200 {object} models.Exam
// @Router /api/exams/{id}/get_exam [get]
func (uc *ExamController) GetExam(c *gin.Context, examId string) {
	examID := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(examID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid exam ID"})
		return
	}

	var exam models.Exam
	err = uc.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&exam)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exam not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching admin"})
		}
		return
	}

	c.JSON(http.StatusOK, exam)
}
