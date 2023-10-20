-- CreateEnum
CREATE TYPE "Etat" AS ENUM ('sourcing', 'valid', 'refused', 'tenu_commite');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Associe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num_marche" TEXT NOT NULL,
    "organisme" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "objet_marche" TEXT NOT NULL,
    "appellation" TEXT NOT NULL,
    "delai" INTEGER NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Associe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approbateur" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Approbateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pdp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "irchad_id" INTEGER,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "num_cin" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type_form_juridique" TEXT NOT NULL,
    "date_form_juridique" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "nom_projet" TEXT NOT NULL,
    "secteur_projet" TEXT NOT NULL,
    "experience_1" TEXT,
    "experience_2" TEXT,
    "experience_3" TEXT,
    "experience_4" TEXT,
    "experience_5" TEXT,
    "etat" "Etat" NOT NULL DEFAULT 'sourcing',
    "commentaire" TEXT,
    "doc_cin" TEXT,
    "doc_cv" TEXT,
    "doc_forme_juridique" TEXT,
    "doc_contrat_de_bail" TEXT,
    "doc_devis" TEXT,
    "doc_attestation_rib" TEXT,
    "doc_diplome" TEXT,
    "doc_attestation_stage_travail" TEXT,
    "doc_bp" TEXT,
    "doc_fiche_de_presence" TEXT,
    "AssocieId" INTEGER NOT NULL,
    "ApprobateurId" INTEGER,

    CONSTRAINT "Pdp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_cin_key" ON "Admin"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Associe_num_marche_key" ON "Associe"("num_marche");

-- CreateIndex
CREATE UNIQUE INDEX "Associe_email_key" ON "Associe"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Approbateur_cin_key" ON "Approbateur"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Approbateur_email_key" ON "Approbateur"("email");

-- AddForeignKey
ALTER TABLE "Pdp" ADD CONSTRAINT "Pdp_AssocieId_fkey" FOREIGN KEY ("AssocieId") REFERENCES "Associe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdp" ADD CONSTRAINT "Pdp_ApprobateurId_fkey" FOREIGN KEY ("ApprobateurId") REFERENCES "Approbateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
