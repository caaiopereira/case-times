import { Modal, Button, Form } from 'react-bootstrap'

function UpdateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateTime(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Time</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="nome">
            <Form.Label>
              Nome
            </Form.Label>
            <Form.Control defaultValue={props.time.nome} type="varchar" />
          </Form.Group>

          <Form.Group controlId="origem">
            <Form.Label>
              Origem
            </Form.Label>
            <Form.Control defaultValue={props.time.origem} type="varchar" />
          </Form.Group>

          <Form.Group controlId="divisao">
            <Form.Label>
              Divisão
            </Form.Label>
            <Form.Control defaultValue={props.time.divisao} type="varchar" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateModal
