import { prisma } from './db'

export async function getPdp() {
  try {
    const pdp = await prisma.pdp.findMany({
      orderBy: [{ id: 'asc' }],
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while fetching PDPs.' }
  }
}

export async function getOnlyPdpById(id: any) {
  try {
    const pdp = await prisma.pdp.findUnique({
      where: { id: parseInt(id) },
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function getPdpById(id: any) {
  try {
    const pdp = await prisma.pdp.findUnique({
      where: { id: parseInt(id) },
      include: {
        Associe: true,
        Approbateur: true,
      },
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function createPdp(id: any, pdp: any, role: any) {
  // if role is admin create {AdminId: id} else {Associe: id}
  if (role === 'admin') {
    pdp.AdminId = parseInt(id)
  } else {
    pdp.AssocieId = parseInt(id)
  }

  // turn pdp irchad_id into number
  pdp.irchad_id = parseInt(pdp.irchad_id)

  // turn date_naissance & date_form-juridique into date
  pdp.date_naissance = new Date(pdp.date_naissance)
  pdp.date_form_juridique = new Date(pdp.date_form_juridique)

  try {
    const newPdp = await prisma.pdp.create({
      data: {
        ...pdp,
      },
    })

    return { newPdp }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while creating the PDP.' }
  }
}

function formatDate(dateString: string) {
  const [day, month, year] = dateString.split('/')
  const formattedDate = `${year}-${month}-${day}`
  return new Date(formattedDate)
}

export async function updatePdp(id: any, pdp: any) {
  pdp.date_naissance = formatDate(pdp.date_naissance)
  pdp.date_form_juridique = formatDate(pdp.date_form_juridique)

  try {
    const formattedPdp = {
      ...pdp,
    }
    const updatedPdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: formattedPdp,
    })
    return { updatedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function deletePdp(id: any) {
  try {
    const deletedPdp = await prisma.pdp.delete({
      where: { id: parseInt(id) },
    })
    return { deletedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function addFiles(id: any, files: any) {
  try {
    const pdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: {
        etat: 'valid',
        doc_cin: files.doc_cin,
        doc_cv: files.doc_cv,
        doc_forme_juridique: files.doc_forme_juridique,
        doc_contrat_de_bail: files.doc_contrat_de_bail,
        doc_devis: files.doc_devis,
        doc_attestation_rib: files.doc_attestation_rib,
        doc_diplome: files.doc_diplome,
        doc_attestation_stage_travail: files.doc_attestation_stage_travail,
        doc_bp: files.doc_bp,
        doc_fiche_de_presence: files.doc_fiche_de_presence,
      },
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function updateFile(id: any, data: any) {
  try {
    const pdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      },
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

// approbateur
export async function getValidPdp() {
  try {
    const pdp = await prisma.pdp.findMany({
      where: {
        OR: [{ etat: 'valid' }, { etat: 'refused' }, { etat: 'tenu_commite' }],
      },
      orderBy: [{ id: 'asc' }],
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while fetching PDPs.' }
  }
}

export async function validatePdp(id: any, approbateurId: any) {
  try {
    const validatedPdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: {
        etat: 'tenu_commite',
        commentaire: null,
        ApprobateurId: parseInt(approbateurId),
      },
    })
    return { validatedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function refusePdp(id: any, commentaire: any, approbateurId: any) {
  try {
    const refusedPdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: {
        etat: 'refused',
        commentaire,
        ApprobateurId: parseInt(approbateurId),
      },
    })
    return { refusedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}
