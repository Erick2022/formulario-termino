import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from "jspdf";
//declaras el componente
function App() {
    const handleChange = (e) => {
      const fieldfName = e.target.name;
      const uppercaseValue = e.target.value.toUpperCase(); // convertir a mayusculas
      setFormData(prevState => ({
        ...prevState,
        [fieldfName]: uppercaseValue
      }));
  };
  //manejo de eventos
  const { register, handleSubmit, reset,
    formState: { errors }
  } = useForm();
  const [formData, setFormData] = useState(null);
  console.log(errors)

  //estado par almacenar la infraccion seleccionada
  const [SelectedOption, setSelectedOption] = useState('');
  const [NumeroDeInfracciones, setNumeroDeInfracciones] = useState('');

  //funcion para cambiar el cambio en la seleccion
  const handleSelectOnchange = (event) => {
    const selectedValue = event.target.value
    setSelectedOption(selectedValue);
    console.log(handleSelectOnchange)
  };
  const handleNumeroDeInfraccionesOnchange = (event) => {
    setNumeroDeInfracciones(event.target.value);
    // Aquí puedes manejar el cambio en el número de infracciones
    // Puedes actualizar el estado o realizar cualquier otra acción necesaria
    console.log("Nuevo número de infracciones:", event.target.value);
  };

  const onSubmit = (data) => {
    setFormData(data);
    generatePDF(data);
    alert("Formulario creado...!");
    console.log(data)
  };
  const handleNewForm = () => {
    // Limpia los campos
    reset();
    setFormData(null);
    // setpdfContent(null);
  };

  const generatePDF = (formData) => {
    const doc = new jsPDF();
    console.log('Generando pdf con los sgtes datos:', formData);

    //Titulo del formualario

    doc.setFontSize(16); //tamaño de fuente
    const espacioSuperior = 20;

    const texto = "TERMINO DE TURNO EN EPM CANCAS-TUMBES";
    const width = doc.getStringUnitWidth(texto) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - width) / 2;
    const y = espacioSuperior;
    doc.text(texto, x, y);

    doc.setFontSize(11); //tamaño de fuente
    doc.text(`Se informa:`, 15, 30);
    doc.text(`Fecha: ${formData.Fecha}`, 15, 35);
    doc.text(`HORARIO: ${formData.horario}`, 15, 40);
    doc.text(`Responsable de turno: ${formData.responsableTurno}`, 15, 50);
    doc.text(`Inspector: ${formData.Inspector1}`, 15, 60);
    doc.text(`Inspector: ${formData.Inspector2}`, 15, 70);
    doc.text(`Inspector: ${formData.Inspector3}`, 15, 80);
    doc.text(`Intervenciones conformes: ${formData.intervencion}`, 15, 90);
    doc.text(`Permisos de bonificacion: ${formData.bonificacion}`, 15, 100);
    doc.text(`Autorizaciones especiales: ${formData.especiales}`, 15, 110);
    doc.text(`Otros: ${formData.otros}`, 15, 120);
    doc.text(`INFRACCIONES: ${formData.infracciones}`, 15, 130);
    doc.text(`Por sobrepeso: ${formData.porsobre}`, 15, 140);
    doc.text(`Por dimensiones: ${formData.pordimen}`, 15, 150);
    doc.text(`Por CVPYM: ${formData.porCVPYM}`, 15, 160);
    doc.text(`Por permiso mal declarado: ${formData.porpermisomal}`, 15, 170);
    doc.text(`PALEO: ${formData.paleo}`, 15, 180);
    doc.text(`TOTAL DE INTERVENCIONES: ${formData.totalin}`, 15, 190);
    doc.text(`Con carga: ${formData.totalCON}`, 15, 200);
    doc.text(`Sin carga: ${formData.totalSin}`, 15, 210);
    doc.text(`Tipo de infraccion: ${SelectedOption}`, 15, 220);
    doc.text(`Numero de infracciones: ${formData.numerodeInfracciones}`, 15, 230);
    doc.text(`Incidencias durante el turno: ${formData.incidencia}`, 15, 240);
    doc.text(`Observaciones: ${formData.observaciones}`, 15, 280);

    // guarda el docuemnto
    doc.save('formularioTermino.pdf');
  };
  //   const handleForSubmit = (data) => {
  //     setFormData(data);
  //   };
  return (
    //declaras el formulario
    <div className="page-container">

      <div className="container">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

          <h1 className='title-principal'>TERMINO DE TURNO EN EPM CANCAS-TUMBES</h1>

          <label
            htmlFor="ubicacion">
          </label>

          <label
            htmlFor="Fecha">Fecha
          </label>
          <input
            onChange={handleChange}
            type="date"
            {...register("Fecha", { // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Fecha es requerida..."
              }
            })}
          />
          {
            errors.Fecha && <span>{errors.Fecha.message}</span>
          }

          <label
            htmlFor="Horario">Horario
          </label>

          <input
          onChange={handleChange}
            type="text"
            {...register("horario", {  // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Horario requerido..."
              },
              minLength: {
                value: 11,
                message: "Se debe ingresar horario de turno..."
              }
            })} />
          {
            errors.horario && <span>{errors.horario.message}</span>
          }

          <label
            htmlFor="responsableTurmo">Responsable de turno
          </label>
          <input
            onChange={handleChange}
            type="text"
            {...register("responsableTurno", {  // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
              }
            })} />
          {
            errors.responsableTurno && <span>{errors.responsableTurno.message}</span>
          }

          <label
            htmlFor="Inspector1">Inspector</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("Inspector1", {  // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
              }
            })} />
          {
            errors.Inspector1 && <span>{errors.Inspector1.message}</span>
          }

          <label
            htmlFor="Inspector2">Inspector</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("Inspector2", {
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
              }
            })} />
          {
            errors.Inspector2 && <span>{errors.Inspector2.message}</span>
          }

          <label
            htmlFor="Inspector3">Inspector</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("Inspector3", {
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
              }
            })} />
          {
            errors.Inspector3 && <span>{errors.Inspector3.message}</span>
          }

          <label
            htmlFor="intervencion">Intervenciones conformes (IC):</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("intervencion", {
              required: {
                value: true,
                message: "Ingresa Intervenciones requeridas..."
              },
              minLength: {
                value: 1,
                message: "Instervenciones debe tener al menos 1 caracteres..."
              },
              maxLength: {
                value: 3,
                message: "Intervenciones no debe tener más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Intervenciones debe ser numérico"
              }
            })} />
          {
            errors.intervencion && <span>{errors.intervencion.message}</span>
          }

          <label
            htmlFor="bonificacion">Permisos de bonificacion :</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("bonificacion", {
              required: {
                value: true,
                message: "Ingresa permisos de bonificacion..."
              },
              minLength: {
                value: 1,
                message: "Bonificacion debe tener al menos 1 caracteres..."
              },
              maxLength: {
                value: 2,
                message: "Bonficacion debe tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Permisos deben ser numéricos"
              }
            })} />
          {
            errors.bonificacion && <span>{errors.bonificacion.message}</span>
          }

          <label
            htmlFor="especiales">Permisos Especiales :</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("especiales", {
              required: {
                value: true,
                message: "Ingresa permisos permisos especiales...!"
              },
              minLength: {
                value: 1,
                message: "Permisos especiales debe tener al menos 1 caracteres..."
              },
              maxLength: {
                value: 2,
                message: "Permisos especiales deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Permisos especiales deben ser numéricos"
              }
            })} />
          {
            errors.especiales && <span>{errors.especiales.message}</span>
          }

          <label
            htmlFor="otros">Otros :</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("otros", {
              required: {
                value: true,
                message: "Ingresa Otros...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caractere..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Otros deben ser numéricos"
              }
            })} />
          {
            errors.otros && <span>{errors.otros.message}</span>
          }

          <label
            htmlFor="infracciones">INFRACCIONES (IN):</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("infracciones", {
              required: {
                value: true,
                message: "Ingresa infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }
            })} />
          {
            errors.infracciones && <span>{errors.infracciones.message}</span>
          }

          <label
            htmlFor="porsobre">Por sobrepeso:</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("porsobre", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.porsobre && <span>{errors.porsobre.message}</span>
          }


          <label
            htmlFor="pordimen">Por dimensiones:</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("pordimen", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.pordimen && <span>{errors.pordimen.message}</span>
          }


          <label
            htmlFor="porCVPYM">Por CVPYM:</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("porCVPYM", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.porCVPYM && <span>{errors.porCVPYM.message}</span>
          }


          <label
            htmlFor="porpermisomal">Por Permiso mal declarado:</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("porpermisomal", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 2,
                message: "Deben tener no más de 2 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.porpermisomal && <span>{errors.porpermisomal.message}</span>
          }


          <label
            htmlFor="paleo">PALEO (PV):</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("paleo", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 3,
                message: "Deben tener no más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.paleo && <span>{errors.paleo.message}</span>
          }


          <label
            htmlFor="totalin">TOTAL DE INTERVENCIONES (TI): IC + IN</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("totalin", {

              required: {
                value: true,
                message: "Ingresa numero de INTERVENCIONES...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 3,
                message: "Deben tener no más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.totalin && <span>{errors.totalin.message}</span>
          }

          <label
            htmlFor="totalCON">CON CARGA :</label>
          <input
            onChange={handleChange}
            type="text"
            {...register("totalCON", {

              required: {
                value: true,
                message: "Ingresa numero de vehiculos ...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 3,
                message: "Deben tener no más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.totalCON && <span>{errors.totalCON.message}</span>
          }

          <label
            htmlFor="totalSin">SIN CARGA :</label>

          <input
            onChange={handleChange}
            type="text"
            {...register("totalSin", {

              required: {
                value: true,
                message: "Ingresa numero de vehiculos...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 3,
                message: "Deben tener no más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.totalSin && <span>{errors.totalSin.message}</span>
          }

          <label
            htmlFor="codigos">CODIGOS Y CANTIDADES DE INFRACCIONES DETECTADAS :</label>

          <label
            htmlFor="selecciondeinfraccion">Seleccione la infraccion :</label>
          <select
            id="selecciondeinfraccion"
            value={SelectedOption}
            onChange={handleSelectOnchange}
          >
            <option value="">Seleccionar...</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
            <option value="P5">P5</option>
            <option value="P6">P6</option>
            <option value="P7">P7</option>
            <option value="P8">P8</option>
            <option value="P9">P9</option>
            <option value="P10">P10</option>
            <option value="P11">P11</option>
            <option value="P12">P12</option>
            <option value="P13">P13</option>
            <option value="P14">P14</option>
            <option value="P15">P15</option>
            <option value="P16">P16</option>
            <option value="P17">P17</option>
            <option value="P18">P18</option>
            <option value="P19">P19</option>
            <option value="P20">P20</option>
            <option value="P21">P21</option>
            <option value="P22">P22</option>
            <option value="P23">P23</option>
            <option value="P24">P24</option>
            <option value="P25">P25</option>
            <option value="P26">P26</option>
            <option value="P27">P27</option>
            <option value="P28">P28</option>
            <option value="P29">P29</option>

          </select >

          <label
            htmlFor="numerodeInfraciones">Ingrese numero de infraccion seleccionada: </label>

          <input

            type="text"
            id="numerodeInfraciones"
            onChange={(e) => {
              handleChange(e);
              handleNumeroDeInfraccionesOnchange(e);
            }}
            {...register("numerodeInfracciones", {

              required: {
                value: true,
                message: "Ingresa numero de infracciones...!"
              },
              minLength: {
                value: 1,
                message: "Debe tener al menos 1 caracter numericos..."
              },
              maxLength: {
                value: 3,
                message: "Deben tener no más de 3 caracteres numericos..."
              },
              pattern: {
                value: /^\d*$/,
                message: "Infracciones deben ser numéricos"
              }

            })} />
          {
            errors.numerodeInfracciones && <span>{errors.numerodeInfracciones.message}</span>
          }

          <label
            htmlFor="incidencia">INCIDENCIAS DURANTE EL TURNO</label>
          <textarea
            className='textincidencia'
            id="incidencia"
            name='incidencia'
            type="text"
            {...register("incidencia")}
            defaultValue="
1- El personal terminó turno sin ninguna novedad.
2- Se le transmitió indicaciones a personal para realizar la charla respectiva.
3- No hubo agresiones físicas.
4- No hubo agresiones verbales.
5- Sin apoyo policial."
            rows={8}
            style={{ height: "130px" }}
          />

          <label
            htmlFor="observaciones">OBSERVACIONES</label>
          <textarea
            id="observaciones"
            name='observaciones'
            type="text"
            {...register("observaciones")}
            rows={4}
            style={{ height: "50px" }}
          />

          <div className="button-container">

            <button type="submit" className='generate-button'>GENERAR</button>

            <button type="button" onClick={handleNewForm}>NUEVO</button>

          </div>

        </form >

        <div className="ad-container">
          <div className="message">
            <p>Yapea <span className="number">S/.1</span>al programador... Pol Dali</p>
          </div>
          <img className="image" src="./img/21320185072024-04-18T16-18-22.png"
            alt="yapea al programador...!!!" />
        </div>
      </div >
    </div >
  );
};
export default App;