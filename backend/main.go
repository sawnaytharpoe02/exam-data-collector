package main

import (
	_ "backend/docs"
	router "backend/routes"
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	swagger_files "github.com/swaggo/files"
	gin_swagger "github.com/swaggo/gin-swagger"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	mongo_option "go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"os"

	"github.com/joho/godotenv"
)

var client *mongo.Client
var db *mongo.Database

func collectionExists(db *mongo.Database, collectionName string) bool {
	collections, err := db.ListCollectionNames(context.Background(), mongo_option.ListCollectionsOptions{})
	if err != nil {
		log.Fatal("Error listing collections:", err)
	}

	for _, name := range collections {
		if name == collectionName {
			return true
		}
	}
	return false
}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL is not set in .env file")
	}

	// Connect to MongoDB
	clientOptions := options.Client().ApplyURI(databaseURL)
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Check the connection
	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")

	db = client.Database("ExamDataCollector")

	// Check if the collection already exists
	collectionName := "users"
	if collectionExists(db, collectionName) {
		fmt.Printf("Collection '%s' already exists.\n", collectionName)
	} else {
		err = db.CreateCollection(context.Background(), collectionName)
		if err != nil {
			log.Fatal("Error creating collection:", err)
		}
		fmt.Printf("Collection '%s' created successfully.\n", collectionName)

		collection := db.Collection(collectionName)
		user := bson.D{
			{Key: "name", Value: "John Doe"},
			{Key: "email", Value: "johndoe@example.com"},
			{Key: "created_at", Value: "2024-10-12"},
		}

		_, err = collection.InsertOne(context.Background(), user)
		if err != nil {
			log.Fatal("Error inserting document:", err)
		}
		fmt.Println("Document inserted into the 'users' collection.")
	}
}

func main() {
	r := gin.Default()

	r.GET("/swagger/*any", gin_swagger.WrapHandler(swagger_files.Handler))

	router.SetupRoutes(r)

	r.Run(":8080")
}
