const { List } = require("../models");
const sanitizeHtml = require("sanitize-html");

async function getLists(req, res) {
  const lists = await List.findAll({
    order: [["position", "ASC"], ["cards", "position", "ASC"]],
    include: {
      association: "cards",
      include: "labels"
    }
  });
  res.status(200).json(lists);
}

async function getOneList(req, res) {
  // Récupérer et parser les inputs
  const listId = parseInt(req.params.id);

  // Valider les inputs

  if (isNaN(listId)) { 
    res.status(404).json({ error: "List not found. Please verify the provided id." })
    return;
  }

  // Traitement : récupérer la donnée
  const list = await List.findByPk(listId);

  // Si la liste n'existe pas (la liste est null), on renvoie une 404
  if (! list) {
    res.status(404).json({ error: "List not found. Please verify the provided id." });
    return;
  }

  // Sinon, on renvoie la liste elle même
  res.status(200).json(list);
}

async function createList(req, res) {
  // Get and parse inputs
  const { name, position } = req.body; // Du body, on ne récupère que des strings

  // On vérifie le name
  if (! name || typeof name !== "string") {
    return res.status(400).json({ error: "Missing body parameter: name" });
  }

  // La position peut être optionnel
  if (position && (isNaN(parseInt(position)) || parseInt(position) < 0)) {
    return res.status(400).json({ error: "Invalid type: position should be a positive number" });
  }

  // Traitement
  const list = await List.create({
    name: sanitizeHtml(name),
    position: (position ? parseInt(position) : 0)
  });

  // Réponse
  res.status(201).json(list);
}

async function deleteList(req, res) {
  // Parsing des inputs
  // On récupère l'ID de la liste à supprimer
  const listId = parseInt(req.params.id);

  if (isNaN(listId)) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." });
  }

  // Traitement
  // On récupère la liste en BDD (pour savoir s'il y a qqch à supprimer)
  const list = await List.findByPk(listId);

  if (!list) { // Si y'a pas de liste (findByPk return null), rien à supprimer
    return res.status(404).json({ error: "List not found. Please verify the provided id." });
  }

  await list.destroy(); // On supprime la liste de la BDD

  
  res.status(204).end(); 

}

async function updateList(req, res) {
  // Parsing input
  const { name: newName, position: newPosition } = req.body;
  // const newName = req.body.name;
  // const newPosition = req.body.position
  const listId = parseInt(req.params.id);

  // Si mauvais format pour la listId
  if (isNaN(listId)) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." })
  }

  // S'il n'y a ni un name ni une position
  if (newName === undefined && newPosition === undefined) {
    return res.status(400).json({ "error": "Invalid body. Should provide at least a 'name' or 'position' property" });
  }

  // Si mauvais format pour le name
  if (newName && typeof newName !== "string") {
    return res.status(400).json({ "error": "Invalid body parameter 'name'. Should provide a string." });
  }

  // Si mauvais format pour la position
  if (newPosition && (isNaN(parseInt(newPosition)) || parseInt(newPosition) < 0)) {
    return res.status(400).json({ "error": "Invalid body parameter 'position'. Should provide a positive number." });
  }

  // Traitement

  const list = await List.findByPk(listId);

  if (!list) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." })
  }

  if (newName) {
    list.name = newName;
  }

  if (newPosition) {
    list.position = parseInt(newPosition);
  }

  await list.save();

  // Réponse
  res.status(200).json(list);
}

const listController = {
  getLists,
  getOneList,
  createList,
  deleteList,
  updateList
};

module.exports = listController;
