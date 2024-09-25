CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`pubkey` text,
	`created_at` integer,
	`kind` integer,
	`tags` text,
	`content` text,
	`sig` text,
	`isVerified` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `member` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pub` text,
	`priv` text,
	`isAdmin` integer DEFAULT false,
	`isVerified` integer DEFAULT false,
	`firstName` text,
	`lastName` text,
	`displayName` text,
	`userName` text,
	`about` text,
	`email` text,
	`avatar` text,
	`credentialID` text,
	`credentialPublicKey` text,
	`counter` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_pub_unique` ON `member` (`pub`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_priv_unique` ON `member` (`priv`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_userName_unique` ON `member` (`userName`);--> statement-breakpoint
CREATE UNIQUE INDEX `member_email_unique` ON `member` (`email`);