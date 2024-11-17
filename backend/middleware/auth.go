package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// Function to verify JWT tokens
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Retrieve the token from the Authorization header
		auth_header := c.Request.Header["Token"]

		if len(auth_header) == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix if present
		token_string := strings.TrimPrefix(c.Request.Header["Token"][0], "Bearer ")
		if token_string == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is missing in Authorization header"})
			c.Abort()
			return
		}

		// Verify the token
		token, err := VerifyToken(token_string)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("Token verification failed: %v", err)})
			c.Abort()
			return
		}

		// Print information about the verified token (for debugging)
		fmt.Printf("Token verified successfully. Claims: %+v\n", token.Claims)

		// Continue with the next middleware or route handler
		c.Next()
	}
}

func VerifyToken(token_string string) (*jwt.Token, error) {
	// Load the environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	secretKey := os.Getenv("SECRET_KEY")
	if secretKey == "" {
		log.Fatal("SECRET_KEY is not set in .env file")
	}

	// Parse the token with the secret key
	token, err := jwt.Parse(token_string, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}

func CreateToken(user_name string) (string, error) {
	fmt.Println(user_name + "this is username")
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	secret_key := os.Getenv("SECRET_KEY")
	if secret_key == "" {
		log.Fatal("SECRET_KEY is not set in .env file")
	}
	fmt.Println(secret_key + "this is secret key")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": user_name,
			"exp":      time.Now().Add(time.Hour * 24 * 365 * 3).Unix(),
		})

	fmt.Println(token)

	token_string, err := token.SignedString([]byte(secret_key))
	if err != nil {
		return "", err
	}

	return token_string, nil
}
