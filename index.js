const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  //Iteration 2
  .then(() => {
    Recipe.create({
      "title": "Cachopo a la asturiana",
      "level": "UltraPro Chef",
      "ingredients": [
        "1/2 cup extra virgin oil",
        "150gr flour",
        "2 eggs",
        "150gr bread crumbs",
        "200gr goat cheese",
        "200gr iberian ham",
        "salt to taste",
        "2 great asturian veal meat"
      ],
      "cuisine": "Spanish",
      "dishType": "main_course",
      "image": "https://www.recetasderechupete.com/wp-content/uploads/2021/07/Cachopo-gallego.jpg",
      "duration": 20,
      "creator": "Chef LeRaul"
    })
      .then(rec => console.log("The title of the recipe is: ", rec.title))
      .catch(error => console.log('An error happended while saving a new recipe: ', error));
  })
  //Iteration 3
  .then(() => {
    Recipe.insertMany(data)
      .then(recs => recs.forEach(rec => console.log('The titles for the recipes is', rec.title)))
      .catch(error => console.log('An error happended while saving a new recipe: ', error));
  })
  //Iteration 4
  .then(() => {
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
      .then(console.log('The duration was updated!'))
      .catch(error => console.log('An error happended while updating the recipe: ', error));
  })
  //Iteration 5
  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(console.log('The carrot cake was deleted!'))
      .catch(error => console.log('An error happended while deleting the recipe: ', error));
  })
  .finally(() => {
    setTimeout(() => {
      mongoose.connection.close();
    }, 1200);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
