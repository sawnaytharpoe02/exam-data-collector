package route

import (
	controllers "backend/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes function to define API routes
func SetupRoutes(r *gin.Engine) {
	user := r.Group("/users")
	{
		user.GET("/get_all_users", controllers.GetUsers)
	}

	product := r.Group("/products")
	{
		product.GET("/get_all_products", controllers.GetProducts)
	}
}
