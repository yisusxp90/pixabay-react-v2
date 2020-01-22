import React, {useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import axios from 'axios';
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

    // state de la app
    const [busqueda, guardarBusqueda] = useState('');
    const [imagenes, guardarImagenes] = useState('');
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [totalPaginas, guardarTotalPaginas] = useState(1);

    useEffect(() => {
      if(busqueda === '') return;
        const cotizarCriptomoneda = async () => {
            const imagenesPorPagina = 30;
            const key = '10316486-179444db2f494ba01b94ce7ac';
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
            const resultado = await axios.get(url);
            guardarImagenes(resultado.data.hits);
            // total de paginas
            const totalPaginas = Math.ceil(resultado.data.totalHits/imagenesPorPagina);
            guardarTotalPaginas(totalPaginas);

            // mover pantalla hacia arriba
            const jumbotrom = document.querySelector('.jumbotron');
            jumbotrom.scrollIntoView({behavior: 'smooth'});
        };
        cotizarCriptomoneda();
    }, [busqueda, paginaActual]);

    const paginaAnterior = () => {
      const nuevaPaginaActual = paginaActual -1;
      if(nuevaPaginaActual === '0') return;
      guardarPaginaActual(nuevaPaginaActual);
    };

    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if(nuevaPaginaActual > totalPaginas) return;
        guardarPaginaActual(nuevaPaginaActual);
    };
    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imagenes</p>
              <Formulario
                  guardarBusqueda={guardarBusqueda}
              />
              <ListadoImagenes
                    imagenes={imagenes}
              />

                { (paginaActual === 1 || Object.keys(imagenes).length === 0) ? null :
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={paginaAnterior}
                    >Anterior &laquo;</button>
                }

                { (paginaActual === totalPaginas || Object.keys(imagenes).length === 0) ? null :
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={paginaSiguiente}
                    >Siguiente &raquo;</button>
                }
            </div>
        </div>
    );
}

export default App;
