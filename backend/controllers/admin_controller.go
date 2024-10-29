package controllers

import (
	"backend/models"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AdminController struct {
	Collection *mongo.Collection
}

// GetAdmins - Get all admins from MongoDB
// @Summary Get all admins
// @Description Get a list of admins
// @Tags Admins
// @Accept json
// @Produce json
// @Success 200 {array} models.Admin
// @Router /api/admins/get_all_admins [get]
func (uc *AdminController) GetAllAdmins(c *gin.Context) {
	var admins []models.Admin

	cursor, err := uc.Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching admins"})
		return
	}

	if err := cursor.All(context.TODO(), &admins); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding admins"})
		return
	}

	c.JSON(http.StatusOK, admins)
}

// @Summary Create a new admin
// @Description Create a new admin in the system
// @Tags Admins
// @Accept json
// @Produce json
// @Param admin body models.CreateAdminRequest true "Admin"
// @Success 200 {object} models.Admin
// @Router /api/admins/create_admin [post]
func (uc *AdminController) CreateAdmin(c *gin.Context) {
	var create_admin models.CreateAdminRequest
	if err := c.ShouldBindJSON(&create_admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	admin := models.RequestAdmin{
		User_Name: create_admin.User_Name,
		Email:     create_admin.Email,
		Password:  create_admin.Password,
	}

	_, err := uc.Collection.InsertOne(context.TODO(), admin)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, admin)
}

// GetUser - Get admin from MongoDB
// @Summary Get admin
// @Description Get admin detail
// @Tags Admins
// @Accept json
// @Produce json
// @Param id path string true "Admin ID"
// @Success 200 {object} models.Admin
// @Router /api/admins/{id}/get_admin [get]
func (uc *AdminController) GetAdmin(c *gin.Context) {
	adminID := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(adminID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var admin models.Admin
	err = uc.Collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&admin)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Admin not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching admin"})
		}
		return
	}

	c.JSON(http.StatusOK, admin)
}

// @Summary AdminForgotPassword - Admin forgot password
// @Description Send mail to forgot password mail
// @Tags Admins
// @Accept json
// @Produce json
// @Param admin body models.ForgotPasswordRequest true "Admin"
// @Success 200 {string} string "Email sent successfully"
// @Router /api/admins/forgot_password [post]
func (uc *AdminController) AdminForgotPassword(c *gin.Context) {
	// var admin_email models.ForgotPasswordRequest

	fmt.Println(c.Request.Body, "this is body")
}
