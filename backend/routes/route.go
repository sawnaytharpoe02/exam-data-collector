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

	examController := controllers.ExamController{
		Collection: configs.GetCollection(configs.DB, "exams"),
	}
	exam := r.Group("/api/exams")
	{
		exam.GET("/get_all_exams", examController.GetAllExams)
		exam.POST("/create_exams", examController.CreateExams)
	}

	// Admin routes
	adminController := controllers.AdminController{
		Collection: configs.GetCollection(configs.DB, "admins"),
	}
	admin := r.Group("/api/admins")
	{
		admin.GET("/get_all_admins", adminController.GetAllAdmins)
		admin.POST("/create_admin", adminController.CreateAdmin)
		admin.GET("/:id/get_admin", adminController.GetAdmin)
		admin.GET("/forgot_password", adminController.AdminForgotPassword)
	}
}
