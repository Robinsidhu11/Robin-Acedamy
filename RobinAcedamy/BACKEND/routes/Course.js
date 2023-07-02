const express=require('express')
const Routes=express.Router()

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
Routes.post("/createCourse",authenticate,isInstructor,createCourse)

//add a section to course
Routes.post("/addSection",authenticate,isInstructor,createSection)

//update a section
Routes.put("/updateSection",authenticate,isInstructor,updateSection)

//delete a section
Routes.put("/deleteSection/:sectionId",authenticate,isInstructor,deleteSection)

//edit subsection
Routes.put("/updateSubSection",authenticate,isInstructor,updateSubSection)

//delete sub section
Routes.delete("/deleteSubSection",authenticate,isInstructor,deleteSubSection)

//add a subsection a section (create a subs section)
Routes.post("/addSubSection",authenticate,isInstructor,createSubSection)

// Get all Registered Courses
Routes.get("/getAllCourses",showAllCourses)

// Get Details for a Specific Courses
Routes.get("/getCourseDetails",getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

Routes.post("/createCategory",authenticate,isAdmin,createCategory)
Routes.get("/showAllCategories",getAllCategories)
Routes.post("/getCategoryPageDetails",categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

Routes.post("/createRating",authenticate,isStudent,createRating)
Routes.post("/getAverageRating",getAverageRating)
Routes.post("/getReviews",getAllRatings)
Routes.post("/getReviewratingforspecificcourse",getAllRatingsForOneCourse)

module.exports=Routes