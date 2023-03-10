-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gethub_username" TEXT,
ADD COLUMN     "github_is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twitter_is_public" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
