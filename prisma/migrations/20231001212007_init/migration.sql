-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Associe');

-- CreateEnum
CREATE TYPE "Etat" AS ENUM ('sourcing', 'valid', 'refused', 'tenu_commite');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approbataire" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Approbataire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PDP" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "irchad_id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "num_cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type_form_juridique" TEXT NOT NULL,
    "date_form_juridique" TIMESTAMP(3) NOT NULL,
    "commune" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "doc_cin" TEXT,
    "doc_cv" TEXT,
    "doc_forme_juridique" TEXT,
    "doc_contrat_de_bail" TEXT,
    "doc_devis" TEXT,
    "doc_attestation_rib" TEXT,
    "doc_diplome" TEXT,
    "doc_attestation_stage_travail" TEXT,
    "AssocieId" INTEGER NOT NULL,
    "ApprobataireId" INTEGER,

    CONSTRAINT "PDP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projet" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "secteur" TEXT NOT NULL,
    "etat" "Etat" NOT NULL DEFAULT 'sourcing',
    "commentaire" TEXT,
    "belongsToId" INTEGER NOT NULL,

    CONSTRAINT "Projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "duree" TEXT NOT NULL,
    "belongsToId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cin_key" ON "User"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Approbataire_cin_key" ON "Approbataire"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Approbataire_email_key" ON "Approbataire"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PDP_num_cin_key" ON "PDP"("num_cin");

-- AddForeignKey
ALTER TABLE "PDP" ADD CONSTRAINT "PDP_AssocieId_fkey" FOREIGN KEY ("AssocieId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PDP" ADD CONSTRAINT "PDP_ApprobataireId_fkey" FOREIGN KEY ("ApprobataireId") REFERENCES "Approbataire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "PDP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "PDP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
