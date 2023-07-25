// -----------------------------get form data----------------------

const getDataForm = () => {
  const frmNombre = document.getElementById("frm-nombre").value;
  const frmApellidos = document.getElementById("frm-apellidos").value;
  const frmDni = document.getElementById("frm-dni").value;
  const frmDireccion = document.getElementById("frm-direccion").value;
  const frmTelefono = document.getElementById("frm-telefono").value;
  const frmEmail = document.getElementById("frm-email").value;
  const frmSexo = document.getElementById("frm-sexo").value;
  const frmFechaNacimiento = document.getElementById(
    "frm-fecha-de-nacimiento"
  ).value;

  return {
    nombre: frmNombre,
    apellidos: frmApellidos,
    dni: frmDni,
    direccion: frmDireccion,
    telefono: frmTelefono,
    email: frmEmail,
    sexo: frmSexo,
    fechaNacimiento: frmFechaNacimiento,
  };
};

// -----------------------------create producto----------------------

const postProducto = async (dataForm) => {
  const data = await fetch("http://localhost:8090/persona/", {
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
  enlace.href = `/persona/`;

  enlace.click();
};

const createProduct = () => {
  const dataForm = getDataForm();

  postProducto(dataForm);
};

// -----------------------------edit producto----------------------

const putProduct = async (dataForm, id) => {
  const data = await fetch("http://localhost:8090/persona/" + id, {
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
  enlace.href = `/persona/`;

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
    apellidos: params.get("apellidos"),
    dni: params.get("dni"),
    direccion: params.get("direccion"),
    telefono: params.get("telefono"),
    email: params.get("email"),
    sexo: params.get("sexo"),
    fechaNacimiento: params.get("fechaNacimiento"),
  };

  document.getElementById("frm-nombre").value = data.nombre;
  document.getElementById("frm-apellidos").value = data.apellidos;
  document.getElementById("frm-dni").value = data.dni;
  document.getElementById("frm-direccion").value = data.direccion;
  document.getElementById("frm-telefono").value = data.telefono;
  document.getElementById("frm-email").value = data.email;
  document.getElementById("frm-sexo").value = data.sexo;
  document.getElementById("frm-fecha-de-nacimiento").value =
    data.fechaNacimiento;

  console.log(data);
};

main();
