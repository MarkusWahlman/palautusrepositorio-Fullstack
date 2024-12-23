import mongoose, { Schema, Document, Model } from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password: string = process.argv[2];
const url: string = `mongodb+srv://fullstack:${password}@cluster0.xxgz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

type IPerson = {
  name: string;
  number: string;
};

const personSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const Person: Model<IPerson> = mongoose.model<IPerson>("Person", personSchema);

const newName: string = process.argv[3];
const newNumber: string = process.argv[4];

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  });
  person
    .save()
    .then(() => {
      console.log("person saved!");
    })
    .catch((error) => {
      console.error("Error saving person:", error.message);
    })
    .finally(() => {
      mongoose.connection.close();
    });
} else {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
