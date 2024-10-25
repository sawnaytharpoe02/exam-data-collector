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
	Tempoary_Data      string             `json:"tempoary_data,omitempty" bson:"tempoary_data,omitempty"`
	CreateAt           time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt          time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type RequestUser struct {
	Name               string `json:"name" bson:"name" binding:"required"`
	Email              string `json:"email" bson:"email" binding:"required"`
	Prometric_ID       string `json:"prometric_id" bson:"prometric_id" binding:"required"`
	Prometric_Password string `json:"prometric_password" bson:"prometric_password" binding:"required"`
	Status             string `json:"status" bson:"status" binding:"required"`
	Tempoary_Data      string `json:"tempoary_data,omitempty" bson:"tempoary_data,omitempty"`
}
