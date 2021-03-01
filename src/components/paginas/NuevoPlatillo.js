import React from 'react';
import { useFormik } from 'formik';

const NuevoPlatillo = () => {

  // validación y leer datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    onSubmit: datos => {
      console.log(datos)
    }
  })

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
              />
            </div>

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
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoría</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imagen"
                type="file"
                value={formik.values.imagen}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="descripcion"
                placeholder="Descripción de plato"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
              ></textarea>
            </div>

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