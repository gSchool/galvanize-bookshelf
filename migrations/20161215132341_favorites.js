exports.up = knex => knex.schema.createTable('favorites', (table) => {
    table.increments();
    table.integer('book_id').notNullable().unsigned().references('books.id').onDelete('CASCADE');
    table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE');
    table.timestamps(true, true);
});
exports.down = knex => knex.schema.dropTable('favorites');



/*

┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         favorites                                               │
├────────────────┬─────────────────────────┬──────────────────────────────────────────────────────┤
│id              │serial                   │primary key                                           │
│book_id         │integer                  │not null references books(id) on delete cascade index │
|user_id         │integer                  │not null references users(id) on delete cascade index │
│created_at      │timestamp with time zone │not null default now()                                │
│updated_at      │timestamp with time zone │not null default now()                                │
└────────────────┴─────────────────────────┴──────────────────────────────────────────────────────┘
*/
