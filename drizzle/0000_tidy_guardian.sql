CREATE TABLE `enquiry_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window_started_at` integer NOT NULL,
	`request_count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_enquiry_rate_limits_expires_at` ON `enquiry_rate_limits` (`expires_at`);