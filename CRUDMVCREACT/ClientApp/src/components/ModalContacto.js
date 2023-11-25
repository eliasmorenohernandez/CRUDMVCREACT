import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const ModalContacto = ({ mostrarModal,setMostrarModal, guardarContacto, editar, editarContacto}) => {

    const modeloContacto = {
        idContacto: 0,
        nombre: "",
        correo: "",
        telefono: ""
    }

    const [contacto, setContacto] = useState(modeloContacto)
    

    const actualizaDato = (e) => {
        setContacto({
            ...contacto,
            [e.target.name]: e.target.value
        })
    }

    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            guardarContacto(contacto)
        }
        else {
            editarContacto(contacto)
        }
        reiniciarModal()
    }

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        reiniciarModal()
    }

    const reiniciarModal = () => {
        setContacto(modeloContacto)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        }
        else {
            setContacto(modeloContacto)
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo contacto" : "Editar contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={ contacto.nombre} />
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizaDato(e)} value={contacto.correo} />
                        <Label>Tel&eacute;fono</Label>
                        <Input name="telefono" onChange={(e) => actualizaDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={ enviarDatos}>Guardar</Button>
                <Button color="default" size="sm" onClick={cerrarModal }>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalContacto;