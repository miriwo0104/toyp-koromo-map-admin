CREATE TYPE "public"."spot_category" AS ENUM('stay', 'cafe', 'nature', 'sight');--> statement-breakpoint
CREATE TABLE "spot_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"spot_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" "spot_category" NOT NULL,
	"area" text NOT NULL,
	"pref" text NOT NULL,
	"lead" text NOT NULL,
	"body" text,
	"address" text,
	"lat" double precision,
	"lng" double precision,
	"website_url" text,
	"youtube_id" text,
	"tips" text[],
	"dog_tags" text[],
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_spots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"spot_id" uuid,
	"position" integer NOT NULL,
	"time_label" text,
	"step_text" text,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"area" text NOT NULL,
	"pref" text NOT NULL,
	"visited_at" date NOT NULL,
	"nights" text,
	"lead" text NOT NULL,
	"body" text,
	"thumbnail_url" text,
	"youtube_id" text,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "spot_images" ADD CONSTRAINT "spot_images_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_spots" ADD CONSTRAINT "trip_spots_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_spots" ADD CONSTRAINT "trip_spots_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE set null ON UPDATE no action;