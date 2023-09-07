const { List } = require("../app/models");

async function test() {
  const lists = await List.findAll({
    include: {
      association: "cards", 
      include: "labels"
    }
  });

  console.log(JSON.stringify(lists, null, 2));
}

test();
