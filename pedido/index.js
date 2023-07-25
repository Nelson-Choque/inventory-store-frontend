const getProducts = async () => {
  const response = await fetch("http://localhost:8090/pedido/");

  data = await response.json();
  const dataArray = data.map((obj) => {
    return Object.values(obj);
  });

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
        direccion: row[3].textContent,
      };

      //enviar los datos a traver de query params
      const enlace = document.createElement("a");
      enlace.href = `/almacen/editar.html?id=${dataRow.id}&nombre=${dataRow.nombre}&direccion=${dataRow.direccion}`;

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

      let isSure = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto de forma permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      //

      if (!isSure.isConfirmed) {
        break;
      }

      const data = await fetch("http://localhost:8090/almacen/" + idRow, {
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
      enlace.href = `/almacen/`;
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
