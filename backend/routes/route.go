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
		user.PUT("/:id/update_customer", userController.UpdateUser)
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
		admin.POST("/forgot_password", adminController.AdminForgotPassword)
		admin.POST("/update_password", adminController.AdminUpdatePassword)
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
		available_exam.GET("/get_all_available_exams", availableExam.GetAvailableExams)
		available_exam.POST("/create_available_exam", availableExamController.CreateAvaliableExam)
		available_exam.GET("/:id/get_available_exam", availableExam.GetAvailableExam)
		available_exam.DELETE("/:id/delete_available_exam", availableExam.DeleteAvailableExam)
	}

}
