import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECT!)
.catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

const TextDocumentSchema = new mongoose.Schema({
  _id: String,
  text: Object
});

if (!mongoose.modelNames().includes('TextDocument')) {
    const TextDocument = mongoose.model('TextDocument', TextDocumentSchema);
  }

const TextDocument = mongoose.models.TextDocument || mongoose.model('TextDocument', TextDocumentSchema);

export { TextDocument };