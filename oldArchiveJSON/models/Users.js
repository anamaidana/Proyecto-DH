// Editar la información de un usuario PENDIENTE
const fs = require('fs');
const path = require('path');

const User = {
  fileName: path.resolve('src/data/users.json'),

  getData() {
    console.log(this.fileName);
    return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
  },

  generateId() {
    const allUsers = this.findAll();
    const lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  findAll() {
    return this.getData();
  },

  // Buscar a un usuario por su ID
  findByPk() {
    const allUsers = this.findAll();
    const userFound = allUsers.find((oneUser) => oneUser.id === id);
    return userFound;
  },

  // Buscar al usuario que se quiere loguear por su email
  findByField(field, text) {
    const allUsers = this.findAll();
    const userFound = allUsers.find((oneUser) => oneUser[field] === text);
    return userFound;
  },

  // Guardar al usuario en la DB
  create(userData) {
    const allUsers = this.findAll();
    const newUser = {
      id: this.generateId(),
      ...userData,
    };
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
    return newUser;
  },

  // Eliminar a un usuario de la DB
  delete(id) {
    const allUsers = this.findAll();
    const finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ''));
    return true;
  },
};

module.exports = User;
