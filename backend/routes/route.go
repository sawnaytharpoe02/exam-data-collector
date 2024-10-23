package route

import (
	"backend/configs"
	controllers "backend/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes function to define API routes
func SetupRoutes(r *gin.Engine) {
	userController := controllers.UserController{
		Collection: configs.GetCollection(configs.DB, "users"),
	}
	user := r.Group("/users")
	{
		user.GET("/get_all_users", userController.GetUsers)
		user.POST("/create_user", userController.CreateUser)
		user.GET("/:id/get_user", userController.GetUser)
		user.DELETE("/:id/delete_user", userController.DeleteUser)
	}
}
