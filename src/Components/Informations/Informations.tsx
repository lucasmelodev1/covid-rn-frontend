import React, { Children, Component, FormEventHandler, FormHTMLAttributes } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios'
import '../../styles/Informations.css'



export default function Information() {
  const cities = ["Acari","Açu","Afonso Bezerra","Água Nova","Alexandria","Almino Afonso","Alto do Rodrigues","Angicos","Antônio Martins","Apodi","Areia Branca","Augusto Severo (Campo Grande)","Baía Formosa","Baraúna","Barcelona","Bento Fernandes","Bodó","Bom Jesus","Brejinho","Caiçara do Norte","Caiçara do Rio do Vento","Caicó","Campo Redondo","Canguaretama","Caraúbas","Carnaúba dos Dantas","Carnaubais","Ceará-Mirim","Cerro Corá","Coronel Ezequiel","Coronel João Pessoa","Cruzeta","Currais Novos","Doutor Severiano","Encanto","Equador","Espírito Santo","Extremoz","Felipe Guerra","Fernando Pedroza","Florânia","Francisco Dantas","Frutuoso Gomes","Galinhos","Goianinha","Governador Dix-Sept Rosado","Grossos","Guamaré","Ielmo Marinho","Ipanguaçu","Ipueira","Itajá","Itaú","Jaçanã","Jandaíra","Janduís","Januário Cicco (Boa Saúde)","Japi","Jardim de Angicos","Jardim de Piranhas","Jardim do Seridó","João Câmara","João Dias","José da Penha","Jucurutu","Jundiá","Lagoa d'Anta","Lagoa de Pedras","Lagoa de Velhos","Lagoa Nova","Lagoa Salgada","Lajes","Lajes Pintadas","Lucrécia","Luís Gomes","Macaíba","Macau","Major Sales","Marcelino Vieira","Martins","Maxaranguape","Messias Targino","Montanhas","Monte Alegre","Monte das Gameleiras","Mossoró","Natal","Nísia Floresta","Nova Cruz","Olho-d'Água do Borges","Ouro Branco","Paraná","Paraú","Parazinho","Parelhas","Parnamirim","Passa e Fica","Passagem","Patu","Pau dos Ferros","Pedra Grande","Pedra Preta","Pedro Avelino","Pedro Velho","Pendências","Pilões","Poço Branco","Portalegre","Porto do Mangue","Pureza","Rafael Fernandes","Rafael Godeiro","Riacho da Cruz","Riacho de Santana","Riachuelo","Rio do Fogo","Rodolfo Fernandes","Ruy Barbosa","Santa Cruz","Santa Maria","Santana do Matos","Santana do Seridó","Santo Antônio","São Bento do Norte","São Bento do Trairí","São Fernando","São Francisco do Oeste","São Gonçalo do Amarante","São João do Sabugi","São José de Mipibu","São José do Campestre","São José do Seridó","São Miguel","São Miguel do Gostoso","São Paulo do Potengi","São Pedro","São Rafael","São Tomé","São Vicente","Senador Elói de Souza","Senador Georgino Avelino","Serra Caiada","Serra de São Bento","Serra do Mel","Serra Negra do Norte","Serrinha","Serrinha dos Pintos","Severiano Melo","Sítio Novo","Taboleiro Grande","Taipu","Tangará","Tenente Ananias","Tenente Laurentino Cruz","Tibau","Tibau do Sul","Timbaúba dos Batistas","Touros","Triunfo Potiguar","Umarizal","Upanema","Várzea","Venha-Ver","Vera Cruz","Viçosa","Vila Flor"]

  const [mortes, setMortes] = React.useState()
  const [contaminados, setContaminados] = React.useState()
  const [melhoria, setMelhoria] = React.useState(0)
  const [city, setCity] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const setData = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const details = {
      'city': city
    }

    var data = ''
    const response = axios.post(`http://localhost:5000/api/cities/${details.city}`)
    response.then((data) => {
      setLoading(false)
      setMelhoria(data.data.improvementRate)
      setContaminados(data.data.cases)
      setMortes(data.data.deaths)
    })
    .catch(() => {
      setLoading(false)
      alert(`Não foi possível encontrar os dados da cidade\n-> O nome da cidade pode estar escrito errado\n-> O governo da cidade pode não ter divulgado os dados\n-> Os servidores podem estar fora do ar`)
    })

  }

  return (
    <div className="info-div">
      {loading === true && <LoadingScreen/>}
      <div className="input-div">
        <form onSubmit={setData}>
          <input list="cities" placeholder="Digite Sua Cidade" className="cities" onChange={(e) => {
            setCity(e.target.value)
          }}/>
            <datalist id="cities" >
              {cities.map((value,index) => {
                return <option value={value}>{value}</option>
              })}
            </datalist>
          <input type="submit" value="Descobrir" className="submit-button"/>
        </form>
      </div>
      <div className="time"><h2>Essa semana:</h2></div>
      <div className="deaths-and-cases">
        <div className="deaths">
          <h1>{mortes}</h1>
          <h2>Mortes</h2>
        </div>
        <div className="cases">
          <h1>{contaminados}</h1>
          <h2>Contaminados</h2>
        </div>
      </div>
      <div className="improvement">
        {melhoria > 0 && <div className="status status-melhorando">Melhorando</div>}
        {melhoria < 0 && <div className="status status-piorando">Piorando</div>}
        {melhoria === 0 || melhoria === null && <div className="status status-sem-mudancas">Sem mudanças</div>}
        <div className="rate">
          {melhoria !== null && <h3>Taxa de Melhoria: {melhoria + '%'}</h3>}
        </div>
      </div>
      <div className="select"></div>
    </div>
  )
}
