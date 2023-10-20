import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ShowFiles from '@/components/admin/ShowFiles'
import RefusePdpButton from '@/components/approbateur/RefusePdpButton'
import ShowPdpInfo from '@/components/approbateur/ShowPdpInfo'
import ValidateButton from '@/components/approbateur/ValidateButton'
import { getApprobateurByEmail } from '@/utils/approbateur'
import { getPdpById } from '@/utils/pdp'
import { getServerSession } from 'next-auth'

const PdpInfoPage = async ({ params }: any) => {
  const session = await getServerSession(authOptions)
  const approbateurByEmail = await getApprobateurByEmail(session?.user?.email)
  const { id } = params
  const { pdp } = await getPdpById(id)
  const approbateur = approbateurByEmail?.approbateur

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl">
          Informations de &ldquo;{pdp?.nom} {pdp?.prenom}&rdquo;
        </h1>
        {pdp?.etat !== 'tenu_commite' ? (
          <div className="flex gap-4">
            <ValidateButton id={pdp?.id} approbateurId={approbateur?.id} />
            {pdp?.etat !== 'refused' && (
              <RefusePdpButton id={pdp?.id} approbateurId={approbateur?.id} />
            )}
          </div>
        ) : (
          <h2 className="bg-green-50 px-4 py-2 text-xl text-green-500">
            Tenu Commité
          </h2>
        )}
      </div>
      {/* Error Message */}
      {pdp?.commentaire && (
        <p className="mt-6 flex flex-col rounded-xl bg-red-100 p-4 text-xl text-red-500">
          <span>
            Refusé par:{' '}
            <span className="font-semibold">
              {pdp?.Approbateur?.nom} {pdp?.Approbateur?.prenom}
            </span>
          </span>
          {pdp?.commentaire}
        </p>
      )}

      <div className="mt-16">
        <ShowPdpInfo pdp={pdp} />
      </div>

      <div className="mt-8">
        <div>
          <ShowFiles id={pdp?.id} pdp={pdp} isApprobateur />
        </div>
      </div>
    </div>
  )
}

export default PdpInfoPage
