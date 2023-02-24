const TimesApi = () => {
    const url = 'http://localhost:3000'
  
    return {
        getTime() {
            return fetch(`${url}/times`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deleteTime(timeId) {
          return fetch(`${url}/times/${timeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        },
        createTime (nome, origem, divisao) {
          return fetch(`${url}/times`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                nome: nome,
                origem: origem,
                divisao: divisao
              }
            )
         })
        },
        updateTime(timeId, nome, origem, divisao) {
          return fetch(`${url}/times/${timeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                nome: nome,
                origem: origem,
                divisao: divisao
              }
            )
         })
        },
    }
  }
  
  export default TimesApi