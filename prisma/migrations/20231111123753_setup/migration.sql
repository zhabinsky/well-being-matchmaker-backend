-- CreateTable
CREATE TABLE "UserRunningSessionExpense" (
    "id" SERIAL NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserRunningSessionExpense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRunningSessionExpense" ADD CONSTRAINT "UserRunningSessionExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
