const Card = require("./Card");
const Label = require("./Label");
const List = require("./List");



List.hasMany(Card, {
  as: "cards", 
  foreignKey: "list_id"
});
Card.belongsTo(List, {
  as: "list", 
  foreignKey: "list_id"
});



Card.belongsToMany(Label, {
  as: "labels",
  through: "card_has_label",
  foreignKey: "card_id" 

});
Label.belongsToMany(Card, {
  as: "cards",
  through: "card_has_label",
  foreignKey: "label_id" 
});



module.exports = { Label, Card, List };
