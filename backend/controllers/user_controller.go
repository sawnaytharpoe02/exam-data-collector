package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetUsers - Get all users
// @Summary Get all users
// @Description Get a list of users
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {array} models.User
// @Router /users/get_all_users [get]
func GetUsers(c *gin.Context) {
	users := []models.User{
		{ID: 1, Name: "John Naing"},
		{ID: 2, Name: "Jane Smith"},
	}
	c.JSON(http.StatusOK, users)
}
