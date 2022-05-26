const defaultB = document.querySelector("#default-btn");
//const customB = document.querySelector("#custom-btn");

//fonction pour basculer au button default
function defaultBtnActive() {
  defaultB.click();
}

//fonction d'affichage d'image dans le formulaire
const image = document.querySelector("#image");

const previewPicture = function (e) {
  const [picture] = e.files;

  let types = ["image/jpg", "image/jpeg", "image/png"];

  if (types.includes(picture.type)) {
    // L'objet FileReader
    const reader = new FileReader();

    // L'événement déclenché lorsque la lecture est complète
    reader.onload = function (e) {
      // On change l'URL de l'image (base64)
      image.src = e.target.result;
    };
    // On lit le fichier "picture" uploadé
    reader.readAsDataURL(picture);
  }
};

//#################### partie liste contact ##################

//récupération des éléments du formulaire
const name = document.querySelector("#prenom");
const lastname = document.querySelector("#nom");
const gp = document.querySelector("#group");
const bio = document.querySelector("#bio");
const img = document.querySelector("#image");

const btcree = document.querySelector(".bt-cree");
const btreinit = document.querySelector(".bt-reinit");

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  if (name.value.length > 20 || lastname.value.length > 20) {
    alert("votre champ ne doit pas contenir plus de 2O caractères");
  } else {
    let modification = false;
    // corps de la fonction
    //console.log(form.elements);
    //annuler le comportement par defaut
    event.preventDefault();

    const lsname = form.elements[0].value;
    const nme = form.elements[1].value;
    const group = gp.options[gp.selectedIndex].value;
    const biog = form.elements[3].value;
    const srimg = img.src;

    //création des éléments à ajouter (img, nom et prenom, bio, paragraphe )
    const lbl1 = document.createElement("label");
    const lbl2 = document.createElement("label");
    const lbl3 = document.createElement("p");
    //const lblimg = document.createElement("label");

    const parag = document.createElement("p");
    const imag = document.createElement("img");

    //création des div
    const divcontact = document.createElement("div");

    const divimage = document.createElement("div");
    const divtext = document.createElement("div");

    const divimgcroix = document.createElement("img");
    const divbtcroix = document.createElement("button");

    //ajout de la classe delete btn
    divbtcroix.classList.add("delete-btn");

    divbtcroix.addEventListener("click", function (event) {
      const parent = this.parentElement;
      // console.log(parent);
      parent.remove();
      img.src;
    });

    lbl1.textContent = lsname;
    lbl2.textContent = nme;
    lbl3.textContent = group;
    parag.textContent = biog;
    imag.src = srimg;
    divimgcroix.src = "images/croi.png";

    //classes des objets

    //lblimg.classList.add("span");
    //attachement des éléments au document

    const parentT = document.querySelector(".global-contact");
    // const parent = document.querySelector(".contact-p");

    lbl1.classList.add("textlabel");
    lbl2.classList.add("textlabel");
    lbl3.classList.add("textp");
    parag.classList.add("textp");

    divtext.appendChild(lbl1);
    divtext.appendChild(lbl2);
    divtext.appendChild(lbl3);
    divtext.appendChild(parag);

    divimage.appendChild(imag);
    divbtcroix.appendChild(divimgcroix);

    divcontact.appendChild(divimage);
    divcontact.appendChild(divtext);
    divcontact.appendChild(divbtcroix);

    parentT.appendChild(divcontact);

    //création des styles des éléments ajoutés
    divcontact.classList.add("divcontact");
    divtext.classList.add("divtext");
    divimgcroix.classList.add("divimgcroix");
    imag.classList.add("divimage");
    divbtcroix.classList.add("divbtcroi");

    // parentT.appendChild(imag);
    // parentT.appendChild(parent);

    //recuperation des infos lors du clic sur le div
    divcontact.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("delete-btn") ||
        event.target.classList.contains("divimgcroix")
      )
        return;
      const enfants = this.childNodes;
      const enfantimg = enfants[0].childNodes;
      alert(enfants);
      console.log(enfants);
      console.log(enfantimg);
      const enfanttext = enfants[1].childNodes;
      console.log(enfanttext);
      //affectation des valeurs

      // form.elements[0].value = enfanttext[0].textContent;
      // form.elements[1].value = enfanttext[1].textContent;
      // form.elements[3].value = enfanttext[3].textContent;
      for (let i = 0; i < enfanttext.length; i++) {
        if (i != 2) {
          form.elements[i].value = enfanttext[i].textContent;
        }
      }
      form.elements[2].value = enfanttext[2].textContent;

      //Modification
      btcree.textContent = "Modifier";
      modification = true;
      //btcree.classList.add("btmod");
      img.src = enfantimg[0].src;

      //evenements clique pour modifier
      btcree.addEventListener("click", function (event) {
        //if (btcree.text == "Modifier") {
        //modification (On ne fait que l'inverse des valeurs)
        if (modification) {
          for (let j = 0; j < enfanttext.length; j++) {
            if (j != 2) {
              enfanttext[j].textContent = form.elements[j].value;
            }
          }
          enfanttext[2].textContent = form.elements[2].value;

          btcree.textContent = "Créer";
          enfantimg[0].src = img.src;

          //reset formulaire
          form.reset();
          modification = false;
          // }
          //form.elements[2].options[0].text = "Deveppeur FS";
        }
      });
    });

    this.reset();
    img.src = "";
  }
});

btreinit.addEventListener("click", function (even) {
  form.reset();
  img.src = "";
  lastname.focus();
});

//Validation

/*function autorize(form) {
  //verification des champs vides
  form = document.querySelector("form");
  let result;
  for (i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type == "text" && form.elements[i].length > 20) {
      result =
        "votre champ " +
        form.elements[i].id.toUpperCase() +
        " ne doit pas depasser 20 caractères";
    }
  }
  return result;
}*/

//function pour interdire les chiffres
function onlyLetters(input) {
  let regex = /[^a-z]/gi;
  input.value = input.value.replace(regex, "");
}
