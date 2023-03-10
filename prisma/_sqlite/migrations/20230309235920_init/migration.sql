-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_schedules" ("content", "createdAt", "end", "id", "start", "title", "updatedAt", "userId") SELECT "content", "createdAt", "end", "id", "start", "title", "updatedAt", "userId" FROM "schedules";
DROP TABLE "schedules";
ALTER TABLE "new_schedules" RENAME TO "schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
