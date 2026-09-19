import {index, integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

// Stores only a salted hash and a short-lived request counter. Enquiry contents
// are delivered by email and are deliberately not persisted in D1.
export const enquiryRateLimits=sqliteTable('enquiry_rate_limits',{
  key:text('key').primaryKey(),
  windowStartedAt:integer('window_started_at').notNull(),
  requestCount:integer('request_count').notNull().default(1),
  expiresAt:integer('expires_at').notNull(),
},table=>[index('idx_enquiry_rate_limits_expires_at').on(table.expiresAt)]);
