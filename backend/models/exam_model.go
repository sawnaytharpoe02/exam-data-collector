package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Exam struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Exam_Type string             `json:"exam_type" bson:"exam_type" binding:"required"`
	Section   []string           `json:"section,omitempty" bson:"section,omitempty"`
	CreateAt  time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
