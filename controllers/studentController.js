const StudentModel = new (require('../models/StudentModel.js'));
const CourseModel  = new (require('../models/courseModel'));
// const {screenShareValidator} = require('../validators/StudentValidators');

exports.studentPage = async (req, res) => {
    res.render('studentPage', {title: "Courses"});
};

exports.addCourse = async (req, res) => {
    const {courseCode} = req.body;
    const courseUUID = await StudentModel.addCourse(req.session.uuid, courseCode);
    const info = await CourseModel.getCourseInfo(courseUUID);
    res.json(info);
};

exports.getCourses = async (req, res) => {
    let courseUUIDs = await StudentModel.getCourses(req.session.uuid);
    courseUUIDs = courseUUIDs.map(row => row.courseUUID);
    let courses = [];
    for (const courseUUID of courseUUIDs) {
        courses.push(await CourseModel.getCourseInfo(courseUUID));
    }
    res.json({courses});
};