
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
        // Inserts seed entries
        knex('users').insert
        [{
              id: 1,
              first_name: 'Joanne',
              last_name: 'Rowling',
              email: 'jkrowling@gmail.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
              created_at: new Date('2016-06-29 14:26:16 UTC'),
              updated_at: new Date('2016-06-29 14:26:16 UTC')
        }]
        //knex('users').insert({id: 2, colName: 'rowValue2'}),
        //knex('users').insert({id: 3, colName: 'rowValue3'})
    });
};
