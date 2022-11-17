const WSresponse = require("../classes/WSresponseClass");
const MessageFirebaseDAO = require("../daos/Firebase/menssageFirebaseDao");
const MessageMongoDAO = require("../daos/Mongo/messageMongoDao");
const config = require("../config");

let Message

if (config.db === "FIREBASE") {
  Message = MessageFirebaseDAO.getInstance()}
  
  if (config.db  === "MONGO") {
    Message = MessageMongoDAO.getInstance()
  }
  
  const getAll = async (req, res) => {
  
  try {
    const response = await Message.getAll();

    res.json(new WSresponse(response, "Showing messages"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new WSresponse(null, "Internal server error", true, 500));
  }
};

const create = async (req, res) => {
  console.log("req.body: ", req.body)
  try {    
    const response = await Message.create(req.body);
    res.json(new WSresponse(response, "Message created"));
  } catch (err) {
    console.log(err);
    res.status(400).json(new WSresponse(null, err, true, 400));
  }
};

const getMessageById = async (req, res) => {
  try {
    const response = await Message.getMessageById(req.params.id);
    res.json(new WSresponse(response, `Messages finded by id ${req.params.id}`));
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 460));
  }
};

module.exports = {
  getAll,
  create,
  getMessageById
};