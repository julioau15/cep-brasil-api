'use strict'

// elemento 'cep'
const cepInput = document.getElementById('cep')

// faz uma requisição para a API (BrasilAPI) para retornar dados do CEP
const getDadosCep  = async (cep) => {
    const url      = `https://brasilapi.com.br/api/cep/v1/${cep}`   // endpoint da API
    const response = await fetch(url)                               // resposta da requisição
    const data     = await response.json()                          // resposta da requisição em formato JSON

    return data
}

// Preenche o formulario com os dados do CEP
const preencherFormulario = async () => {
    // (cep.target.value) pega o valor do input passado pelo paramentro 'cep'
    const dadosCep = await getDadosCep(cepInput.value)

    const endereco = document.getElementById('endereco')
    const bairro   = document.getElementById('bairro')
    const cidade   = document.getElementById('cidade')
    const estado   = document.getElementById('estado')

    endereco.value = dadosCep.street
    bairro.value   = dadosCep.neighborhood
    cidade.value   = dadosCep.city
    estado.value   = dadosCep.state
}

cepInput.addEventListener('focusout', preencherFormulario)
cepInput.addEventListener('keydown', (event) => {
    if(event.key.toLowerCase() == 'enter')
        preencherFormulario()
})