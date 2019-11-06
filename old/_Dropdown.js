const temp1 = "click element";
// pojednostavljeno. gore bi islo samo ako bi sadrzaj izlazio izvan viewporta
if (window.innerHeight / 2 > temp1.offsetTop) {
  console.log("down");
} else {
  console.log("up");
}
// poravnanje lijevo desno, ne zaista lijevo ili desno od elementa. za to bi nam 
// trebala isto sirina sadrzaja poput vertikalnog poravnanja
if (window.innerWidth / 2 > temp1.offsetLeft) {
  console.log("right");
} else {
  console.log("left");
}
