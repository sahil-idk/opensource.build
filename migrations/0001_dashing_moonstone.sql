CREATE TABLE IF NOT EXISTS "issues" (
	"id" text PRIMARY KEY NOT NULL,
	"number" text,
	"title" text,
	"state" text,
	"issue_link" text,
	"user_id" text
);
