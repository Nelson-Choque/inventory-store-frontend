const getProducts = async () => {
  const response = await fetch("http://localhost:8090/persona/");

  data = await response.json();

  const dataArray = data.map((obj) => Object.values(obj));

  const elementCheckBox = '<input type="checkbox" name="frmCheckbox" id="">';
  dataArray.forEach((element) => {
    element.unshift(elementCheckBox);
  });

  return dataArray;
};

// ------------------------ pasando parametro id a otra pestaña-------------

const moveEditPage = () => {
  const tbody = document.getElementById("tbody").querySelectorAll("tr");

  const tbodyArray = Array.from(tbody);

  for (let index = 0; index < tbodyArray.length; index++) {
    const checkbox = tbodyArray[index].querySelector("input");
    if (checkbox.checked) {
      const row = tbodyArray[index].querySelectorAll("td");
      //siempre empezar de 1 porque el cero es checkbox
      const dataRow = {
        id: row[1].textContent,
        nombre: row[2].textContent,
        apellidos: row[3].textContent,
        dni: row[4].textContent,
        direccion: row[5].textContent,
        telefono: row[6].textContent,
        email: row[7].textContent,
        sexo: row[8].textContent,
        fechaNacimiento: row[9].textContent,
      };

      //enviar los datos a traver de query params
      const enlace = document.createElement("a");
      enlace.href = `/persona/editar.html?id=${dataRow.id}&nombre=${dataRow.nombre}&apellidos=${dataRow.apellidos}&dni=${dataRow.dni}&direccion=${dataRow.direccion}&telefono=${dataRow.telefono}&email=${dataRow.email}&sexo=${dataRow.sexo}&fechaNacimiento=${dataRow.fechaNacimiento}`;

      enlace.click();

      break;
    }
  }
};

// ---------------------------- delete product -----------------

const deleteProduct = async () => {
  const tbody = document.getElementById("tbody").querySelectorAll("tr");

  const tbodyArray = Array.from(tbody);

  for (let index = 0; index < tbodyArray.length; index++) {
    const checkbox = tbodyArray[index].querySelector("input");
    if (checkbox.checked) {
      const idRow = tbodyArray[index].querySelectorAll("td")[1].textContent;

      console.log(idRow);

      const data = await fetch("http://localhost:8090/producto/" + idRow, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data) {
        console.log("hubo error");
        return "";
      }

      console.log("todo guchi");

      //se crea el enlace para hacer refresh de la pagina
      const enlace = document.createElement("a");
      enlace.href = `/producto/`;
      enlace.click();
      break;
    }
  }
};

//-------------cargar datos en datable -----------------
const main = async () => {
  const info = await getProducts();
  console.log(info);
  $(document).ready(function () {
    $("#myTable").DataTable({
      data: info,
      responsive: true,
    });
  });
};

main();
