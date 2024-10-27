package main

import (
	"backend/configs"
	_ "backend/docs"
	router "backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swagger_files "github.com/swaggo/files"
	gin_swagger "github.com/swaggo/gin-swagger"
)

func main() {
	configs.ConnectDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE"},
	}))

	r.GET("/swagger/*any", gin_swagger.WrapHandler(swagger_files.Handler))

	router.SetupRoutes(r)

	r.Run(":8080")
}
