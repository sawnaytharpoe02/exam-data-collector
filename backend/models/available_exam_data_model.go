package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ExamTypeDetails struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Exam_Type string             `json:"exam_type" bson:"exam_type" binding:"required"`
	Section   []string           `json:"section,omitempty" bson:"section,omitempty"`
}

type AvailableExams struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Exam_Type ExamTypeDetails    `json:"exam_type" bson:"exam_type" binding:"required"`
	Months    []string           `json:"months" bson:"months" binding:"required"`
	Dates     []string           `json:"dates,omitempty" bson:"dates" binding:"required"`
	CreatedAt time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateAvailableExamRequest struct {
	Exam_Type string   `json:"exam_type" bson:"exam_type" binding:"required"`
	Months    []string `json:"months" bson:"months" binding:"required"`
	Dates     []string `json:"dates,omitempty" bson:"dates" binding:"required"`
}

type RequestAvailableExam struct {
	Exam_Type ExamTypeDetails `json:"exam_type" bson:"exam_type" binding:"required"`
	Months    []string        `json:"months" bson:"months" binding:"required"`
	Dates     []string        `json:"dates,omitempty" bson:"dates" binding:"required"`
	CreatedAt time.Time       `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time       `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
