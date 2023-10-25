/*
  Warnings:

  - You are about to drop the `_ArticleToArticleImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleId` to the `ArticleImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToArticleImage" DROP CONSTRAINT "_ArticleToArticleImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToArticleImage" DROP CONSTRAINT "_ArticleToArticleImage_B_fkey";

-- AlterTable
ALTER TABLE "ArticleImage" ADD COLUMN     "articleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ArticleToArticleImage";

-- AddForeignKey
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
