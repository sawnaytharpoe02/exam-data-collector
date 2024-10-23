package route

import (
	"backend/configs"
	controllers "backend/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes function to define API routes
func SetupRoutes(r *gin.Engine) {
	userController := controllers.UserController{
		Collection: configs.GetCollection(configs.DB, "customers"),
	}
	user := r.Group("/api/customers")
	{
		user.GET("/get_all_customers", userController.GetUsers)
		user.POST("/create_customer", userController.CreateUser)
		user.GET("/:id/get_customer", userController.GetUser)
		user.DELETE("/:id/delete_customer", userController.DeleteUser)
	}
}
