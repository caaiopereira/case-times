import { Table, Container, Button } from 'react-bootstrap'
import TimesApi from './api/TimesApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [times, setTimes] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await TimesApi().getTime().then(data => {
        return data.json()
      })
      .then(data => {
        setTimes(data)
      })
    }

    getData()
  }, [])

  async function createTime(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await TimesApi().createTime(
        req.nome.value, req.origem.value, req.divisao.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setTimes([...times, {
          id: res.timeId,
          nome: req.nome.value,
          origem: req.origem.value,
          divisao: req.divisao.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteTime(timeId) {
    try {
      await TimesApi().deleteTime(timeId)

      const formattedTimes = times.filter(cont => {
        if(cont.id !== timeId){
          return cont
        }
      })

      setTimes(formattedTimes)
    } catch(err) {
      throw err
    }
  }

  async function updateTime(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await TimesApi().updateTime(
        selectedTime.id, req.nome.value, req.origem.value, req.divisao.value
      )

      const formattedTimes = times.map(cont => {
        if(cont.id === selectedTime.id) {
          return {
            id: selectedTime.id,
            nome: req.nome.value,
            origem: req.origem.value,
            divisao: req.divisao.value
          }
        }

        return cont
      })

      setTimes(formattedTimes)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container
    className="
    d-flex
    flex-column
    align-items-start
    justify-content-center
    h-100
    w-100
    "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir Time
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Origem</th>
            <th>Divisão</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {times && times.map(cont => (
            <tr key={cont.id}>
              <td>{cont.nome}</td>
              <td>{cont.origem}</td>
              <td>{cont.divisao}</td>
              <td>
                <Button onClick={() => deleteTime(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedTime(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createTime={createTime} />
    {selectedTime && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateTime={updateTime} time={selectedTime} />
    )}
    </>
  )
}

export default App
