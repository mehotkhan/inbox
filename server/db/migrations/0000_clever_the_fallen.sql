CREATE TABLE `auth_key` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner` integer,
	`challenge` text,
	FOREIGN KEY (`owner`) REFERENCES `member`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`id` integer DEFAULT false,
	`uuid` text,
	`title` text,
	`poster` text,
	`summery` text,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer DEFAULT false,
	`blog` integer,
	`story` integer,
	`uuid` text,
	`body` text,
	FOREIGN KEY (`blog`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`story`) REFERENCES `story`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `member` (
	`id` integer DEFAULT false,
	`uuid` text,
	`pub` text,
	`userName` text,
	`email` text,
	`firstName` text,
	`lastName` text,
	`about` text,
	`avatar` text
);
--> statement-breakpoint
CREATE TABLE `story` (
	`id` integer DEFAULT false,
	`uuid` text,
	`title` text,
	`intro` text,
	`poster` text,
	`page` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_uuid_unique` ON `blog` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `comment_uuid_unique` ON `comment` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_uuid_unique` ON `member` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_pub_unique` ON `member` (`pub`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_userName_unique` ON `member` (`userName`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_email_unique` ON `member` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `story_uuid_unique` ON `story` (`uuid`);