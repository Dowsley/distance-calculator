-- CreateTable
CREATE TABLE "DistanceQuery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceAddress" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
