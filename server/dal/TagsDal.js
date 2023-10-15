const db = require("../models/index");
const tag = db.tag;

class TagsDal {
  getAll = async () => {
    return await tag.findAll();
  };

  getOne = async (id) => {
    return await tag.findByPk(id);
  };

  create = async (name) => {
    return await tag.create({ name });
  };

  update = async (id, name) => {
    return await tag.update({ name }, { where: { id: id } });
  };

  deleteOne = async (id) => {
    await tag.destroy({ where: { id: id } });
  };
}

module.exports = new TagsDal();
