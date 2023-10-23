'use client'

import { useState } from 'react'
import { Pdp } from '@prisma/client'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import ExportPdpCsv from './admin/ExportPdpCsv'

interface Props {
  pdp: Pdp[]
  path: string
}

const PdpTable = ({ pdp, path }: Props) => {
  const [pdpState, setPdpState] = useState<Pdp[]>(pdp)
  const [selectedFilter, setSelectedFilter] = useState('all')
  console.log(pdpState)
  const etats = {
    sourcing: 'Sourcing',
    valid: 'En cours de validation',
    tenu_commite: 'Tenu comité',
    refused: 'Retour pour modification',
  }

  const states = {
    sourcing: 'sourcing',
    valid: 'valid',
    tenu_commite: 'tenu_commite',
    refused: 'refused',
  }

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setPdpState(pdp)
    } else {
      const filteredPdp = pdp.filter(p => p.etat === filter)
      setPdpState(filteredPdp)
    }
    setSelectedFilter(filter)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="rounded-full p-4 py-2 font-semibold transition-all hover:bg-black/10"
            onClick={() => handleFilter('all')}
            style={{
              backgroundColor: selectedFilter == 'all' ? '#f0f0f0' : '',
            }}
          >
            Tous ({pdp.length})
          </button>
          <button
            className="rounded-full p-4 py-2 font-semibold transition-all hover:bg-black/10"
            onClick={() => handleFilter(states.valid)}
            style={{
              backgroundColor: selectedFilter == states.valid ? '#f0f0f0' : '',
            }}
          >
            En cours de validation (
            {pdp.filter(p => p.etat === states.valid).length})
          </button>
          <button
            className="rounded-full p-4 py-2 font-semibold transition-all hover:bg-black/10"
            onClick={() => handleFilter(states.tenu_commite)}
            style={{
              backgroundColor:
                selectedFilter == states.tenu_commite ? '#f0f0f0' : '',
            }}
          >
            Tenu comité (
            {pdp.filter(p => p.etat === states.tenu_commite).length})
          </button>
          <button
            className="rounded-full p-4 py-2 font-semibold transition-all hover:bg-black/10"
            onClick={() => handleFilter(states.refused)}
            style={{
              backgroundColor:
                selectedFilter == states.refused ? '#f0f0f0' : '',
            }}
          >
            Retour pour modification (
            {pdp.filter(p => p.etat === states.refused).length})
          </button>
        </div>
        {/* Export CSV button */}
        <ExportPdpCsv data={pdpState} />
      </div>
      {/* Table */}
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="text-xs uppercase text-gray-700">
          <tr className="text-base">
            <th scope="col" className="px-6 py-3">
              Référence Irchad
            </th>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Prénom
            </th>
            <th scope="col" className="px-6 py-3">
              CIN
            </th>
            <th scope="col" className="px-6 py-3">
              Telephone
            </th>
            <th scope="col" className="px-6 py-3">
              Projet
            </th>
            <th scope="col" className="px-6 py-3">
              état
            </th>
          </tr>
        </thead>
        <tbody>
          {pdpState.map(e => (
            <tr key={e.id} className="border-b bg-white">
              <td className="px-6 py-4">{e.irchad_id}</td>
              <td className="px-6 py-4">{e.nom}</td>
              <td className="px-6 py-4">{e.prenom}</td>
              <td className="px-6 py-4">{e.num_cin}</td>
              <td className="px-6 py-4">{e.tel}</td>
              <td className="px-6 py-4">{e.nom_projet}</td>
              <td className="px-6 py-4">{etats[e.etat]}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/${path}/${e.id}`}
                  className="rounded-lg bg-sky-200 p-2"
                >
                  Voir Info
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PdpTable
