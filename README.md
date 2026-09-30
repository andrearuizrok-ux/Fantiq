# FANTIQ demo Android

Demo Android di FANTIQ con build automatica tramite GitHub Actions.

## Generare l'APK
1. Carica **il contenuto di questa cartella** nella root del repository GitHub.
2. Apri **Actions → Build FANTIQ APK**.
3. Premi **Run workflow** (oppure attendi la build automatica dopo il push).
4. Quando il job è verde, aprilo e scarica **Artifacts → FANTIQ-demo-APK**.
5. Dentro lo ZIP dell'artifact trovi `FANTIQ-demo-v1.apk`.

### Fix v2
Questa versione **non usa `android-actions/setup-android`**. I runner GitHub Ubuntu dispongono già dell'Android SDK; il workflow lo verifica e costruisce direttamente il progetto con Gradle.
