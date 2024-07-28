CREATE TABLE `auth_key` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner` integer,
	`challenge` text,
	FOREIGN KEY (`owner`) REFERENCES `member`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`pubkey` text,
	`created_at` integer,
	`kind` integer,
	`tags` text,
	`content` text,
	`sig` text
);
--> statement-breakpoint
CREATE TABLE `member` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pub` text,
	`isAdmin` integer DEFAULT false,
	`isVerified` integer DEFAULT false,
	`firstName` text,
	`lastName` text,
	`displayName` text,
	`userName` text,
	`about` text,
	`email` text,
	`avatar` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_pub_unique` ON `member` (`pub`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_userName_unique` ON `member` (`userName`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_email_unique` ON `member` (`email`);