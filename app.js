const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json());

// Define Mongoose Schema for courses
const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/FERRER')
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.error('Connection Failed!',err);
    })

// Route handler for GET request to '/courses'
app.get('/courses', async (req, res) => {
    try {
        // Query all courses from the database
        const courses = await Course.find();
        res.json(courses); // Send courses as JSON response
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on http://localhost: ${port}...`)
});