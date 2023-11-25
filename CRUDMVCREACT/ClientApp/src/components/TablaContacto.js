import { useEffect } from "react";
import { Table,Button } from "reactstrap";

const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Tel&eacute;fono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr><td colspan="4" className="text-center">Sin Registros</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.IdContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <th>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item) }>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarContacto(item.idContacto) }>Eliminar</Button>
                                </th>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>

            )
}

export default TablaContacto;