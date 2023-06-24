const express=require('express')
const courseRoutes=express.Router()

//importing auth middleware
const {authenticate,isStudent,isInstructor,isAdmin}=require('../middlewares/auth')
//import courses handlers
const{createCourse,showAllCourses,getCourseDetails}=require('../controllers/Course')

//import section handlers
const{createSection,updateSection,deleteSection}=require('../controllers/Section')

// importing subsection handlers
const{createSubSection,updateSubSection,deleteSubSection}=require('../controllers/SubSection')

//importing categories handlers
const {createCategory,getAllCategories,categoryPageDetails}=require('../controllers/Category')

//importing ratings and reviews handlers
const {createRating,getAverageRating,getAllRatingsForOneCourse,getAllRatings}=require('../controllers/RatingAndReview')


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//creating course, only instructor can do so
courseRoutes.post("/createCourse",authenticate,isInstructor,createCourse)

//add a section to course
courseRoutes.post("/addSection",authenticate,isInstructor,createSection)

//update a section
courseRoutes.post("/updateSection",authenticate,isInstructor,updateSection)

//delete a section
courseRoutes.post("/updateSection",authenticate,isInstructor,deleteSection)

//edit subsection
courseRoutes.post("/updateSubSection",authenticate,isInstructor,updateSubSection)

//delete sub section
courseRoutes.post("/deleteSubSection",authenticate,isInstructor,deleteSubSection)

//add a subsection a section (create a subs section)
courseRoutes.post("/addSubSection",authenticate,isInstructor,createSubSection)

// Get all Registered Courses
courseRoutes.post("/getAllCourses",showAllCourses)

// Get Details for a Specific Courses
courseRoutes.post("/getCourseDetails",getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

courseRoutes.post("/createCategory",authenticate,isAdmin,createCategory)
courseRoutes.post("/showAllCategories",getAllCategories)
courseRoutes.post("/getCategoryPageDetails",categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

courseRoutes.post("/createRating",authenticate,isStudent,createRating)
courseRoutes.post("/getAverageRating",getAverageRating)
courseRoutes.post("/getReviews",getAllRatings)
courseRoutes.post("/getReviewratingforspecificcourse",getAllRatingsForOneCourse)