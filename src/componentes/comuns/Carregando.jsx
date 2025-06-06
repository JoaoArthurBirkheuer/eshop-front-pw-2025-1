import Spinner from 'react-bootstrap/Spinner';

const Carregando = ({carregando, children}) => {

    return(
        <>
        {carregando ? (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </div>
        ) : (
            children
        )}
        </>
    )
}

export default Carregando;