-- CreateTable
CREATE TABLE "PersonalAccessToken" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiredDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PersonalAccessToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalAccessToken" ADD CONSTRAINT "personal_access_token_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
