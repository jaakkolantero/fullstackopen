const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const entrySchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});

const Entry = mongoose.model("Entry", entrySchema);

const entry = new Entry({
  name: name,
  phoneNumber: phoneNumber
});

const url = `mongodb://super:${password}@cluster0-shard-00-00-ieh9u.mongodb.net:27017,cluster0-shard-00-01-ieh9u.mongodb.net:27017,cluster0-shard-00-02-ieh9u.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });
if (name && phoneNumber) {
  entry.save().then(response => {
    console.log(
      `added ${response.name} number ${response.phoneNumber} to phonebook`
    );
    mongoose.connection.close();
    process.exit();
  });
} else {
  Entry.find({}).then(response => {
    console.log("phonebook:");
    response.forEach(person =>
      console.log(`${person.name} ${person.phoneNumber}`)
    );
    mongoose.connection.close();
    process.exit();
  });
}
