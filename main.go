package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong"})
	})

	{
		v1 := router.Group("/v1")
		v1.POST("/login", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "you are attempting to login!"})
		})
		v1.POST("/submit", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "you are attempting to submit!"})
		})
	}

	router.Run(":3001")
}
