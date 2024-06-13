const girisler = Array.from(document.querySelectorAll(".giris"));

girisler.forEach(input => {
  input.addEventListener("blur", verilenDegerleriKontrolEt);
});

function tahminGir() {
  const tahminler = girisler.map(input => input.value);

  if (tahminler.some(isNaN)) {
    alert("Lütfen geçerli 6 adet tahmin giriniz.");
    return;
  }

  if (tahminler.length !== new Set(tahminler).size) {
    alert("Aynı tahmin bir kez girilebilir.");
    return;
  }

  tahminler.sort((a, b) => a - b);
  girisler.forEach((input, index) => {
    input.value = tahminler[index];
  });

  document.getElementById("bilgiEkranı").innerText = "Tahminler girildi.";
  document.getElementById("tahminGir").disabled = true;
  document.getElementById("kurayiCek").disabled = false;
}

function verilenDegerleriKontrolEt(event) {
  const input = event.target;
  let deger = input.value;

  if (deger === "" || isNaN(deger) || deger < 1 || deger > 49) {
    alert("1-49 sayıları arasında bir sayı girmelisiniz");
    input.value = "";
    return;
  }

  const diger5Input = girisler.filter(giris => giris !== input);

  if (diger5Input.some(giris => giris.value === deger)) {
    alert("Bu sayıyı daha önce girdiniz.");
    input.value = "";
  }
}

function kurayiCek() {
  const lotoSayilari = [];
  while (lotoSayilari.length < 6) {
    const sayi = Math.floor(Math.random() * 49) + 1;
    if (!lotoSayilari.includes(sayi)) {
      lotoSayilari.push(sayi);
    }
  }

  lotoSayilari.sort((a, b) => a - b);
  document.querySelectorAll("#lotoFormu input").forEach((input, index) => {
    input.value = lotoSayilari[index];
  });

  const tahminler = girisler.map(input => parseInt(input.value, 10));

  const eslesenSayilar = tahminler.filter(num => lotoSayilari.includes(num));

  document.getElementById("eslesenSayilar").innerText =
    "Bilinen Sayılar: " + eslesenSayilar.join(", ");
  document.getElementById("tutturulanSayi").innerText =
    "Kaç Adet Sayı Bildiniz: " + eslesenSayilar.length;
}
