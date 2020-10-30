const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Couldnt connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
        name: String,
        author: String, 
        tags: [ String ],
        date: Date, 
        isPublished: Boolean,
        price: Number
      });
      
const Course = mongoose.model('Course', courseSchema);
      
async function getCourses() {
    return await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name:1})
    .select({name:1 , author: 1})
    .lean();
}

// get all published frontend and backend courses,
// sort them by rheir price in a descending order,
// pick only their name and author,
async function getCourses2(){
    return await Course
    .find({isPublished:true, tags: {$in: ['frontend', 'backend']}})
    .sort('price')
    .select('name author price')
    .lean();
}

// get all the published courses that are $15 or more
// or have the word 'by' in their title
async function getCourses3(){
    return await Course
    .find({isPublished:true})
    .or([{price: {$gte : 15}}, 
    {name: /.*by.*/}])
    .lean();
}

// update a document
async function updateCourse(id){
    console.log("Yoo");
    // Querry first, find by id, modify its properties, save()
    const course = await Course.findById(id);
    if(!course) return;
    
    course.isPublished = true;
    course.author = "Another Author";

    const result = await course.save();
    console.log(result);
    // course.set(){
    //     isPublished : true,
    //     author : "Another Author"
    // });

    // Update first directly, get updated document
}

updateCourse('5a6900fff467be65019a9001');

async function run(){
    const courses  = await getCourses3();
    console.log(courses);
    
}

// run();
