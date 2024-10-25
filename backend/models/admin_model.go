package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Admin struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User_Name string             `json:"user_name" bson:"user_name" binding:"required"`
	Email     string             `json:"email" bson:"email" binding:"required"`
	Password  string             `json:"password" bson:"password" binding:"required"`
	CreateAt  time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type RequestAdmin struct {
	User_Name string `json:"user_name" bson:"user_name" binding:"required"`
	Email     string `json:"email" bson:"email" binding:"required"`
	Password  string `json:"password" bson:"password" binding:"required"`
}

type ForgotPasswordRequest struct {
	Email string `json:"email" bson:"email" binding:"required"`
}
