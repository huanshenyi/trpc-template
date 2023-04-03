-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "bio" TEXT,
    "url" TEXT,
    "twitter_username" TEXT,
    "location" TEXT,
    "gethub_username" TEXT,
    "twitter_is_public" BOOLEAN NOT NULL DEFAULT false,
    "github_is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("bio", "email", "email_verified", "gethub_username", "github_is_public", "id", "image", "location", "name", "twitter_is_public", "twitter_username", "url") SELECT "bio", "email", "email_verified", "gethub_username", "github_is_public", "id", "image", "location", "name", "twitter_is_public", "twitter_username", "url" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
