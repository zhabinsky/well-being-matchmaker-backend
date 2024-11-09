-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('zodiac_scorpion', 'children_yes', 'children_no', 'pets_yes', 'pets_no', 'cats', 'dogs');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tags" "Tags"[] DEFAULT ARRAY['children_yes', 'zodiac_scorpion', 'pets_yes', 'cats', 'dogs']::"Tags"[];
