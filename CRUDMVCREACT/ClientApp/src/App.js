import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import { useState, useEffect } from "react"
import TablaContacto from "./components/TablaContacto"
import ModalContacto from "./components/ModalContacto"



const App = () => {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)

    const [editar,setEditar] = useState(null)

    /** Servicios APIS*/

    /**Devuelde los datos de la tabla de contactos*/
    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/lista");
        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    /**Genera un nuevo registro a la tabla de contactos*/
    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }
    }


    /**Actualiza un registro de la tabla de contactos*/
    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }
    }

    /**Elimina registro de la tabla de contactos*/
    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("¿Desea eliminar el id de contacto " + id +" ?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/eliminar/"+id, {
            method: "DELETE"
        })
        if (response.ok) {
            mostrarContactos()
        }
    }

    useEffect(() => {
        mostrarContactos();
    },[])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={ () => setMostrarModal(!mostrarModal)  }>Nuevo contacto</Button>
                            <hr></hr>
                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto }
                            />
                        </CardBody>
                        <CardFooter>
                            
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                editarContacto={editarContacto}
            />
        </Container>
    )
}

export default App;
