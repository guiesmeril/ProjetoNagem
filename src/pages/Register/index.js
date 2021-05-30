import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import '../../global.css';
import logo from '../../assets/logo.png';

export default function Register() {

    const [cpf, setCpf] = useState();
    const [name, setName] = useState();
    const [cep, setCep] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [uf, setUf] = useState();
    const [address, setAddress] = useState([]);
    const history = useHistory();

    async function clearInput() {
        setCep("")
        setRua("")
        setNumero("")
        setBairro("")
        setCidade("")
        setUf("")
    }

    async function newAddress() {
        if(!cep ||!rua ||!numero || !bairro ||!cidade ||!uf){
            alert('Favor preencher todos os campos!');
            return;
        }
        if (address.length > 3) {
            alert("Você ultrapassou o limite de 4 endereços.")
            return
        }
        const data = {
            cep,
            rua,
            numero,
            bairro,
            cidade,
            uf
        };
        setAddress(address.concat(data));
        clearInput();
    }

    async function handleRegister(e) {
        e.preventDefault();

        let listUsers = [];
        const localStorageUsers = JSON.parse(localStorage.
            getItem('users'))
        if (localStorageUsers != null)
            listUsers = localStorageUsers


            const dataAddress = {
                cep,
                rua,
                numero,
                bairro,
                cidade,
                uf
            }
            address.push(dataAddress);
        
        const data = {
            name,
            cpf,
            endereco: address,
        };

        listUsers.push(data)
        
        try {
            localStorage.setItem('users', JSON.stringify(listUsers))
            alert(`Cadastro realizado, com sucesso!`);

            history.push('/address');
        } catch (err) {
            alert(err.response.data.message);
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                <img src={logo} alt="Nagem" />
                    <Link className="back-link" to="/Address">
                        <FiArrowLeft size={16} color="#3b5998" />
                        Voltar para Endereços.
                    </Link>
                </section>

                <form onSubmit={handleRegister}>

                    <input placeholder="Digite seu CPF"
                        type='number'
                        value={cpf}
                        maxLength="11"
                        onChange={e => setCpf(e.target.value)}
                        required />

                    <input placeholder="Digite seu Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />

                    <input placeholder="Digite o CEP"
                        type='number'
                        maxLength="8"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                        required />

                    <input placeholder="Rua"
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                        required />

                    <input placeholder="Número"
                        type='number'
                        maxLength="8"
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        required />

                    <input placeholder="Bairro"
                        value={bairro}
                        onChange={e => setBairro(e.target.value)}
                        required />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            required />
                        <input placeholder="UF"
                            style={{ width: 80 }}
                            maxLength="2"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required />
                    </div>
                    <button className="button1" onClick={() => { newAddress() }}  >Novo Endereço</button>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
                
        
                <ul>

                    {address.map((item) => (
                    <li key={item.cep}>
                    <strong>
                    CEP: {item.cep},
                    RUA: {item.rua},
                    NUMERO: {item.numero},
                    BAIRRO: {item.bairro},
                    CIDADE: {item.cidade},
                    ESTADO: {item.uf}
                    </strong>
                    </li>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}