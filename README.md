# Accompagnement PDP

## TODO

1. replace associe by projet

1. replace "attestation de stage / travail" by "Attestation de stage / travail /
   diplome"

1. replace form juridique with "chachat al Mokawil"

1. Add refuse message to approbateur's page

1. find a way to extract the data to google sheets

1. find a way to store data from google sheets to the database

1. restyle the app

1. prevent users from using dev tools

## Done

1. remigrate the database (added sex, some docs)

1. added sexe to create pdp

1. add upload files and change pdp state

1. make the validate pdp button disappear when the pdp is valid

1. add edit uploaded files

1. add delete files when pdp is deleted

1. add created by to pdp

1. add approbateurs crud

   - try to return only the pdp without approbateur in the second function

1. add associes crud

1. show stats in admin page

1. add change password to admin, associe, approbateur

1. show refuse message in pdp

1. add approved or refused by approbateur to pdp

1. add role based auth

1. fix the auth error message (maybe throw an error and catch it in client)

1. add loading

1. add filters to show all pdp

   - add 'à moi' to filters to show the pdp created by the user or make the
     associe see his pdp only

   - add state to table cols

1. show more info in /admin

1. add dropdowns to create pdp

1. show only the pdp created by the user in /associe

1. add secteur travail dropdown in edit pdp

1. show pdp in form of table in admin/projet/update/:id
