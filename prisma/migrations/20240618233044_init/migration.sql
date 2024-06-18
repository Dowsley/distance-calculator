-- CreateTable
CREATE TABLE "DistanceQuery" (
    "id" SERIAL NOT NULL,
    "sourceAddress" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DistanceQuery_pkey" PRIMARY KEY ("id")
);
