package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name" binding:"required"`
	Email       string             `json:"email" bson:"email" binding:"required"`
	Password    string             `json:"password" bson:"password" binding:"required"`
	Jp_Id       string             `json:"jp_id" bson:"jp_id" binding:"required"`
	Jp_Password string             `json:"jp_password" bson:"jp_password" binding:"required"`
	// Tempory_Date time.Time          `json:"tempory_date,omitempty" bson:"tempory_date,omitempty"`
	CreateAt  time.Time `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type RequestUser struct {
	Name        string `json:"name" bson:"name" binding:"required"`
	Email       string `json:"email" bson:"email" binding:"required"`
	Password    string `json:"password" bson:"password" binding:"required"`
	Jp_Id       string `json:"jp_id" bson:"jp_id" binding:"required"`
	Jp_Password string `json:"jp_password" bson:"jp_password" binding:"required"`
}
