// Update with your config settings.

module.exports = {

    test:{
      client:"pg",
      connection:'postgres://localhost/bookshelf_test',
    },
    development:{
      client:"pg",
      connection:'postgres://localhost/bookshelf_dev',
    }


};
