const express = require('express');
const http = require('http');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
let courses = [
    {
        id: 1,
        courseName: "Web Development",
        courseCode: "CSE101",
        department: "Computer Science"
    },
    {
        id: 2,
        courseName: "Data Structures",
        courseCode: "CSE102",
        department: "Computer Science"
    },
    {
        id: 3,
        courseName: "Artificial Intelligence",
        courseCode: "CSE103",
        department: "Data Science"
    }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});
app.get('/courses/:id', (req, res) => {
    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );
    if (!course) 
    {
        return res.status(404).send("Course not found");
    }
    res.json(course);
});
app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length
            ? Math.max(...courses.map(c => c.id)) + 1 : 1,
        courseName: req.body.courseName,
        courseCode: req.body.courseCode,
        department: req.body.department
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});
app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) 
    {
        return res.status(404).send("Course not found");
    }
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.department = req.body.department;
    res.json(course);
});
app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    courses = courses.filter(c => c.id !== id);
    res.send("Course deleted successfully");
});
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});