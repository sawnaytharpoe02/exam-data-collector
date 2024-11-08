package controllers

import (
	"backend/models"
	"context"
	"fmt"
	"net/http"
	"net/smtp"
	"time"

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
		Password:  create_admin.Password,
		CreateAt:  time.Now(),
		UpdatedAt: time.Now(),
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
	var admin models.ForgotPasswordRequest

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(admin.Email, "this is email.....")

	from := "sawnaytharhpoe02@gmail.com"
	password := "ncac hdyk wvay poix"

	// Receiver email address.
	to := []string{
		admin.Email,
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	subject := "Forgot Password Request"
	plainTextMessage := "You requested a password reset. Please click the link below to reset your password:\n"
	plainTextMessage += " http://localhost:5173/auth/change-password?email=" + admin.Email + "\n"
	plainTextMessage += "If you did not request this, please ignore this email."

	message := []byte("Subject: " + subject + "\r\n" +
		"Content-Type: text/plain; charset=UTF-8\r\n" +
		"\r\n" +
		plainTextMessage)

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
}

// @Description Admin Password Update
// @Tags Admins
// @Accept json
// @Produce json
// @Param admin body models.ForgotPasswordUpdateRequest true "Admin"
// @Success 200 {string} string "Password updated successfully"
// @Router /api/admins/update_password [post]
func (uc *AdminController) AdminUpdatePassword(c *gin.Context) {
	var admin models.ForgotPasswordUpdateRequest

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	if admin.Password != admin.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords do not match"})
		return
	}

	var admin_data models.Admin
	err := uc.Collection.FindOne(context.TODO(), bson.M{"email": admin.Email}).Decode(&admin_data)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Admin not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching admin"})
		}
		return
	}
	update_admin := models.RequestAdmin{
		User_Name: admin_data.User_Name,
		Email:     admin_data.Email,
		Password:  admin.Password,
		CreateAt:  admin_data.CreateAt,
		UpdatedAt: time.Now(),
	}

	_, err = uc.Collection.UpdateByID(context.TODO(), admin_data.Id, bson.M{"$set": update_admin})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})

}
