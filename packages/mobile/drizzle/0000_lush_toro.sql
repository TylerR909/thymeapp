CREATE TABLE `pings` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
