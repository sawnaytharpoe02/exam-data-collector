package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name               string             `json:"name" bson:"name" binding:"required"`
	Email              string             `json:"email" bson:"email" binding:"required"`
	Prometric_ID       string             `json:"prometric_id" bson:"prometric_id" binding:"required"`
	Prometric_Password string             `json:"prometric_password" bson:"prometric_password" binding:"required"`
	Status             string             `json:"status" bson:"status" binding:"required"`
	Dob                string             `json:"dob" bson:"dob" binding:"required"`
	Exam_ID            string             `json:"exam_id" bson:"exam_id" binding:"required"`
	Month              string             `json:"month" bson:"month" binding:"required"`
	Day                string             `json:"day" bson:"day" binding:"required"`
	CreateAt           time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt          time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateUserRequest struct {
	Name               string `json:"name" bson:"name" binding:"required"`
	Email              string `json:"email" bson:"email" binding:"required"`
	Prometric_ID       string `json:"prometric_id" bson:"prometric_id" binding:"required"`
	Prometric_Password string `json:"prometric_password" bson:"prometric_password" binding:"required"`
	Dob                string `json:"dob" bson:"dob" binding:"required"`
	Exam_ID            string `json:"exam_id" bson:"exam_id" binding:"required"`
	Month              string `json:"month" bson:"month" binding:"required"`
	Day                string `json:"day" bson:"day" binding:"required"`
}

type RequestUser struct {
	Name               string    `json:"name" bson:"name" binding:"required"`
	Email              string    `json:"email" bson:"email" binding:"required"`
	Prometric_ID       string    `json:"prometric_id" bson:"prometric_id" binding:"required"`
	Prometric_Password string    `json:"prometric_password" bson:"prometric_password" binding:"required"`
	Status             string    `json:"status" bson:"status" binding:"required"`
	Dob                string    `json:"dob" bson:"dob" binding:"required"`
	Exam_ID            string    `json:"exam_id" bson:"exam_id" binding:"required"`
	Month              string    `json:"month" bson:"month" binding:"required"`
	Day                string    `json:"day" bson:"day" binding:"required"`
	CreatedAt          time.Time `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt          time.Time `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
