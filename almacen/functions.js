// -----------------------------get form data----------------------

const getDataForm = () => {
  const frmNombre = document.getElementById("frm-nombre").value;
  const frmDescripcion = document.getElementById("frm-descripcion").value;
  const frmPrecio = document.getElementById("frm-precio").value;

  return {
    nombre: frmNombre,
    descripcion: frmDescripcion,
    precio: frmPrecio,
  };
};

// -----------------------------create producto----------------------

const postProducto = async (dataForm) => {
  const data = await fetch("http://localhost:8090/producto/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  if (!data) {
    console.log("hubo error");
    return "";
  }

  console.log("todo guchi");

  const enlace = document.createElement("a");
  enlace.href = `/producto/`;

  enlace.click();
};

const createProduct = () => {
  const dataForm = getDataForm();

  postProducto(dataForm);
};

// -----------------------------edit producto----------------------

const putProduct = async (dataForm, id) => {
  const data = await fetch("http://localhost:8090/producto/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  if (!data) {
    console.log("hubo error");
    return "";
  }

  console.log("todo guchi");
  const enlace = document.createElement("a");
  enlace.href = `/producto/`;

  enlace.click();
};

const getParamId = () => {
  const params = new URLSearchParams(window.location.search);

  // Obtener el valor de 'id' de los parámetros de búsqueda
  const id = params.get("id");

  return id;
};

const editProduct = () => {
  const dataForm = getDataForm();
  const id = getParamId();

  putProduct(dataForm, id);
};

const main = () => {
  //obtienes los datos de la url y lo seteas en el edit

  const params = new URLSearchParams(window.location.search);
  const data = {
    id: params.get("id"),
    nombre: params.get("nombre"),
    descripcion: params.get("descripcion"),
    precio: params.get("precio"),
  };

  document.getElementById("frm-nombre").value = data.nombre;
  document.getElementById("frm-descripcion").value = data.descripcion;
  document.getElementById("frm-precio").value = data.precio;
};

main();
