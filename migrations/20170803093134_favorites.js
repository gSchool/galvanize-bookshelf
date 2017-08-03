
exports.up = function(knex, Promise) {
  return knex.schema.createTable("favorites", (table) => {
    table.increments();
    table.integer("user_id").references("users.id").onDelete("CASCADE").notNullable().index();
    table.integer("book_id").references("books.id").onDelete("CASCADE").notNullable().index();
    table.timestamps(true, true);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("favorites");
};


// ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         favorites                                               │
// ├────────────────┬─────────────────────────┬──────────────────────────────────────────────────────┤
// │id              │serial                   │primary key                                           │
// │book_id         │integer                  │not null references books(id) on delete cascade index │
// |user_id         │integer                  │not null references users(id) on delete cascade index │
// │created_at      │timestamp with time zone │not null default now()                                │
// │updated_at      │timestamp with time zone │not null default now()                                │
// └────────────────┴─────────────────────────┴──────────────────────────────────────────────────────┘
