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

type UserController struct {
	Collection *mongo.Collection
}

// GetUsers - Get all users from MongoDB
// @Summary Get all users
// @Description Get a list of users
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {array} models.User
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/customers/get_all_customers [get]
func (uc *UserController) GetUsers(c *gin.Context) {
	var users []models.User

	cursor, err := uc.Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching users"})
		return
	}

	if err := cursor.All(context.TODO(), &users); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding users"})
		return
	}

	if users == nil {
		users = []models.User{}
	}

	// Return the list of users as JSON
	c.JSON(http.StatusOK, users)
}

// @Summary Create a new user
// @Description Create a new user in the system
// @Tags Users
// @Accept json
// @Produce json
// @Param user body models.CreateUserRequest true "User"
// @Success 200 {object} models.User
// @Router /api/customers/create_customer [post]
func (uc *UserController) CreateUser(c *gin.Context) {
	var create_user models.CreateUserRequest
	if err := c.ShouldBindJSON(&create_user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.RequestUser{
		Name:               create_user.Name,
		Email:              create_user.Email,
		Prometric_ID:       create_user.Prometric_ID,
		Prometric_Password: create_user.Prometric_Password,
		Status:             "open",
		Dob:                create_user.Dob,
		Exam_ID:            create_user.Exam_ID,
		Month:              create_user.Month,
		Day:                create_user.Day,
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
	}

	_, err := uc.Collection.InsertOne(context.TODO(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// GetUsers - Get user from MongoDB
// @Summary Get user
// @Description Get user detail
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} models.User
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/customers/{id}/get_customer [get]
func (uc *UserController) GetUser(c *gin.Context) {
	userID := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Find the user in the collection
	var user models.User
	err = uc.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
		}
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser - Delete user by ID
// @Summary Delete a user
// @Description Delete a user
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {string} string "User deleted successfully"
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/customers/{id}/delete_customer [delete]
func (uc *UserController) DeleteUser(c *gin.Context) {
	userID := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	result, err := uc.Collection.DeleteOne(context.TODO(), bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting user"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// @Description User update
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Param user body models.UpdateUserRequest true "User data"
// @Success 200 {object} models.User
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
// @Router /api/customers/{id}/update_customer [put]
func (uc *UserController) UpdateUser(c *gin.Context) {
	userID := c.Param("id")

	var user_data models.UpdateUserRequest
	if err := c.ShouldBindJSON(&user_data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var user models.User
	err = uc.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
		}
		return
	}

	update_data := models.RequestUser{
		Name:               user.Name,
		Email:              user.Email,
		Prometric_ID:       user.Prometric_ID,
		Prometric_Password: user.Prometric_Password,
		Status:             user_data.Status,
		Dob:                user.Dob,
		Exam_ID:            user.Exam_ID,
		Month:              user.Month,
		Day:                user.Day,
		UpdatedAt:          time.Now(),
	}

	c.JSON(http.StatusOK, update_data)
}
