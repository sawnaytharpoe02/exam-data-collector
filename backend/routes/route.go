package route

import (
	"backend/configs"
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes function to define API routes
func SetupRoutes(r *gin.Engine) {
	userController := controllers.UserController{
		Collection: configs.GetCollection(configs.DB, "customers"),
	}
	user := r.Group("/api/customers")
	{
		user.GET("/get_all_customers", middleware.JWTAuthMiddleware(), userController.GetUsers)
		user.POST("/create_customer", userController.CreateUser)
		user.GET("/:id/get_customer", middleware.JWTAuthMiddleware(), userController.GetUser)
		user.DELETE("/delete_customers", middleware.JWTAuthMiddleware(), userController.DeleteUsers)
		user.PUT("/:id/update_customer", userController.UpdateUser)
	}

	examController := controllers.ExamController{
		Collection: configs.GetCollection(configs.DB, "exams"),
	}
	exam := r.Group("/api/exams")
	{
		exam.GET("/get_all_exams", middleware.JWTAuthMiddleware(), examController.GetAllExams)
		exam.POST("/create_exams", middleware.JWTAuthMiddleware(), examController.CreateExams)
	}

	// Admin routes
	adminController := controllers.AdminController{
		Collection: configs.GetCollection(configs.DB, "admins"),
	}
	admin := r.Group("/api/admins")
	{
		admin.GET("/get_all_admins", adminController.GetAllAdmins)
		admin.POST("/create_admin", middleware.JWTAuthMiddleware(), adminController.CreateAdmin)
		admin.GET("/:id/get_admin", middleware.JWTAuthMiddleware(), adminController.GetAdmin)
		admin.POST("/forgot_password", adminController.AdminForgotPassword)
		admin.POST("/update_password", adminController.AdminUpdatePassword)
		admin.POST("/login", adminController.LoginAdmin)
		admin.POST("/refresh_token", adminController.AdminRefreshToken)
	}

	availableExam := controllers.AvailableExamController{
		Collection: configs.GetCollection(configs.DB, "available_exam_data"),
	}
	// Available Exam routes
	availableExamController := controllers.Collector{
		AvaliableExamDataController: &availableExam,
		ExamController:              &examController,
	}
	available_exam := r.Group("/api/available_exams")
	{
		available_exam.GET("/get_all_available_exams", middleware.JWTAuthMiddleware(), availableExam.GetAvailableExams)
		available_exam.POST("/create_available_exam", middleware.JWTAuthMiddleware(), availableExamController.CreateAvaliableExam)
		available_exam.GET("/:id/get_available_exam", middleware.JWTAuthMiddleware(), availableExam.GetAvailableExam)
		available_exam.DELETE("/:id/delete_available_exam", middleware.JWTAuthMiddleware(), availableExam.DeleteAvailableExam)
	}

}
