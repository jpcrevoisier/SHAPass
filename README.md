 ![SHAPass](https://github.com/jpcrevoisier/SHAPass/blob/master/lock48.png) # SHAPass

**SHAPass** est une extension dont le but est de fournir un mot de passe unique par site/domaine a partir du hash ( SHA3 ) du nom de domaine, du login, d'une phrase de salage et d'un mot de passe a partir de l'appel de l'extension et le renseignement des champs idoines. Après cette saisie, un nouveau mot de passe unique a cette combinaison va être généré et copier dans le presse papier.
A aucun moment ,SHAPass ne stocke, ni n’envoie de mot de passe.

Elle a été testée et semble fonctionner sous : 
 - Chromium Version 64.0.3282.167 (Build officiel)
 - Firefox 58.0.2 (Version officielle)
 - Vivaldi 1.15.1111.3 (Version officielle) snapshot  (64 bits)
 - Google Chrome Version 64.0.3282.186 (Build officiel) (64 bits)
 

**/!\ Cette extension doit être considérée comme alpha ( voir sous-sous-alpha ) /!\\**

Si vous voulez utiliser directement l'extension empaquetée :
- [Extension Firefox shapass-0.0.1-an+fx.xpi](https://github.com/jpcrevoisier/SHAPass/raw/master/Extensions/shapass-0.0.1-an%2Bfx.xpi)
- [Extension Chrome / Chromium / Vivaldi SHAPass-0.0.1.crx](https://github.com/jpcrevoisier/SHAPass/raw/master/Extensions/SHAPass-0.0.1.crx)

Vous pouvez changer la configuration par défaut en passant par le dialogue d'options prévus par la navigateur.
Vous trouverez dans cette interface de quoi renseigner les valeurs par défaut pour :
- Le mot de passe.
- La phrase de salage ( salt ).
- La longueur du mot de passe généré.
- La présence de caractères minuscules.
- La présence de caractères majuscules.
- La présence de caractères numériques.
- La présence de caractères spéciaux.


PS: soyez indulgent, c'est ma première extension ... :s
