import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlimagen] = useState('');

  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // Hook para redireccionar
  const navigate = useNavigate();

  // validación y leer datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                 .min(2, 'Debe tener minimo 2 caracteres')   
                 .required('El nombre es obligatorio'),
      precio: Yup.string()
                 .min(3, 'Debes agregar un número')   
                 .required('El precio es obligatorio'), 
      categoria: Yup.string()
                 .required('La categoría es obligatorio'), 
      descripcion: Yup.string()
                 .min(3, 'Debe ser más larga')   
                 .required('La descripción es obligatorio'), 
    }),
    onSubmit: platillo => {
      try {
        platillo.existencia = true;
        platillo.imagen = urlimagen;
        firebase.db.collection('productos').add(platillo)

        // redireccionar
        navigate('./menu');
      } catch (error) {
        console.log(error)
      }
    }
  });

  // todo sobre las imagenes
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);

  }

  const handleUploadError = error => {
    guardarSubiendo(false);
    console.log(error);
  }
  
  const handleUploadSuccess = async (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);

    // almacenar la url de destino
    const url = await firebase
                .storage
                .ref("productos")
                .child(nombre)
                .getDownloadURL();
    guardarUrlimagen(url);


  }
  const handleProgress = progreso => {
    guardarProgreso(progreso);
    

  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Plato"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="bg-red-100 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div className="bg-red-100 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoría</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Selecione --</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebida</option>
                <option value="postres">Postres</option>
                <option value="Ensalada">Ensalada</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div className="bg-red-100 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null }
            

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
              <FileUploader
                accept="image/*"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")} // como crear carpeta para guardar imagenes                
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            { subiendo && (
              <div className="h-12 relative w-full border">
                <div style={{ width: `${progreso}%`}} className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center">
                  {progreso} %
                </div>
              </div>
            )}

            {urlimagen && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subió correctamente
              </p>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="descripcion"
                placeholder="Descripción de plato"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className="bg-red-100 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null }

            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Agregar Plato"
            />


          </form>  
        </div>
      </div>

    </>
  );
}

export default NuevoPlatillo;