package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetProducts - Get all products
// @Summary Get all products
// @Description Get a list of products
// @Tags Products
// @Accept json
// @Produce json
// @Success 200 {array} models.User
// @Router /products/get_all_products [get]
func GetProducts(c *gin.Context) {
	users := []models.User{
		{ID: 1, Name: "John Naing"},
		{ID: 2, Name: "Jane Smith"},
	}
	c.JSON(http.StatusOK, users)
}
