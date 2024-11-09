/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "picture1" TEXT NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2017/08/06/09/50/people-2590796_1280.jpg',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'No name';

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "UserRunningSession" (
    "id" SERIAL NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserRunningSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userMatchId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "userFromId" INTEGER NOT NULL,
    "userToId" INTEGER NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMatch" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId1" INTEGER NOT NULL,
    "userId2" INTEGER NOT NULL,

    CONSTRAINT "UserMatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRunningSession" ADD CONSTRAINT "UserRunningSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userMatchId_fkey" FOREIGN KEY ("userMatchId") REFERENCES "UserMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userToId_fkey" FOREIGN KEY ("userToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatch" ADD CONSTRAINT "UserMatch_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatch" ADD CONSTRAINT "UserMatch_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
