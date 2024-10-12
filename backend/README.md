# Gin Swagger Example

This is an example Gin API with Swagger documentation.

## Running the Application

1. Install dependencies:
    ```
    go mod tidy
    ```

2. Generate Swagger documentation:
    ```
    swag init
    ```

3. Run the application:
    ```
    go run cmd/main.go
    ```

4. Access the Swagger documentation at `http://localhost:8080/swagger/index.html`
