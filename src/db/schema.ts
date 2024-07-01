import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const orgsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  link: text('link').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),       
});
// Define the table
export const issuesTable = pgTable('issues', {
    id: text('id').primaryKey(),  // Primary key, text type
    number: text('number'),    // Integer type for the issue number
    title: text('title'),         // Text type for the title
    state: text('state'),         // Text type for the state (e.g., 'open', 'closed')
    issueLink: text('issue_link'), // Text type for the issue link
    userId: text('user_id'),      // Text type for the user ID
  });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof orgsTable.$inferInsert;
export type SelectPost = typeof orgsTable.$inferSelect;


export type InsertIssue = typeof issuesTable.$inferInsert;
export type SelectIssue = typeof issuesTable.$inferSelect;
